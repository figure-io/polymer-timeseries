/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'height', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the canvas height', function test() {
		expect( el.height ).to.be.a( 'number' );
	});

	it( 'should emit an `error` if not set to a positive number', function test( done ) {
		var num = el.height,
			values;

		values = [
			function(){},
			'5',
			-1,
			0,
			NaN,
			// undefined, // TODO: enable once https://github.com/Polymer/polymer/issues/1053 is resolved
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.height = values.shift();
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
			assert.strictEqual( el.height, num );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.height = el.height + 1;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'height' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `height` event when set to a new value', function test( done ) {
		el.addEventListener( 'height', onChange );

		el.height = el.height + 1;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'height', onChange );
			done();
		}
	});

	it( 'should not attempt to update elements which do not exist (no canvas)' );

	it( 'should update the canvas height' );

	it( 'should update the background height' );

	it( 'should update the clipPath height' );

	it( 'should update the x-axis position' );

	it( 'should update the y-axis' );

	it( 'should update the y-axis label position' );

	it( 'should update the timeseries paths' );

	it( 'should update the annotations' );

});
