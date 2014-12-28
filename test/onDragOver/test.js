/* global describe, it, beforeEach, assert, expect, sinon */
'use strict';

// TESTS //

describe( 'onDragOver', function tests() {

	var el, evt;

	el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		evt = {
			preventDefault: function(){}
		};
	});

	it( 'should be a function', function test() {
		expect( el.onDragOver ).to.be.a( 'function' );
	});

	it( 'should return false', function test() {
		assert.isFalse( el.onDragOver( evt ) );
	});

	it( 'should not throw if `preventDefault` is not supported', function test() {
		delete evt.preventDefault;

		assert.isFalse( el.onDragOver( evt ) );
	});

});
