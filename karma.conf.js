/**
*
*	KARMA: karma.conf.js
*
*
*	DESCRIPTION:
*		- Karma config file for running tests locally.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// SETTINGS //

var settings = {
	// Base path (used to resolve file patterns):
	'basePath': '',

	// Proxy routes:
	'proxies': {},

	// Test frameworks (see [Karma docs]{@link https://npmjs.org/browse/keyword/karma-adapter}):
	'frameworks': [
		'mocha',
		'chai'
	],

	// List of files/patterns to load into the browser:
	'files': [
		'../webcomponentsjs/webcomponents.js',
		'node_modules/sinon/pkg/sinon.js',
		{
			'pattern': '*.html',
			'included': false,
			'served': true
		},
		{
			'pattern': 'css/*.css',
			'included': false,
			'served': true
		},
		'test/setup.js',
		'test/test*.js'
	],

	// List of files to exclude:
	'exclude': [],

	// Preprocessors (see [Karma docs]{@link https://npmjs.org/browse/keyword/karma-preprocessor}):
	'preprocessors': {
		// NOTE: comment the following line when debugging tests. Karma-coverage has a bug which interferes with stack traces.
		'js/*.js': [
			'coverage'
		]
	},

	// Coverage reporter:
	'coverageReporter': {
		'type': 'lcov',
		'dir': 'reports',
		subdir: function( browser ) {
			return 'coverage/' + browser.toLowerCase().split( /[ /-]/ )[ 0 ];
		}
	}
}; // end SETTINGS


// KARMA //

/**
* FUNCTION: karma( config )
*	Specifies Karma settings.
*
* @param {Object} config - configuration object
*/
function karma( config ) {
	config.set( settings );
} // end FUNCTION karma()


// EXPORTS //

module.exports = karma;
