/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'xNumTicks', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the x-axis tick number', function test() {
		assert.isNull( el.xNumTicks );
	});

	it( 'should emit an `error` if not set to a positive integer or null', function test( done ) {
		var num = el.xNumTicks,
			values;

		values = [
			function(){},
			'5',
			-1,
			3.14,
			NaN,
			// undefined, // TODO: enable once https://github.com/Polymer/polymer/issues/1053 is resolved
			true,
			[],
			{}
		];

		el.addEventListener( 'err', onError );

		next();

		function next() {
			el.xNumTicks = values.shift();
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
			assert.strictEqual( el.xNumTicks, num );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.xNumTicks = 5;

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'xNumTicks' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	// Note: this is not straightforward as D3 takes the tick number as a recommendation, not an absolute. Hence, updating the x-axis may do nothing. Could just spy the selection.call(), but this seems a bit intrusive. Would rather just test against an updated DOM. We should not care how the DOM gets updated (implementation details).
	it( 'should update the x-axis' );

});
