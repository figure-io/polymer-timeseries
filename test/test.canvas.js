/* global describe, it, before, beforeEach, after, afterEach, require */
'use strict';

var mpath = './../src/js/canvas';


// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Event Emitter class:
	EventEmitter = require( 'events' ).EventEmitter,

	// Proxyquire require for stubbing dependencies:
	proxyquire = require( 'proxyquire' ),

	// D3 stub:
	createD3 = require( './fixtures/d3.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'canvas', function tests() {

	// SETUP //

	var d3,
		Canvas,
		parent,
		canvas;

	parent = {
		'$': {
			'root': null
		},
		'_config': {},
		'_children': {},
		config: function() {
			return this._config;
		},
		children: function() {
			return this._children;
		}
	};

	beforeEach( function() {
		d3 = createD3();
		Canvas = proxyquire( mpath, { 'd3': d3 });
		parent._config = {};
		parent._children = {};
		canvas = new Canvas( parent );
	});


	// TESTS //

	it( 'should export a constructor', function test() {
		expect( Canvas ).to.be.a( 'function' );
	});

	it( 'should be an event emitter', function test() {
		assert.instanceOf( canvas, EventEmitter );
	});

	it( 'should register with its parent instance', function test() {
		// No prior canvas:
		assert.deepEqual( parent.config().canvas[ 0 ], canvas.config() );

		assert.strictEqual( parent.children().canvas[ 0 ], canvas );

		// Add another canvas:
		canvas = new Canvas( parent );

		assert.deepEqual( parent.config().canvas[ 1 ], canvas.config() );

		assert.strictEqual( parent.children().canvas[ 1 ], canvas );
	});

	// CREATE //

	describe( 'creating a new canvas', function test() {

		it( 'should provide a method to create a new canvas', function test() {
			expect( canvas.create ).to.be.a( 'function' );
		});

		it( 'should emit an error if not provided a string', function test( done ) {
			var counter = 0,
				values;

			values = [
				5,
				NaN,
				null,
				undefined,
				true,
				function(){},
				[],
				{}
			];

			canvas.on( 'error', onError );

			for ( var i = 0; i < values.length; i++ ) {
				canvas.create( values[ i ] );
			}

			function onError( err ) {
				assert.instanceOf( err, TypeError );
				if ( ++counter === values.length ) {
					done();
				}
			}
		});

		it( 'should emit an error if provided an unrecognized canvas type', function test() {
			canvas.on( 'error', onError );
			canvas.create( 'unrecognized_type' );
			function onError( err ) {
				assert.instanceOf( err, Error );
				assert.ok( true );
			}
		});

		it( 'should create an svg canvas', function test() {
			canvas.create( 'svg' );
			assert.strictEqual( d3.append(), 'svg:svg' );
			assert.strictEqual( d3.attr( 'width' ), canvas.width() );
			assert.strictEqual( d3.attr( 'height' ), canvas.height() );
		});

		it( 'should default to an svg canvas', function test() {
			canvas.create();
			assert.strictEqual( d3.append(), 'svg:svg' );
		});

	}); // end TESTS create

	// WIDTH //

	describe( 'canvas width', function tests() {

		it( 'should provide a method to set/get the canvas width', function test() {
			expect( canvas.width ).to.be.a( 'function' );
		});

		it( 'should emit an error if not provided a number greater than 0', function test( done ) {
			var counter = 0,
				values;

			values = [
				'5',
				-5,
				0,
				NaN,
				null,
				undefined,
				true,
				function(){},
				[],
				{}
			];

			canvas.on( 'error', onError );

			for ( var i = 0; i < values.length; i++ ) {
				canvas.width( values[ i ] );
			}

			function onError( err ) {
				assert.instanceOf( err, TypeError );
				if ( ++counter === values.length ) {
					done();
				}
			}
		});

		it( 'should set the width', function test() {
			var width = canvas.width() + 100;
			canvas.width( width );
			assert.strictEqual( canvas.width(), width );
		});

		it( 'should update the canvas element', function test() {
			var width = canvas.width() + 100;
			canvas.create( 'svg' );
			canvas.width( width );
			assert.strictEqual( d3.attr( 'width' ), width );
		});

	}); // end TESTS width

	// HEIGHT //

	describe( 'canvas height', function tests() {

		it( 'should provide a method to set/get the canvas height', function test() {
			expect( canvas.height ).to.be.a( 'function' );
		});

		it( 'should emit an error if not provided a number greater than 0', function test( done ) {
			var counter = 0,
				values;

			values = [
				'5',
				-5,
				0,
				NaN,
				null,
				undefined,
				true,
				function(){},
				[],
				{}
			];

			canvas.on( 'error', onError );

			for ( var i = 0; i < values.length; i++ ) {
				canvas.height( values[ i ] );
			}

			function onError( err ) {
				assert.instanceOf( err, TypeError );
				if ( ++counter === values.length ) {
					done();
				}
			}
		});

		it( 'should set the height', function test() {
			var height = canvas.height() + 100;
			canvas.height( height );
			assert.strictEqual( canvas.height(), height );
		});

		it( 'should update the canvas element', function test() {
			var height = canvas.height() + 100;
			canvas.create( 'svg' );
			canvas.height( height );
			assert.strictEqual( d3.attr( 'height' ), height );
		});

	}); // end TESTS height

	// PARENT //

	describe( 'parent', function tests() {

		it( 'should provide a method to get the canvas parent', function test() {
			expect( canvas.parent ).to.be.a( 'function' );
		});

		it( 'should return the canvas parent', function test() {
			assert.strictEqual( canvas.parent(), parent );
		});

	});

	// CONFIG //

	describe( 'config', function tests() {

		it( 'should provide a method to get the canvas config', function test() {
			expect( canvas.config ).to.be.a( 'function' );
		});

		it( 'should return the canvas config', function test() {
			assert.isObject( canvas.config() );
		});

	});

	// CHILDREN //

	describe( 'children', function tests() {

		it( 'should provide a method to get the canvas children', function test() {
			expect( canvas.children ).to.be.a( 'function' );
		});

		it( 'should return the canvas children', function test() {
			assert.isObject( canvas.children() );
		});

	});

});
