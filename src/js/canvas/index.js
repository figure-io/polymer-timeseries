/**
*
*	CANVAS
*
*
*	DESCRIPTION:
*		- Defines a canvas layer interface.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter,
	d3 = require( 'd3' );


// FUNCTIONS //

/**
* FUNCTION: register( parent, child )
*	Registers a child with a parent.
*
* @private
* @param {Object} parent - parent instance
* @param {Canvas} child - child instance
*/
function register( parent, child ) {
	var config = parent._config,
		children = parent._children;

	if ( !Array.isArray( config.canvas ) ) {
		config.canvas = [];
	}
	config.canvas.push( child._config );

	if ( !Array.isArray( children.canvas ) ) {
		children.canvas = [];
	}
	children.canvas.push( child );
} // end FUNCTION register()

/**
* FUNCTION: createSVG()
*	Appends an SVG canvas to a parent element.
*
* @private
*/
function createSVG() {
	/* jshint validthis: true */
	var parent = this._parent.$.root,
		width = this._config.width,
		height = this._config.height;

	// TODO: minimal element
	this.$.root = d3.select( parent ).append( 'svg:svg' )
		.attr( 'property', 'canvas' )
		.attr( 'class', 'canvas' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'viewBox', '0 0 ' + width + ' ' + height )
		.attr( 'preserveAspectRatio', 'xMidYMid' )
		.attr( 'data-aspect', width / height );
} // end FUNCTION createSVG()


// CANVAS //

// TODO: define `parent` more explicitly
// TODO: consider duck typing the parent: `_config`, `children`. Both `objects`. `$.root` which is DOMElement.

/**
* FUNCTION: Canvas( parent )
*	Canvas constructor.
*
* @constructor
* @param {Object} parent - parent instance
* @returns {Canvas} Canvas instance
*/
function Canvas( parent ) {
	EventEmitter.call( this );

	// Cache a reference to the canvas parent:
	this._parent = parent;

	// Initialize a cache to store children:
	this._children = {};

	// Canvas configuration...
	this._config = {
		'width': 500,
		'height': 500,
		// 'background': false // TODO: why desired?
	};

	// Canvas generators...
	this._svg = createSVG.bind( this );

	// Initialize a cache for DOM elements...
	this.$ = {
		'root': null
	};

	// Register with the parent...
	register( parent, this );

	return this;
} // end FUNCTION Canvas()

/**
* Create a prototype which inherits from the parent prototype.
*/
Canvas.prototype = Object.create( EventEmitter.prototype );

/**
* Set the constructor.
*/
Canvas.prototype.constructor = Canvas;

/**
* METHOD: create( [type] )
*	Creates a new canvas element. If provided a type, appends a canvas element of the specified type to a root parent element. If no type is provided, defaults to creating an SVG canvas.
*
* @param {String} [type] - canvas type to be created (default: 'svg')
* @returns {Canvas} Canvas instance
*/
Canvas.prototype.create = function( type ) {
	var opt = 'svg',
		key = '_',
		fcn;
	if ( arguments.length ) {
		if ( typeof type !== 'string' ) {
			throw new TypeError( 'create()::invalid input argument. Must provide a string.' );
		}
		opt = type;
	}
	key += opt;
	fcn = this[ key ];
	if ( !fcn ) {
		throw new Error( 'create()::unrecognized canvas type: ' + opt + '.' );
	}
	fcn();
	return this;
}; // end METHOD create()

/**
* METHOD: width( [width] )
*	Width setter and getter. If provided a value, sets the canvas width. If no value is provided, returns the canvas width.
*
* @param {Number} [width] - canvas width
* @returns {Canvas|Number} Canvas instance or canvas width
*/
Canvas.prototype.width = function( width ) {
	var height = this._config.height;
	if ( !arguments.length ) {
		return this._config.width;
	}
	if ( typeof width !== 'number' || width !== width || width <= 0 ) {
		throw new TypeError( 'width()::invalid input argument. Must provide a number greater than 0. Value: `' + width + '`.' );
	}
	this._config.width = width;

	// TODO: make more general (beyond SVG)

	// Update the canvas...
	if ( this.$.root ) {
		this.$.root
			.attr( 'width', width )
			.attr( 'viewBox', '0 0 ' + width + ' ' + height )
			.attr( 'data-aspect', width / height );
	}
	return this;
}; // end METHOD width()

/**
* METHOD: height( [height] )
*	Height setter and getter. If provided a value, sets the canvas height. If no value is provided, returns the canvas height.
*
* @param {Number} height - canvas height
* @returns {Canvas|Number} Canvas instance or canvas height
*/
Canvas.prototype.height = function( height ) {
	var width = this._config.width;
	if ( !arguments.length ) {
		return this._config.height;
	}
	if ( typeof height !== 'number' || height !== height || height <= 0 ) {
		throw new TypeError( 'height()::invalid input argument. Must provide a number greater than 0. Value: `' + height + '`.' );
	}
	this._config.height = height;

	if ( this.$.root ) {
		this.$.root
			.attr( 'height', height )
			.attr( 'viewBox', '0 0 ' + width + ' ' + height )
			.attr( 'data-aspect', width / height );
	}
	return this;
}; // end METHOD height()

// TODO: be more explicit about parent

/**
* METHOD: parent()
*	Returns the canvas parent.
*
* @returns {Object} parent instance
*/
Canvas.prototype.parent = function() {
	return this._parent;
}; // end METHOD parent()

/**
* METHOD: config()
*	Returns the canvas configuration as a JSON blob.
*
* @returns {Object} configuration blob
*/
Canvas.prototype.config = function() {
	// Prevent direct tampering with the config object:
	return JSON.parse( JSON.stringify( this._config ) );
}; // end METHOD config()

/**
* METHOD: children()
*	Returns the canvas children.
*
* @returns {Object} canvas children
*/
Canvas.prototype.children = function() {
	return this._children;
}; // end METHOD children()


// EXPORTS //

module.exports = Canvas;
