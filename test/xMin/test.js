/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xMin', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the minimum value on the x-axis', function test() {
		assert.isNull( el.xMin );
	});

	it( 'should emit an `error` if not set to a Date object or null', function test( done ) {
		var val = el.xMin,
			values;

		values = [
			'5',
			-1,
			1,
			3.14,
			NaN,
			// undefined, // TODO: enable once https://github.com/Polymer/polymer/issues/1053 is resolved
			true,
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.xMin = values.shift();
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
			assert.strictEqual( el.xMin, val );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xMin = new Date();

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'xMin' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit an `xMin` event when set to a new value', function test( done ) {
		el.addEventListener( 'xMin', onChange );

		el.xMin = new Date();

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'xMin', onChange );
			done();
		}
	});

	it( 'should compute a minimum value from the data when set to null' );

	it( 'should update the x-axis' );

	it( 'should update the timeseries paths' );

	it( 'should update the annotations' );

});
