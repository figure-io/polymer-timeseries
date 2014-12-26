/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xAxisOrient', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the x-axis orientation', function test() {
		expect( el.xAxisOrient ).to.be.a( 'string' );
	});

	it( 'should emit an `error` if set to a non-string or an unrecognized orientation option', function test( done ) {
		var opt = el.xAxisOrient,
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
			el.xAxisOrient = values.shift();
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
			assert.strictEqual( el.xAxisOrient, opt );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xAxisOrient = 'top';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'xAxisOrient' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the x-axis' );

});
