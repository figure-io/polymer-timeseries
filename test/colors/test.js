/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'colors', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide an attribute to set data labels', function test() {
		assert.ok( el.colors );
	});

	it( 'should emit an `error` if not set to an array or recognized color option string', function test( done ) {
		var colors = el.colors,
			values;

		values = [
			'_unrecoGnizEd_cOlOr_option_',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			function(){}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.colors = values.shift();
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
			assert.deepEqual( el.colors, colors );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.colors = [ 'color1' ];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'colors' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `colors` event when set to a new value', function test( done ) {
		el.addEventListener( 'colors', onChange );

		el.colors = [ 'color2' ];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'colors', onChange );
			done();
		}
	});

	it( 'should emit a `changed` event when a color is updated', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.colors[ 0 ] = 'color3';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'colors' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `colors` event when a color is updated', function test( done ) {
		el.addEventListener( 'colors', onChange );

		el.colors[ 0 ] = 'color4';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'colors', onChange );
			done();
		}
	});

	it( 'should update timeseries colors' );

	// Note: should remove an existing color class!
	it( 'should update legend symbol colors' );

	it( 'should not emit an `error` event if no symbols exist' );

});
