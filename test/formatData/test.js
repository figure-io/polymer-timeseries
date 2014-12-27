/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'formatData', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a method to convert raw data into a standard representation', function test() {
		expect( el.formatData ).to.be.an( 'function' );
	});

	it( 'should emit an `error` if not provided an array', function test( done ) {
		var values = [
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.formatData( values.shift() );
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
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit an `error` if a dataset is a non-array', function test( done ) {
		var values = [
			function(){},
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.formatData( [ values.shift() ] );
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
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should convert a raw data array to a standard representation (array of arrays of arrays)', function test() {
		var xVal = el.xValue,
			yVal = el.yValue,
			data,
			expected,
			actual;

		el.xValue = xValue;
		el.yValue = yValue;

		data = [];
		data[ 0 ] = [
			{
				'time': new Date(),
				'value': Math.random()
			}
		];

		expected = [];
		expected[ 0 ] = [
			[
				data[ 0 ][ 0 ].time,
				data[ 0 ][ 0 ].value
			]
		];

		actual = el.formatData( data );

		assert.deepEqual( actual, expected );

		// Reset the accessors to original values:
		el.xValue = xVal;
		el.yValue = yVal;

		function xValue( d ) {
			return d.time;
		}
		function yValue( d ) {
			return d.value;
		}
	});

});
