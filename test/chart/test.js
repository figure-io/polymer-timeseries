/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'chart', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide a chart method', function test() {
		expect( el.chart ).to.be.a( 'function' );
	});

	it( 'should be immediately invoked once an element is attached to the DOM' );

});
