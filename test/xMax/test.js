/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xMax', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the maximum value on the x-axis', function test() {
		assert.isNull( el.xMax );
	});

	it( 'should emit an `error` if not set to a Date object or null', function test( done ) {
		var val = el.xMax,
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
			el.xMax = values.shift();
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
			assert.strictEqual( el.xMax, val );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xMax = new Date();

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'xMax' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit an `xMax` event when set to a new value', function test( done ) {
		el.addEventListener( 'xMax', onChange );

		el.xMax = new Date();

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'xMax', onChange );
			done();
		}
	});

	it( 'should compute a maximum value from the data when set to null' );

	it( 'should update the x-axis' );

	it( 'should update the timeseries paths' );

	it( 'should update the annotations' );

});
