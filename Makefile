
#############
# VARIABLES #

# Component Name:
NAME ?= chart-timeseries

# Set the node.js environment to test:
NODE_ENV ?= test


# NOTES #

NOTES ?= 'TODO|FIXME|WARNING|HACK|NOTE'


# DOCS #

# DOCS ?= ./docs/index.html


# BOWER #

BOWER ?= ./node_modules/.bin/bower


# BROWSERIFY #

BROWSERIFY ?= ./node_modules/.bin/browserify
BROWSERIFY_IN ?= ./build/js/polymer.js
BROWSERIFY_OUT ?= ./build/js/script.js


# VULCANIZE #

VULCANIZE ?= ./node_modules/.bin/vulcanize
VULCANIZE_CONF ?= ./vulcanize.conf.json
VULCANIZE_IN ?= ./build/$(NAME).html
VULCANIZE_OUT ?= ./$(NAME).html


# MOCHA #

MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha
MOCHA_REPORTER ?= spec


# ISTANBUL #

ISTANBUL ?= ./node_modules/.bin/istanbul
ISTANBUL_OUT ?= ./reports/coverage
ISTANBUL_REPORT ?= lcov
ISTANBUL_LCOV_INFO_PATH ?= $(ISTANBUL_OUT)/lcov.info
ISTANBUL_HTML_REPORT_PATH ?= $(ISTANBUL_OUT)/lcov-report/index.html


# BUILD #

BUILD_OUT ?= $(NAME).html


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

.PHONY: test test-mocha

test: test-mocha

test-mocha: node_modules
	NODE_ENV=$(NODE_ENV) \
	NODE_PATH=$(NODE_PATH_TEST) \
	$(MOCHA) \
		--reporter $(MOCHA_REPORTER) \
		--globals Polymer \
		$(TESTS)



# CODE COVERAGE #

.PHONY: test-cov test-istanbul-mocha

test-cov: test-istanbul-mocha

test-istanbul-mocha: node_modules
	NODE_ENV=$(NODE_ENV) \
	NODE_PATH=$(NODE_PATH_TEST) \
	$(ISTANBUL) cover \
		--dir $(ISTANBUL_OUT) \
		--report $(ISTANBUL_REPORT) \
	$(_MOCHA) -- \
		--reporter $(MOCHA_REPORTER) \
		$(TESTS)



# COVERAGE REPORT #

.PHONY: view-cov view-istanbul-report

view-cov: view-istanbul-report

view-istanbul-report:
	open $(ISTANBUL_HTML_REPORT_PATH)



# LINT #

.PHONY: lint lint-jshint

lint: lint-jshint

lint-jshint: node_modules
	$(JSHINT) \
		--reporter $(JSHINT_REPORTER) \
		./



# INSTALL #

.PHONY: install
.PHONY: install-node install-bower

install: install-node install-bower

install-node:
	npm install

install-bower: node_modules
	$(BOWER) install



# BUILD #

.PHONY: build
.PHONY: build-tmp build-cleanup

build: node_modules clean-build build-tmp browserify vulcanize

build-tmp:
	mkdir build
	cp -r ./src/ ./build


# BROWSERIFY #

.PHONY: browserify

browserify: node_modules
	$(BROWSERIFY) \
		$(BROWSERIFY_IN) \
		-o $(BROWSERIFY_OUT)


# VULCANIZE #

.PHONY: vulcanize

vulcanize: node_modules
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
	rm -f $(BUILD_OUT)

clean-node:
	rm -rf node_modules

clean-bower:
	rm -rf bower
