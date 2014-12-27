/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'labels', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should provide an attribute to set data labels', function test() {
		expect( el.labels ).to.be.an( 'array' );
	});

	it( 'should emit an `error` if set to a non-array', function test( done ) {
		var labels = el.labels,
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
			el.labels = values.shift();
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
			assert.deepEqual( el.labels, labels );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit an `error` if a label is a non-string', function test( done ) {
		var labels = el.labels,
			values;

		values = [
			function(){},
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
			el.labels[ 0 ] = values.shift();
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
			assert.deepEqual( el.labels, labels );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.labels = ['beep'];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'labels' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `labels` event when set to a new value', function test( done ) {
		el.addEventListener( 'labels', onChange );

		el.labels = ['boop'];

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'labels', onChange );
			done();
		}
	});

	it( 'should emit a `changed` event when a label is updated', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.labels[ 0 ] = 'bop';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'labels' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should emit a `labels` event when a label is updated', function test( done ) {
		el.addEventListener( 'labels', onChange );

		el.labels[ 0 ] = 'foo';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.type, 'changed' );
			el.removeEventListener( 'labels', onChange );
			done();
		}
	});

	it( 'should update data labels' );

	it( 'should reset the chart legend' );

});
