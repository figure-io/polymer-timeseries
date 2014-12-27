/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'annotations', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide an attribute to set annotations', function test() {
		expect( el.annotations ).to.be.an( 'array' );
	});

	it( 'should emit an `error` if set to a non-array', function test( done ) {
		var annotations = el.annotations,
			values;

		values = [
			'beep',
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
			el.annotations = values.shift();
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
			assert.deepEqual( el.annotations, annotations );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit an `error` if an annotation is a non-array', function test( done ) {
		var annotations = el.annotations,
			values;

		values = [
			function(){},
			'beep',
			5,
			NaN,
			null,
			undefined,
			true,
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.annotations[ 0 ] = values.shift();
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
			assert.deepEqual( el.annotations, annotations );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.annotations = [[0,'beep']];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'annotations' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit an `annotations` event when set to a new value', function test( done ) {
		el.addEventListener( 'annotations', onChange );

		el.annotations = [[0,'boop']];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'annotations', onChange );
			done();
		}
	});

	it( 'should emit a `changed` event when an annotation is updated', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.annotations[ 0 ] = [0,'bop'];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'annotations' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit an `annotations` event when an annotation is updated', function test( done ) {
		el.addEventListener( 'annotations', onChange );

		el.annotations[ 0 ] = [0,'foo'];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'annotations', onChange );
			done();
		}
	});

	it( 'should remove any existing annotations if set to an empty array' );

	it( 'should update the chart annotations' );

});
