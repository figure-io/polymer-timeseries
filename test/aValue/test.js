/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'aValue', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an annotation-value accessor', function test() {
		expect( el.aValue ).to.be.a( 'function' );
	});

	it( 'should default to an array accessor', function test() {
		var data, expected, actual;

		data = [ 0, 1234 ];
		expected = 1234;
		actual = el.aValue( data );

		assert.strictEqual( actual, expected );
	});

	it( 'should emit an `error` if set to a non-function', function test( done ) {
		var aValue = el.aValue,
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
			el.aValue = values.shift();
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
			assert.strictEqual( el.aValue, aValue );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.aValue = noop;

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
