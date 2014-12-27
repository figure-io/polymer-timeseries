/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'yMax', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the maximum value on the y-axis', function test() {
		assert.isNull( el.yMax );
	});

	it( 'should emit an `error` if not set to a number or null', function test( done ) {
		var val = el.yMax,
			values;

		values = [
			'5',
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
			el.yMax = values.shift();
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
			assert.strictEqual( el.yMax, val );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.yMax = 1;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'yMax' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `yMax` event when set to a new value', function test( done ) {
		el.addEventListener( 'yMax', onChange );

		el.yMax = 0;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'yMax', onChange );
			done();
		}
	});

	it( 'should compute a maximum value from the data when set to null' );

	it( 'should update the y-axis' );

	it( 'should update the timeseries paths' );

	it( 'should update the annotations' );

});
