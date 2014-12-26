/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'createBase', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a method to create a chart base; e.g., SVG, canvas, etc', function test() {
		expect( el.createBase ).to.be.a( 'function' );
	});

	it( 'should create a base SVG canvas', function test() {
		var el = document.createElement( 'polymer-timeseries' );

		document.body.appendChild( el );
		el.$.chart.innerHTML = '';

		assert.notOk( el.$.chart.innerHTML );
		el.createBase();
		assert.ok( el.$.chart.innerHTML );
		assert.ok( el.$.chart.querySelector( 'svg' ) );

		document.body.removeChild( el );
	});

	it( 'should create a graph element', function test() {
		assert.ok( el.$.chart.querySelector( '.graph' ) );
	});

	it( 'should create a clipPath element', function test() {
		assert.ok( el.$.chart.querySelector( '.clipPath' ) );
	});

	it( 'should remove an existing canvas', function test() {
		var id = 'testtesttest1234',
			svg;

		svg = el.$.chart.querySelector( 'svg' );
		assert.ok( svg );
		svg.setAttribute( 'id', id );

		assert.ok( el.$.chart.querySelector( '#' + id ) );

		el.createBase();

		assert.ok( el.$.chart.querySelector( 'svg' ) );
		assert.notOk( el.$.chart.querySelector( '#' + id ) );
	});

});
