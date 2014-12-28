/* global describe, it, beforeEach, assert, expect, sinon */
'use strict';

// TESTS //

describe( 'onDragEnter', function tests() {

	var el, evt;

	el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		evt = {
			preventDefault: function(){}
		};
	});

	it( 'should be a function', function test() {
		expect( el.onDragEnter ).to.be.a( 'function' );
	});

	it( 'should return false', function test() {
		assert.isFalse( el.onDragEnter( evt ) );
	});

	it( 'should not throw if `preventDefault` is not supported', function test() {
		delete evt.preventDefault;

		assert.isFalse( el.onDragEnter( evt ) );
	});

	it( 'should emit a `dragEnter` event with the original event object', function test( done ) {
		el.addEventListener( 'dragEnter', onEnter );

		el.onDragEnter( evt );

		function onEnter( event ) {
			assert.isObject( event.detail );
			assert.strictEqual( event.detail, evt );
			el.removeEventListener( 'dragEnter', onEnter );
			done();
		}
	});

});
