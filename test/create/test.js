/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'create', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should be a function', function test() {
		expect( el.create ).to.be.a( 'function' );
	});

	it( 'should be immediately invoked once an element is attached to the DOM' );

});
