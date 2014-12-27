/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'data', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide an attribute to set data', function test() {
		expect( el.data ).to.be.an( 'array' );
	});

	it( 'should emit an `error` if set to a non-array', function test( done ) {
		var data = el.data,
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
			el.data = values.shift();
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
			assert.deepEqual( el.data, data );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit an `error` if a dataset is a non-array', function test( done ) {
		var data = el.data,
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
			el.data[ 0 ] = values.shift();
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
			assert.deepEqual( el.data, data );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.data = [[[new Date(),1]]];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'data' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `data` event when set to a new value', function test( done ) {
		el.addEventListener( 'data', onChange );

		el.data = [[[new Date(),2]]];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'data', onChange );
			done();
		}
	});

	it( 'should emit a `changed` event when a dataset is updated', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.data[ 0 ] = [[new Date(),3]];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'data' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `data` event when a dataset is updated', function test( done ) {
		el.addEventListener( 'data', onChange );

		el.data[ 0 ] = [[new Date(),4]];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'data', onChange );
			done();
		}
	});

	it( 'should remove any existing timeseries elements if set to an empty array' );

	it( 'should update the x-axis' );

	it( 'should update the y-axis' );

	it( 'should update the annotations, when x-min and -max change' );

	it( 'should reset the chart timeseries elements' );

});
