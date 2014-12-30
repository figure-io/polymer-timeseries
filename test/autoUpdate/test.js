/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'autoUpdate', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for turning on or off auto updating DOM elements', function test() {
		expect( el.autoUpdate ).to.be.a( 'boolean' );
	});

	it( 'should emit an `error` if not set to a boolean', function test( done ) {
		var bool = el.autoUpdate,
			values;

		values = [
			function(){},
			'5',
			NaN,
			undefined,
			null,
			5,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.autoUpdate = values.shift();
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
			assert.strictEqual( el.autoUpdate, bool );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.autoUpdate = !el.autoUpdate;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'autoUpdate' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

});
