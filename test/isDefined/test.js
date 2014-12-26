/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'isDefined', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose a method for specifying missing value encoding', function test() {
		expect( el.isDefined ).to.be.a( 'function' );
	});

	it( 'should emit an `error` if set to a non-function', function test( done ) {
		var isDefined = el.isDefined,
			values;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.isDefined = values.shift();
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
			assert.strictEqual( el.isDefined, isDefined );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.isDefined = noop;

		function noop(){
			// nothing...
		}
		function onChange( evt ) {
			assert.isObject( evt.detail );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the timeseries path elements' );

});
