
#############
# VARIABLES #

# Set the node.js environment to test:
NODE_ENV ?= test


# NOTES #

NOTES ?= 'TODO|FIXME|WARNING|HACK|NOTE'


# DOCS #

# DOCS ?= ./docs/index.html


# BOWER #

BOWER ?= ./node_modules/.bin/bower


# VULCANIZE #

VULCANIZE ?= ./node_modules/.bin/vulcanize
VULCANIZE_CONF ?= ./vulcanize.conf.json
VULCANIZE_IN ?= ./src/chart-timeseries.html
VULCANIZE_OUT ?= ./chart-timeseries.html


# MOCHA #

MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha
MOCHA_REPORTER ?= spec


# ISTANBUL #

REPORT_ROOT ?= ./reports

# KARMA #
KARMA ?= ./node_modules/karma/bin/karma
KARMA_OUT ?= $(REPORT_ROOT)/coverage/
KARMA_PORT ?= 9876
KARMA_REPORTERS ?= mocha,coverage
KARMA_BROWSERS ?= Chrome
KARMA_LOG_LEVEL ?= info

# Chrome:
KARMA_CHROME_PATH ?= $(KARMA_OUT)/chrome
KARMA_CHROME_LCOV_INFO_PATH ?= $(KARMA_CHROME_PATH)/lcov.info
KARMA_CHROME_HTML_REPORT_PATH ?= $(KARMA_CHROME_PATH)/lcov-report/index.html

# Firefox:
KARMA_FIREFOX_PATH ?= $(KARMA_OUT)/firefox
KARMA_FIREFOX_LCOV_INFO_PATH ?= $(KARMA_FIREFOX_PATH)/lcov.info
KARMA_FIREFOX_HTML_REPORT_PATH ?= $(KARMA_FIREFOX_PATH)/lcov-report/index.html


# JSHINT #

JSHINT ?= ./node_modules/.bin/jshint
JSHINT_REPORTER ?= ./node_modules/jshint-stylish/stylish.js



# FILES #

# Source files:
SOURCES ?= src/*.js src/**/*.js

# Test files:
TESTS ?= test/*.js




###########
# TARGETS #


# NOTES #

.PHONY: notes

notes:
	grep -Ern $(NOTES) $(SOURCES) $(TESTS)


# DOCS #

# .PHONY: view-docs

# view-docs:
# 	open $(DOCS)


# UNIT TESTS #

.PHONY: test test-watch
.PHONY: test-karma-mocha
.PHONY: test-karma-mocha-watch

test: test-karma-mocha

test-watch: test-karma-mocha-watch

test-karma-mocha: node_modules
	$(KARMA) start \
		--single-run \
		--colors \
		--port $(KARMA_PORT) \
		--browsers $(KARMA_BROWSERS) \
		--reporters $(KARMA_REPORTERS) \
		--log-level $(KARMA_LOG_LEVEL) \
		--no-auto-watch

test-karma-mocha-watch: node_modules
	$(KARMA) start \
		--colors \
		--port $(KARMA_PORT) \
		--browsers $(KARMA_BROWSERS) \
		--reporters $(KARMA_REPORTERS) \
		--log-level $(KARMA_LOG_LEVEL) \
		--auto-watch



# CODE COVERAGE #

.PHONY: test-cov

test-cov: test-karma-mocha



# COVERAGE REPORT #

.PHONY: view-cov
.PHONY: view-chrome-cov view-firefox-cov
.PHONY: view-karma-chrome-report

view-cov: view-chrome-cov view-firefox-cov

# Chrome:
view-chrome-cov: view-karma-chrome-report

view-karma-chrome-report:
	open $(KARMA_CHROME_HTML_REPORT_PATH)

# Firefox:
view-firefox-cov: view-karma-firefox-report

view-karma-firefox-report:
	open $(KARMA_FIREFOX_HTML_REPORT_PATH)


# LINT #

.PHONY: lint lint-jshint

lint: lint-jshint

lint-jshint: node_modules
	$(JSHINT) \
		--reporter $(JSHINT_REPORTER) \
		./



# INSTALL #

.PHONY: install
.PHONY: install-node install-bower install-vulcanize

install: install-node install-bower install-vulcanize

install-node:
	npm install

install-bower:
	$(BOWER) install

# Vulcanize:
install-vulcanize:
	$(VULCANIZE) \
		$(VULCANIZE_IN) \
		--config $(VULCANIZE_CONF) \
		-o $(VULCANIZE_OUT) \
		--inline \
		--no-strip-excludes



# CLEAN #

.PHONY: clean
.PHONY: clean-build clean-node clean-bower

clean: clean-build clean-node clean-bower

clean-build:
	rm -rf build

clean-node:
	rm -rf node_modules

clean-bower:
	rm -rf bower
