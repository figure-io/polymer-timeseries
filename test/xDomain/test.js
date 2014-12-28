/* global describe, it, assert, expect, beforeEach */
'use strict';

// TESTS //

describe( 'xDomain', function tests() {

	var el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		el.data = [];
	});

	it( 'should provide a method to compute the x-domain', function test() {
		expect( el.xDomain ).to.be.a( 'function' );
	});

	it( 'should emit an `error` if not provided a min value which is either a valid `Date` or null', function test( done ) {
		var values = [
			'beep',
			NaN,
			undefined,
			// true, // NOTE: for whatever reason, new Date( true ) returns a valid Date object
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.xDomain( values.shift(), new Date() );
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

	it( 'should emit an `error` if not provided a max value which is either a valid `Date` or null', function test( done ) {
		var values = [
			'beep',
			NaN,
			undefined,
			// true, // NOTE: for whatever reason, new Date( true ) returns a valid Date object
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.xDomain( new Date(), values.shift() );
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

	it( 'should return the min and max values as millisecond timestamps in a two-element array', function test() {
		var min, max, expected, actual;

		max = new Date();
		min = new Date( max-100 ).toISOString();

		expected = [
			new Date( min ).getTime(),
			new Date( max ).getTime()
		];
		actual = el.xDomain( min, max );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute the minimum domain value if min is null', function test() {
		var min, max, expected, actual;

		max = new Date().getTime();
		min = max - 100;

		el.data = [[
			[ min, 0 ],
			[ max, 1 ]
		]];

		expected = [ min, max ];
		actual = el.xDomain( null, max );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute the maximum domain value if max is null', function test() {
		var min, max, expected, actual;

		max = new Date().getTime();
		min = max - 100;

		el.data = [[
			[ min, 0 ],
			[ max, 1 ]
		]];

		expected = [ min, max ];
		actual = el.xDomain( min, null );

		assert.deepEqual( actual, expected );
	});

});
