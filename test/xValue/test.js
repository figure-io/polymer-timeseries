/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xValue', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an x-value accessor', function test() {
		expect( el.xValue ).to.be.a( 'function' );
	});

	it( 'should default to an array accessor', function test() {
		var time, data, expected, actual;

		time = new Date();

		data = [ time, 1234 ];
		expected = time;
		actual = el.xValue( data );

		assert.strictEqual( actual, expected );
	});

	it( 'should emit an `error` if set to a non-function', function test( done ) {
		var xValue = el.xValue,
			values;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.xValue = values.shift();
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
			assert.strictEqual( el.xValue, xValue );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xValue = noop;

		function noop(){
			// nothing...
		}
		function onChange( evt ) {
			assert.isObject( evt.detail );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

});
