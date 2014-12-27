/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'yValue', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose a y-value accessor', function test() {
		expect( el.yValue ).to.be.a( 'function' );
	});

	it( 'should default to an array accessor', function test() {
		var data, expected, actual;

		data = [ new Date(), 1234 ];
		expected = 1234;
		actual = el.yValue( data );

		assert.strictEqual( actual, expected );
	});

	it( 'should emit an `error` if set to a non-function', function test( done ) {
		var yValue = el.yValue,
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
			el.yValue = values.shift();
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
			assert.strictEqual( el.yValue, yValue );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.yValue = noop;

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
