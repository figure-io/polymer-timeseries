/* global describe, it, beforeEach, assert, expect, sinon */
'use strict';

// TESTS //

describe( 'onDragLeave', function tests() {

	var el, evt;

	el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		evt = {};
	});

	it( 'should be a function', function test() {
		expect( el.onDragLeave ).to.be.a( 'function' );
	});

	it( 'should return false', function test() {
		assert.isFalse( el.onDragLeave( evt ) );
	});

	it( 'should emit a `dragLeave` event with the original event object', function test( done ) {
		el.addEventListener( 'dragLeave', onLeave );

		el.onDragLeave( evt );

		function onLeave( event ) {
			assert.isObject( event.detail );
			assert.strictEqual( event.detail, evt );
			el.removeEventListener( 'dragLeave', onLeave );
			done();
		}
	});

});
