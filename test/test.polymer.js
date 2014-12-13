/* global describe, it, before, after, require */
'use strict';

// SETUP //

var NAME,
	PROTO;

function Polymer( name, prototype ) {
	if ( typeof name !== 'string' ) {
		throw new TypeError();
	}
	if ( !(prototype instanceof Object) || prototype === null || Array.isArray( prototype ) ) {
		throw new TypeError();
	}
	NAME = name;
	PROTO = prototype;
}

global.Polymer = Polymer;


// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	script = require( './../src/js/polymer.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'polymer.js', function tests() {

	// TEARDOWN //

	after( function after() {
		delete global.Polymer;
	});

	// TESTS //

	it( 'should set the name and prototype of the custom element', function test() {
		assert.strictEqual( NAME, 'polymer-chart-timeseries' );
		assert.isObject( PROTO );
	});

});
