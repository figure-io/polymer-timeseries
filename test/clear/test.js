/* global describe, it, beforeEach, assert, expect */
'use strict';

// TESTS //

describe( 'clear', function tests() {

	var el = document.querySelector( '#fixture' );

	beforeEach( function before( done ) {
		el.data = [[
			[ new Date(), Math.random() ],
			[ new Date(), Math.random() ]
		]];
		el.labels = [ 'timeseries_1' ];
		el.annotations = [
			[ new Date(), 'red alert' ]
		];
		setTimeout( done, 100 );
	});

	it( 'should provide a method to clear the chart and reset axes', function test() {
		expect( el.clear ).to.be.a( 'function' );
	});

	it( 'should reset the chart data', function test() {
		el.clear();
		assert.notOk( el.data.length );
	});

	it( 'should reset the chart data labels', function test() {
		el.clear();
		assert.notOk( el.labels.length );
	});

	it( 'should reset the chart annotations', function test() {
		el.clear();
		assert.notOk( el.annotations.length );
	});

	it( 'should not display any timeseries', function test( done ) {
		var selection;

		selection = el.$.chart.querySelectorAll( '.marks .line' );

		assert.ok( selection.length );

		el.clear();

		setTimeout( onTimeout, 100 );

		function onTimeout() {
			selection = el.$.chart.querySelectorAll( '.marks .line' );

			assert.notOk( selection.length );
			done();
		}
	});

	it( 'should not display any annotations', function test( done ) {
		var selection;

		selection = el.$.chart.querySelectorAll( '.annotation' );

		assert.ok( selection.length );

		el.clear();

		setTimeout( onTimeout, 100 );

		function onTimeout() {
			selection = el.$.chart.querySelectorAll( '.annotation' );

			assert.notOk( selection.length );
			done();
		}
	});

	it( 'should not display any legend entries', function test( done ) {
		var selection;

		selection = el.$.chart.querySelectorAll( '.legend .label' );

		assert.ok( selection.length );

		el.clear();

		setTimeout( onTimeout, 100 );

		function onTimeout() {
			selection = el.$.chart.querySelectorAll( '.legend .label' );

			assert.notOk( selection.length );
			done();
		}
	});

	it( 'should reset the chart title' );

	it( 'should reset the chart axes' );

});
