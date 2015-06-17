/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'width', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the canvas width', function test() {
		expect( el.width ).to.be.a( 'number' );
	});

	it( 'should emit an `error` if not set to a positive number', function test( done ) {
		var num = el.width,
			values;

		values = [
			function(){},
			'5',
			-1,
			0,
			NaN,
			// undefined,
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.width = values.shift();
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
			assert.strictEqual( el.width, num );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `change` event when set to a new value', function test( done ) {
		el.addEventListener( 'change', onChange );

		el.width = el.width + 1;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'width' );
			el.removeEventListener( 'change', onChange );
			done();
		}
	});

	it( 'should emit a `width` event when set to a new value', function test( done ) {
		el.addEventListener( 'width', onChange );

		el.width = el.width + 1;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'change' );
			el.removeEventListener( 'width', onChange );
			done();
		}
	});

	it( 'should not attempt to update elements which do not exist (no canvas)' );

	it( 'should update the canvas width' );

	it( 'should update the background width' );

	it( 'should update the x-axis' );

	it( 'should update the marks' );

	it( 'should update annotations' );

});
