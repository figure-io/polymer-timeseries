'use strict';

// MODULES //

var uuid = require( 'node-uuid' );


// VARIABLES //

var X1,
	X2;

X2 = new Date();
X1 = new Date( X2.getTime() - 3600000 );


// INIT //

/**
* FUNCTION: init()
*	Initialization.
*/
function init() {
	/* jshint validthis:true */
	var create = document.createElement.bind( document ),
		d3,
		el,
		$;

	// Create a new D3 element to access the library dependency:
	el = create( 'polymer-d3' );
	d3 = el.d3;
	this._d3 = d3;

	// Assign the chart a private uuid:
	this.__uid__ = uuid.v4();

	// Private methods...

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
	this._x = this.x.bind( this );
	this._y = this.y.bind( this );
	this._line = d3.svg.line()
		.x( this._x )
		.y( this._y )
		.defined( this.isDefined )
		.interpolate( this.interpolation )
		.tension( this.tension );

	this._triangle = triangle.bind( this );
	this._vline = vline.bind( this );

	// Colors...
	this._colors = OPTS.category10;
	this._getColor = this.getColor.bind( this );

	// Legend...
	this._getLabel = this.getLabel.bind( this );

	// Stream...
	this._stream = null;

	// Interaction...
	this._toggleSeries = this.toggleSeries.bind( this );
	this._toggleVLine = this.toggleVLine.bind( this );

	this._onDragStart = this.onDragStart.bind( this );
	this._onDragEnd = this.onDragEnd.bind( this );

	this._onResize = delayed( this.onResize.bind( this ), 400 );

	// Element cache...
	this.$ = $ = {};

	// Base elements...
	$.root = null;
	$.canvas = null;
	$.clipPath = null;
	$.graph = null;
	$.bkgd = null;

	// Axis elements...
	$.xAxis = null;
	$.yAxis = null;
	$.xLabel = null;
	$.yLabel = null;

	// Meta elements...
	$.meta = null;
	$.title = null;

	// Legend elements...
	$.legend = null;
	$.legendEntries = null;
	$.legendSymbols = null;
	$.legendLabels = null;

	// Data elements...
	$.marks = null;
	$.paths = null;

	// Annotation elements...
	$.agroup = null;
	$.annotations = null;
	$.annotationMarks = null;
	$.annotationLines = null;

	// Clip path...
	this._clipPathID = uuid.v4();

	return this;
} // end FUNCTION init()


// EXPORTS //

module.exports = init;
