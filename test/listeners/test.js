/* global describe, it, assert, expect, sinon */
'use strict';

// TESTS //

describe( 'listeners', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a method to add listeners to the window object', function test() {
		expect( el.addListeners ).to.be.a( 'function' );
	});

	it( 'should provide a method to remove listeners from the window object', function test() {
		expect( el.removeListeners ).to.be.a( 'function' );
	});

	it( 'should prevent duplicate listeners', function test() {
		sinon.spy( el, 'removeListeners' );
		el.addListeners();
		assert.ok( el.removeListeners.called );
		el.removeListeners.restore();
	});

	it( 'should not bind a resize listener if `autoResize` is false' );

});
