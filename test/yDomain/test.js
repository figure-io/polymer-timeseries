/* global describe, it, assert, expect, beforeEach */
'use strict';

// TESTS //

describe( 'yDomain', function tests() {

	var el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		el.data = [];
	});

	it( 'should provide a method to compute the y-domain', function test() {
		expect( el.yDomain ).to.be.a( 'function' );
	});

	it( 'should emit an `error` if provided a min value which is not either numeric or null', function test( done ) {
		var values = [
			'beep',
			NaN,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.yDomain( values.shift(), 1 );
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

	it( 'should emit an `error` if provided a max value which is not either numeric or null', function test( done ) {
		var values = [
			'beep',
			NaN,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.yDomain( 0, values.shift() );
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

	it( 'should return the min and max value in an array if both are not null', function test() {
		var expected, actual;

		expected = [ 0, 1 ];
		actual = el.yDomain( 0, 1 );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute the minimum domain value if min is null', function test() {
		var expected, actual;

		el.data = [[
			[ new Date()-100, 1 ],
			[ new Date(), 0 ]
		]];

		expected = [ 0, 1 ];
		actual = el.yDomain( null, 1 );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute the maximum domain value if max is null', function test() {
		var expected, actual;

		el.data = [[
			[ new Date()-100, 1 ],
			[ new Date(), 0 ]
		]];

		expected = [ 0, 1 ];
		actual = el.yDomain( 0, null );

		assert.deepEqual( actual, expected );
	});

});
