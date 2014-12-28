/* global describe, it, beforeEach, assert, expect, sinon */
'use strict';

// TESTS //

describe( 'onDrop', function tests() {

	var el, evt, data;

	el = document.querySelector( '#fixture' );

	beforeEach( function before() {
		el.isDroppable = true;
		el.data = [];
		el.labels = [];
		data = {
			'label': 'timeseries_1',
			'data': [
				[
					new Date().getTime(),
					Math.random()
				]
			]
		};
		evt = {
			'dataTransfer': {
				getData: function() {
					return JSON.stringify( data );
				},
				'types': [
					'unsupported/type',
					'application/x-polymer-chart-data'
				]
			},
			preventDefault: function(){},
			stopPropagation: function(){}
		};
	});

	it( 'should be a function', function test() {
		expect( el.onDrop ).to.be.a( 'function' );
	});

	it( 'should not do anything if the chart is configured to not be a drop area', function test() {
		el.isDroppable = false;
		assert.isUndefined( el.onDrop( evt ) );
	});

	it( 'should not do anything if the data transfer type is not `application/x-polymer-chart-data`', function test() {
		evt.dataTransfer.types = [ 'beep' ];
		assert.isUndefined( el.onDrop( evt ) );
	});

	it( 'should return false', function test() {
		assert.isFalse( el.onDrop( evt ) );
	});

	it( 'should update the chart data and labels', function test() {
		el.onDrop( evt );

		assert.ok( el.data.length );
		assert.ok( el.labels.length );
	});

	it( 'should be accept a data transfer with only a label and no timeseries data', function test() {
		data.data = [];
		assert.isFalse( el.onDrop( evt ) );
		assert.notOk( el.data.length );
	});

	it( 'should not throw if `preventDefault` or `stopPropagation` are not supported', function test() {
		delete evt.preventDefault;
		delete evt.stopPropagation;

		assert.isFalse( el.onDrop( evt ) );
	});

	it( 'should emit a `dropped` event with the parsed data transfer payload', function test( done ) {
		el.addEventListener( 'dropped', onDrop );

		el.onDrop( evt );

		function onDrop( evt ) {
			assert.isObject( evt.detail );
			assert.deepEqual( evt.detail, data );
			el.removeEventListener( 'dropped', onDrop );
			done();
		}
	});

});
