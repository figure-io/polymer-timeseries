/* global describe, it, assert, expect */
'use strict';

// TESTS //

describe( 'chartTitle', function tests() {

	var el = document.querySelector( '#fixture' );

	it( 'should expose a chart title attribute', function test() {
		expect( el.chartTitle ).to.be.a( 'string' );
	});

	it( 'should emit an `error` if set to a non-string', function test( done ) {
		var title = el.chartTitle,
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
			el.chartTitle = values.shift();
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
			assert.strictEqual( el.chartTitle, title );
			el.removeEventListener( 'err', onError );
			done();
		}
	});

	it( 'should emit a `changed` event when set to a new value', function test( done ) {
		el.addEventListener( 'changed', onChange );

		el.chartTitle = 'beep';

		function onChange( evt ) {
			assert.isObject( evt.detail );
			assert.strictEqual( evt.detail.attr, 'chartTitle' );
			el.removeEventListener( 'changed', onChange );
			done();
		}
	});

	it( 'should update the chart title', function test( done ) {
		var title, content;

		el.addEventListener( 'changed', onChange );

		title = el.$.chart.querySelector( '.title' );

		content = title.textContent;

		el.chartTitle = 'beep boop';

		function onChange( evt ) {
			if ( evt.detail.attr !== 'chartTitle' ) {
				return;
			}
			assert.strictEqual( el.chartTitle, 'beep boop' );
			assert.strictEqual( title.textContent, 'beep boop' );
			done();
		}
	});

});
