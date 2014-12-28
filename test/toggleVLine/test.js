/* global describe, it, beforeEach, assert, expect */
'use strict';

// TESTS //

describe( 'toggleVLine', function tests() {

	var el = document.querySelector( '#fixture' );

	beforeEach( function before( done ) {
		el.clear();
		el.annotations = [
			[
				new Date(),
				'red alert 1'
			],
			[
				new Date()+100,
				'red alert 2'
			]
		];
		setTimeout( done, 100 );
	});

	it( 'should be a function', function test() {
		expect( el.toggleVLine ).to.be.a( 'function' );
	});

	it( 'should toggle annotation line visibility', function test() {
		var num, selection, vlines, len;

		num = el.annotations.length;

		vlines = el.$.chart.querySelectorAll( '.annotation .vline' );

		selection = el.$.chart.querySelectorAll( '.annotation .hidden' );

		if ( selection.length !== num ) {
			throw new Error( 'Why are annotation lines already shown?' );
		}
		// Toggle the second annotation:
		el.toggleVLine( el.annotations[1], 1 );

		selection = el.$.chart.querySelectorAll( '.annotation .hidden' );

		len = selection.length;

		assert.strictEqual( len, num-1 );
		for ( var i = 0; i < len; i++ ) {
			assert.notEqual( selection[ i ], vlines[ 1 ] );
		}
		// Toggle the second annotation again:
		el.toggleVLine( el.annotations[1], 1 );

		selection = el.$.chart.querySelectorAll( '.annotation .hidden' );

		len = selection.length;
		assert.strictEqual( len, num );
	});

	it( 'should emit an `annotation` event when an annotation line is made visible', function test( done ) {
		el.addEventListener( 'annotation', onToggle );

		el.toggleVLine( el.annotations[ 0 ], 0 );

		function onToggle( evt ) {
			assert.isObject( evt.detail );
			assert.property( evt.detail, 'idx' );
			assert.property( evt.detail, 'value' );
			el.removeEventListener( 'annotation', onToggle );
			done();
		}
	});

	it( 'should not throw an error if invoked with an out-of-bounds annotation index', function test() {
		expect( foo ).to.not.throw( Error );
		function foo() {
			el.toggleVLine( null, 100 );
		}
	});

});
