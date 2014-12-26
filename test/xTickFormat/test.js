/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xTickFormat', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the x-axis tick format', function test() {
		expect( el.xTickFormat ).to.be.a( 'string' );
	});

	it( 'should emit an `error` if set to a non-string', function test( done ) {
		var fmt = el.xTickFormat,
			values;

		values = [
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
			el.xTickFormat = values.shift();
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
			assert.strictEqual( el.xTickFormat, fmt );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xTickFormat = '%H:%M:%S';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'xTickFormat' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the x-axis' );

});
