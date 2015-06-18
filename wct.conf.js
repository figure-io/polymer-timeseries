'use strict';

// MODULES //

var path = require( 'path' ),
	browsers = require( './etc/sauce-browsers.json' );


// CONFIG //

var config,
	root,
	dir;

// Serve from the directory above the current directory to allow loading of sibling dependencies:
root = path.resolve( __dirname, '../' );

// Set the location of the test suites:
dir = path.basename( __dirname );
dir = path.join( dir, 'test' );

// Create the web component test configuration...
config = {

	// Root directory from which files should be served:
	'root': root,

	// Location of test suites:
	'suites': [
		dir
	],

	// Whether the local or remote browsers should be targeted:
	'remote': false,

	// Whether the browser should remain open after running tests:
	'persistent': false,

	// Duration before which an idle test times out:
	'testTimeout': 90000,

	// Display test results in expanded form:
	'expanded': false,

	// Output verbosity:
	'verbose': false,

	// Output stream:
	'output': process.stdout,

	// Whether the output stream should be treated as TTY:
	'ttyOutput': undefined,

	// Additional scripts which should be included in the generated tests (see Selenium: https://code.google.com/p/selenium/wiki/DesiredCapabilities and Sauce: https://docs.saucelabs.com/reference/test-configuration/):
	'extraScripts': [],

	// Additional browser options for Selenium or Sauce:
	'browserOptions': {},

	// Test plugins:
	'plugins': {
		'local': {
			'browsers': [
				'firefox'
			]
		},
		'web-component-tester-istanbul': {
			'dir': './reports/coverage',
			'reporters': [
				'text-summary',
				'lcov'
			],
			'include': [],
			'exclude': []
		}
	}
}; // end CONFIG


// EXPORTS //

module.exports = config;
