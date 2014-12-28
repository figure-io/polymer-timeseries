/* global describe, it, beforeEach, assert, expect */
'use strict';

// TESTS //

describe( 'toggleSeries', function tests() {

	var el = document.querySelector( '#fixture' );

	beforeEach( function before( done ) {
		el.labels = [
			'beep',
			'boop'
		];
		el.data = [
			[
				[
					new Date(),
					Math.random()
				],
				[
					new Date()+100,
					Math.random()
				]
			]
		];
		setTimeout( done, 100 );
	});

	it( 'should be a function', function test() {
		expect( el.toggleSeries ).to.be.a( 'function' );
	});

	it( 'should toggle legend entry visibility', function test() {
		var selection, entries, flg;

		entries = el.$.chart.querySelectorAll( '.legend .entry' );

		selection = el.$.chart.querySelectorAll( '.legend .hidden' );

		if ( selection.length > 0 ) {
			throw new Error( 'Why are legend entries already hidden?' );
		}
		flg = ( selection.length === 0 );

		// Toggle the second series:
		el.toggleSeries( null, 1 );

		selection = el.$.chart.querySelectorAll( '.legend .hidden' );

		assert.strictEqual( selection.length === 0, !flg );
		assert.strictEqual( selection.length, 1 );
		assert.strictEqual( selection[ 0 ], entries[ 1 ] );
	});

	it( 'should toggle timeseries visibility', function test() {
		var selection, lines, flg;

		lines = el.$.chart.querySelectorAll( '.marks .line' );

		selection = el.$.chart.querySelectorAll( '.marks .hidden' );

		if ( selection.length > 0 ) {
			throw new Error( 'Why are timeseries already hidden?' );
		}
		flg = ( selection.length === 0 );

		// Toggle the first series:
		el.toggleSeries( null, 0 );

		selection = el.$.chart.querySelectorAll( '.marks .hidden' );

		assert.strictEqual( selection.length === 0, !flg );
		assert.strictEqual( selection.length, 1 );
		assert.strictEqual( selection[ 0 ], lines[ 0 ] );
	});

	it( 'should not throw an error if invoked with an out-of-bounds legend entry index', function test() {
		expect( foo ).to.not.throw( Error );
		function foo() {
			el.toggleSeries( null, 100 );
		}
	});

	it( 'should not throw an error if no timeseries elements are currently displayed', function test( done ) {
		el.data.length = 0;

		setTimeout( onTimeout, 100 );

		function onTimeout() {
			expect( foo ).to.not.throw( Error );
			done();
		}
		function foo() {
			el.toggleSeries( null, 1 );
		}
	});

});
