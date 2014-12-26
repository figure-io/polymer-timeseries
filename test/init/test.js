/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'init', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should have an `init` method', function test() {
		assert.ok( el.init );
	});

	it( 'should initialize a data attribute as an empty array', function test() {
		assert.deepEqual( el.data, [] );
	});

	it( 'should initialize a labels attribute as an empty array', function test() {
		assert.deepEqual( el.labels, [] );
	});

	it( 'should initialize an annotations attribute as an empty array', function test() {
		assert.deepEqual( el.annotations, [] );
	});

	it( 'should expose an events attribute listing all publicly emitted events', function test() {
		assert.ok( el.events.length );
	});

});
