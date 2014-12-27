/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'paddingBottom', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the bottom padding between the canvas edge and the graph area', function test() {
		expect( el.paddingBottom ).to.be.a( 'number' );
	});

	it( 'should emit an `error` if not set to a positive integer', function test( done ) {
		var num = el.paddingBottom,
			values;

		values = [
			function(){},
			'5',
			-1,
			3.14,
			NaN,
			// undefined, // TODO: enable once https://github.com/Polymer/polymer/issues/1053 is resolved
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.paddingBottom = values.shift();
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
			assert.strictEqual( el.paddingBottom, num );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.paddingBottom = 0;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'paddingBottom' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the background height' );

	it( 'should update the clipPath height' );

	it( 'should update the x-axis position' );

	it( 'should update the y-axis' );

	it( 'should update the y-label position' );

	it( 'should update the timeseries paths' );

	it( 'should update the annotations' );

});
