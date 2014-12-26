/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'yTickFormat', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the y-axis tick format', function test() {
		assert.isNull( el.yTickFormat );
	});

	it( 'should emit an `error` if not set to a string or `null`', function test( done ) {
		var fmt = el.yTickFormat,
			values;

		values = [
			5,
			NaN,
			// undefined, // TODO: enable once https://github.com/Polymer/polymer/issues/1053 is resolved
			true,
			[],
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.yTickFormat = values.shift();
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
			assert.strictEqual( el.yTickFormat, fmt );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.yTickFormat = '%%';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'yTickFormat' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the y-axis' );

	it( 'should update to the default y-axis tick format is set to `null`' );

});
