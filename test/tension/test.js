/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'tension', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the interpolation tension', function test() {
		expect( el.tension ).to.be.a( 'number' );
	});

	it( 'should emit an `error` if not set to a number', function test( done ) {
		var tension = el.tension,
			values;

		values = [
			function(){},
			'5',
			NaN,
			undefined,
			null,
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.tension = values.shift();
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
			assert.strictEqual( el.tension, tension );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.tension = 0;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'tension' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	// Note: just test before and after. The path string should change (but only for certain interpolation modes!)
	it( 'should update the timeseries paths' );

});
