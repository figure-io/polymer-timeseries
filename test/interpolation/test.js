/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'interpolation', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the path interpolation', function test() {
		expect( el.interpolation ).to.be.a( 'string' );
	});

	it( 'should emit an `error` if set to a non-string or an unrecognized interpolation option', function test( done ) {
		var opt = el.interpolation,
			values;

		values = [
			'_unreCoGnized_opTion_',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.interpolation = values.shift();
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
			assert.strictEqual( el.interpolation, opt );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.interpolation = 'basis';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'interpolation' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	// Note: to test, just compare the path string before and after. No need to test interpolation algorithm.
	it( 'should update the timeseries paths' );

});
