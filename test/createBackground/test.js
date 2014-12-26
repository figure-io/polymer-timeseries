/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'createBackground', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a method to create a chart background', function test() {
		expect( el.createBackground ).to.be.a( 'function' );
	});

	it( 'should create a background element', function test() {
		var el = document.createElement( 'polymer-timeseries' );

		document.body.appendChild( el );
		el.$.chart.innerHTML = '';

		assert.notOk( el.$.chart.innerHTML );

		el.createBase();
		assert.notOk( el.$.chart.querySelector( '.background' ) );

		el.createBackground();
		assert.ok( el.$.chart.querySelector( '.background' ) );

		document.body.removeChild( el );
	});

	it( 'should remove an existing background', function test() {
		var id = 'testtesttest1234',
			bkgd;

		bkgd = el.$.chart.querySelector( '.background' );
		assert.ok( bkgd );
		bkgd.setAttribute( 'id', id );

		assert.ok( el.$.chart.querySelector( '#' + id ) );

		el.createBackground();

		assert.ok( el.$.chart.querySelector( '.background' ) );
		assert.notOk( el.$.chart.querySelector( '#' + id ) );
	});

});
