/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'isDraggable', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for turning on or off draggable elements', function test() {
		expect( el.isDraggable ).to.be.a( 'boolean' );
	});

	it( 'should emit an `error` if not set to a boolean', function test( done ) {
		var bool = el.isDraggable,
			values;

		values = [
			function(){},
			'5',
			NaN,
			undefined,
			null,
			5,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.isDraggable = values.shift();
		}
		function onError( evt ) {
			assert.instanceOf( evt.detail, TypeError );
			if ( values.length ) {
				setTimeout( next, 0 );
				return;
			}
			setTimeout( end, 0 );
		}
		function end() {
			assert.strictEqual( el.isDraggable, bool );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.isDraggable = !el.isDraggable;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'isDraggable' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should toggle element draggability' );

});
