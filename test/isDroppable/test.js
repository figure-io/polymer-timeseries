/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'isDroppable', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for turning on or off drop area', function test() {
		expect( el.isDroppable ).to.be.a( 'boolean' );
	});

	it( 'should emit an `error` if not set to a boolean', function test( done ) {
		var bool = el.isDroppable,
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
			el.isDroppable = values.shift();
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
			assert.strictEqual( el.isDroppable, bool );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.isDroppable = !el.isDroppable;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'isDroppable' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should allow elements to be dropped' );

	it( 'should not allow elements to be dropped' );

});
