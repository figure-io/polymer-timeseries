'use strict';

// MODULES //

var uuid = require( 'node-uuid' ),
	cache = require( './cache.js' );


// FIXME: get rid of this dependency. Use polymer component.
var d3 = require( 'd3' );


// LISTENERS //

var onResize = require( './../listeners/resize.js' ),
	toggleSeries = require( './../listeners/toggleSeries.js' ),
	toggleVLine = require( './../listeners/toggleVLine.js' ),
	onDragStart = require( './../listeners/dragStart.js' ),
	onDragEnd = require( './../listeners/dragEnd.js' );


// UTILS //

var delayed = require( './../utils/delayed.js' ),
	triangle = require( './../utils/triangle.js' ),
	vline = require( './../utils/vline.js' ),
	getColor = require( './../utils/getColor.js' ),
	getLabel = require( './../utils/getLabel.js' ),
	x = require( './../utils/x.js' ),
	y = require( './../utils/y.js' );


// VARIABLES //

var COLORS = require( './../colors' ),
	X2 = new Date(),
	X1 = new Date( X2.getTime() - 3600000 );


// INIT //

/**
* FUNCTION: init()
*	Initialization.
*/
function init() {
	/* jshint validthis:true */

	// FIXME: use polymer component
	// var d3,
	// 	el;

	// // Create a new D3 element to access the library dependency:
	// el = document.createElement( 'polymer-d3' );
	// d3 = el.d3;
	this._d3 = d3;

	// Assign the chart a private uuid:
	this.__uid__ = uuid.v4();

	// Scales...
	this._xScale = d3.time.scale();
	this._yScale = d3.scale.linear();

	this._xScale
		.domain( [ X1, X2 ] )
		.range( [ 0, this._graphWidth() ] );
	this._yScale
		.domain( [ 0, 1 ] )
		.range( [ this._graphHeight(), 0 ] );

	// Axes...
	this._xTickFormat = d3.time.format( this.xTickFormat );
	this._yTickFormat = null;

	this._xAxis = d3.svg.axis()
		.scale( this._xScale )
		.orient( this.xAxisOrient )
		.tickFormat( this._xTickFormat )
		.ticks( this.xNumTicks || 5 );

	this._yAxis = d3.svg.axis()
		.scale( this._yScale )
		.orient( this.yAxisOrient )
		.tickFormat( this._yTickFormat )
		.ticks( this.yNumTicks || 5 );

	// Paths...
	this._x = x( this._xScale );
	this._y = y( this._yScale );
	this._line = d3.svg.line()
		.x( this._x )
		.y( this._y )
		.defined( this.isDefined )
		.interpolate( this.interpolation )
		.tension( this.tension );

	this._triangle = triangle( this );
	this._vline = vline( this );

	// Colors...
	this._colors = COLORS.category10.slice();
	this._getColor = getColor( this );

	// Legend...
	this._getLabel = getLabel( this );

	// Stream...
	this._stream = null;

	// Interaction...
	this._toggleSeries = toggleSeries( this );
	this._toggleVLine = toggleVLine( this );

	this._onDragStart = onDragStart( this );
	this._onDragEnd = onDragEnd( this );

	this._onResize = delayed( onResize( this ), 400 );

	// Extend the element cache...
	this.$ = cache( this.$ );

	// Clip path...
	this._clipPathID = uuid.v4();

	return this;
} // end FUNCTION init()


// EXPORTS //

module.exports = init;
