/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'yLabel', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose an attribute for specifying the y-axis label', function test() {
		expect( el.yLabel ).to.be.a( 'string' );
	});

	it( 'should emit an `error` if set to a non-string', function test( done ) {
		var label = el.yLabel,
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
			el.yLabel = values.shift();
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
			assert.strictEqual( el.yLabel, label );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.yLabel = 'beep';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'yLabel' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the y-axis label', function test( done ) {
		var label, content;

		el.addEventListener( 'changed', onChange );

		label = el.$.chart.querySelector( '.y.axis .label' );

		content = label.textContent;

		el.yLabel = 'beep boop';

		function onChange( evt ) {
			if ( evt.detail.attr !== 'yLabel' ) {
				return;
			}
			assert.strictEqual( el.yLabel, 'beep boop' );
			assert.strictEqual( label.textContent, 'beep boop' );
			done();
		}
	});

});
