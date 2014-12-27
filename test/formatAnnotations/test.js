/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'formatAnnotations', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a method to convert raw annotations into a standard representation', function test() {
		expect( el.formatAnnotations ).to.be.an( 'function' );
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
			el.formatAnnotations( values.shift() );
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

	it( 'should convert a raw annotations array to a standard representation (array of arrays)', function test() {
		var xVal = el.xValue,
			aVal = el.aValue,
			annotations,
			expected,
			actual;

		el.xValue = xValue;
		el.aValue = aValue;

		annotations = [
			{
				'time': new Date(),
				'annotation': 'Red alert!'
			}
		];

		expected = [
			[
				annotations[ 0 ].time,
				annotations[ 0 ].annotation
			]
		];

		actual = el.formatAnnotations( annotations );

		assert.deepEqual( actual, expected );

		// Reset the accessors to original values:
		el.xValue = xVal;
		el.aValue = aVal;

		function xValue( d ) {
			return d.time;
		}
		function aValue( d ) {
			return d.annotation;
		}
	});

});
