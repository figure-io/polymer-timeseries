/**
*
*	CHART
*
*
*	DESCRIPTION:
*		- Defines the chart prototype.
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

/* global document */
'use strict';

// MODULES //

var // Writable stream constructor:
	Stream = require( './stream' ),

	// Utility to create delayed event listeners:
	delayed = require( './utils/delayed.js' );


// VARIABLES //

var OPTS = {},
	EVENTS,
	X1,
	X2;

X2 = new Date();
X1 = new Date( X2.getTime() - 3600000 );

OPTS.xAxisOrient = [
	'bottom',
	'top'
];

OPTS.yAxisOrient = [
	'left',
	'right'
];

OPTS.interpolation = [
	'linear',
	// 'linear-closed',
	'step',
	'step-before',
	'step-after',
	'basis',
	'basis-open',
	// 'basis-closed',
	'bundle',
	'cardinal',
	'cardinal-open',
	// 'cardinal-closed',
	'monotone'
];

// See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10}.
OPTS.colors = [
	'category10',
	'category20',
	'category20b',
	'category20c'
];

OPTS.category10 = [
	'category10-1',
	'category10-2',
	'category10-3',
	'category10-4',
	'category10-5',
	'category10-6',
	'category10-7',
	'category10-8',
	'category10-9',
	'category10-10'
];

OPTS.category20 = [
	'category20-1',
	'category20-2',
	'category20-3',
	'category20-4',
	'category20-5',
	'category20-6',
	'category20-7',
	'category20-8',
	'category20-9',
	'category20-10',
	'category20-11',
	'category20-12',
	'category20-13',
	'category20-14',
	'category20-15',
	'category20-16',
	'category20-17',
	'category20-18',
	'category20-19',
	'category20-20'
];

OPTS.category20b = [
	'category20b-1',
	'category20b-2',
	'category20b-3',
	'category20b-4',
	'category20b-5',
	'category20b-6',
	'category20b-7',
	'category20b-8',
	'category20b-9',
	'category20b-10',
	'category20b-11',
	'category20b-12',
	'category20b-13',
	'category20b-14',
	'category20b-15',
	'category20b-16',
	'category20b-17',
	'category20b-18',
	'category20b-19',
	'category20b-20'
];

OPTS.category20c = [
	'category20c-1',
	'category20c-2',
	'category20c-3',
	'category20c-4',
	'category20c-5',
	'category20c-6',
	'category20c-7',
	'category20c-8',
	'category20c-9',
	'category20c-10',
	'category20c-11',
	'category20c-12',
	'category20c-13',
	'category20c-14',
	'category20c-15',
	'category20c-16',
	'category20c-17',
	'category20c-18',
	'category20c-19',
	'category20c-20'
];

EVENTS = [
	'data',
	'annotations',
	'labels',
	'colors',

	'width',
	'height',
	'xMin',
	'xMax',
	'yMin',
	'yMax',

	'changed',
	'err',

	'resized',
	'clicked',
	'dragStart',
	'dragEnd',
	'dragEnter',
	'dragLeave',
	'dropped'
];


// FUNCTIONS //

/**
* FUNCTION: triangle( d, i )
*	Creates a triangle using an SVG path.
*
* @private
* @param {Array} d - datum
* @param {Number} i - datum index
* @returns {String} SVG path string
*/
function triangle( d ) {
	/* jshint validthis: true */
	var x, p1, p2, p3;
	x = this._x( d );
	p1 = (x-4) + ',-9';
	p2 = x + ',-2';
	p3 = (x+4) + ',-9';
	return 'M' + p1 + 'L' + p2 + 'L' + p3 + 'Z';
} // end FUNCTION triangle()

/**
* FUNCTION: vline( d, i )
*	Creates a vertical line using an SVG path.
*
* @private
* @param {Array} d - datum
* @param {Number} i - datum index
* @returns {String} SVG path string
*/
function vline( d ) {
	/* jshint validthis: true */
	var x, h, p1, p2;
	x = this._x( d );
	h = this.graphHeight();
	p1 = x + ',' + h;
	p2 = x + ',0';
	return 'M' + p1 + 'L' + p2;
} // end FUNCTION vline()


// CHART //

/**
* FUNCTION: Chart()
*	Chart constructor.
*
* @constructor
* @returns {Chart} Chart instance
*/
function Chart() {
	if ( !( this instanceof Chart ) ) {
		return new Chart();
	}
	return this;
} // end FUNCTION Chart()

/**
* ATTRIBUTE: paddingLeft
*	Chart canvas left padding.
*
* @type {Number}
* @default 90px
*/
Chart.prototype.paddingLeft = 90;

/**
* ATTRIBUTE: paddingRight
*	Chart canvas right padding.
*
* @type {Number}
* @default 0px
*/
Chart.prototype.paddingRight = 20;

/**
* ATTRIBUTE: paddingBottom
*	Chart canvas bottom padding.
*
* @type {Number}
* @default 80px
*/
Chart.prototype.paddingBottom = 80;

/**
* ATTRIBUTE: paddingTop
*	Chart canvas top padding.
*
* @type {Number}
* @default 80px
*/
Chart.prototype.paddingTop = 80;

/**
* ATTRIBUTE: width
*	Chart canvas width. If not explicitly set, defaults to the width of the parent node.
*
* @type {Number}
* @default null
*/
Chart.prototype.width = null;

/**
* ATTRIBUTE: height
*	Chart canvas height. If not explicitly set, defaults to the height of the parent node.
*
* @type {Number}
* @default null
*/
Chart.prototype.height = null;

/**
* ATTRIBUTE: chartTitle
*	Chart title.
*
* @type {String}
* @default ''
*/
Chart.prototype.chartTitle = '';

/**
* ATTRIBUTE: xLabel
*	x-axis label.
*
* @type {String}
* @default 'time'
*/
Chart.prototype.xLabel = 'time';

/**
* ATTRIBUTE: yLabel
*	y-axis label.
*
* @type {String}
* @default 'y'
*/
Chart.prototype.yLabel = 'y';

/**
* ATTRIBUTE: xMin
*	Minimum x-limit. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
Chart.prototype.xMin = null;

/**
* ATTRIBUTE: xMax
*	Maximum x-limit. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
Chart.prototype.xMax = null;

/**
* ATTRIBUTE: yMin
*	Minimum y-limit. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
Chart.prototype.yMin = null;

/**
* ATTRIBUTE: yMax
*	Maximum y-limit. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
Chart.prototype.yMax = null;

/**
* ATTRIBUTE: xTickFormat
*	x-axis tick format. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#tickFormat}.
*
* @type {String}
* @default '%H:%M' (hours:minutes)
*/
Chart.prototype.xTickFormat = '%H:%M';

/**
* ATTRIBUTE: yTickFormat
*	y-axis tick format. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/Formatting}.
*
* @type {String|Null}
* @default null
*/
Chart.prototype.yTickFormat = null;

/**
* ATTRIBUTE: xNumTicks
*	Number of tick marks on the x-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number|Null}
* @default null
*/
Chart.prototype.xNumTicks = null;

/**
* ATTRIBUTE: yNumTicks
*	Number of tick marks on the y-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number|Null}
* @default null
*/
Chart.prototype.yNumTicks = null;

/**
* ATTRIBUTE: xAxisOrient
*	x-axis orientation. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#orient}.
*
* @type {String}
* @default 'bottom'
*/
Chart.prototype.xAxisOrient = 'bottom';

/**
* ATTRIBUTE: xAxisOrient
*	y-axis orientation. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#orient}.
*
* @type {String}
* @default 'left'
*/
Chart.prototype.yAxisOrient = 'left';

/**
* METHOD: xValue( d )
*	x-value accessor.
*
* @param {Array} d - datum
* @return {Number} x-value
*/
Chart.prototype.xValue = function( d ) {
	return d[ 0 ];
}; // end METHOD xValue()

/**
* METHOD: yValue( d )
*	y-value accessor.
*
* @param {Array} d - datum
* @return {Number} y-value
*/
Chart.prototype.yValue = function( d ) {
	return d[ 1 ];
}; // end METHOD yValue()

/**
* METHOD: aValue( d )
*	Annotation accessor.
*
* @param {Array} d - datum
* @return {String} text annotation
*/
Chart.prototype.aValue = function( d ) {
	return d[ 1 ];
}; // end METHOD aValue()

/**
* METHOD: isDefined( d )
*	Accessor function which controls where a line is defined. Used to specify how missing values are encoded. Default behavior is to ignore data points or y-values which are `null`. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined}.
*
* @param {Array} d - datum
* @return {Boolean} boolean indicating if the value is defined
*/
Chart.prototype.isDefined = function( d ) {
	return ( d !== null && d[ 1 ] !== null );
}; // end METHOD isDefined()

/**
* ATTRIBUTE: interpolation
*	Specifies the type of interpolation applied to path elements. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate}.
*
* @type {String}
* @default 'linear'
*/
Chart.prototype.interpolation = 'linear';

/**
* ATTRIBUTE: tension
*	Specifies the spline interpolation tension. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_tension}.
*
* @type {Number}
* @default 0.7
*/
Chart.prototype.tension = 0.7;

/**
* ATTRIBUTE: isDraggable
*	Specifies whether chart components (legend entires) should be draggable. See [tutorial]{@link http://www.html5rocks.com/en/tutorials/dnd/basics/}.
*
* @type {Boolean}
* @default true
*/
Chart.prototype.isDraggable = true;

/**
* ATTRIBUTE: isDroppable
*	Specifies whether data can be dropped into the chart. See [tutorial]{@link http://www.html5rocks.com/en/tutorials/dnd/basics/}.
*
* @type {Boolean}
* @default true
*/
Chart.prototype.isDroppable = true;

/**
* ATTRIBUTE: autoUpdate
*	Boolean flag indicating whether a chart should auto update DOM elements whenever an attribute changes.
*
* @type {Boolean}
* @default true
*/
Chart.prototype.autoUpdate = true;

/**
* ATTRIBUTE: autoResize
*	Boolean flag indicating whether a chart should auto resize when the window resizes.
*
* @type {Boolean}
* @default true
*/
Chart.prototype.autoResize = true;

/**
* METHOD: created()
*	Polymer hook that is called when an element is created.
*/
Chart.prototype.created = function() {
	this.init();
}; // end METHOD created()

/**
* METHOD: init()
*	Initialization.
*/
Chart.prototype.init = function() {
	var create = document.createElement.bind( document ),
		d3,
		el,
		$;

	// Create a new D3 element to access the library dependency:
	el = create( 'polymer-d3' );
	d3 = el.d3;
	this._d3 = d3;

	// Create a new uuid element to access the library dependency for creating uuids:
	el = create( 'polymer-uuid' );
	this._uuid = el.uuid;

	// Assign the chart a private uuid:
	this.__uid__ = this._uuid.v4();

	// Initialize attributes...

	// Config: (hint an object)
	this.config = {};

	// Events: (hint an array)
	this.events = EVENTS;

	// Data: (hint an array)
	this.data = [];

	// Annotations: (hint an array)
	this.annotations = [];

	// Labels: (hint an array)
	this.labels = [];

	// Colors:
	this.colors = 'category10';

	// Private methods...

	// Scales...
	this._xScale = d3.time.scale();
	this._yScale = d3.scale.linear();

	this._xScale
		.domain( [ X1, X2 ] )
		.range( [ 0, this.graphWidth() ] );
	this._yScale
		.domain( [ 0, 1 ] )
		.range( [ this.graphHeight(), 0 ] );

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
	this._clipPathID = this._uuid.v4();
}; // end METHOD init()

/**
* METHOD: attached()
*	Polymer hook that is called when the element is inserted in the DOM.
*/
Chart.prototype.attached = function() {
	this.create().addListeners();
}; // end METHOD attached()

/**
* METHOD: detached()
*	Polymer hook that is called when the element is removed from the DOM.
*/
Chart.prototype.detached = function() {
	this.removeListeners();
}; // end METHOD detached()

/**
* METHOD: addListeners()
*	Adds event listeners.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.addListeners = function() {
	this.removeListeners();
	if ( this.autoResize ) {
		window.addEventListener( 'resize', this._onResize, false );
	}
	return this;
}; // end METHOD addListeners()

/**
* METHOD: removeListeners()
*	Removes event listeners.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.removeListeners = function() {
	window.removeEventListener( 'resize', this._onResize );
	return this;
}; // end METHOD removeListeners()

/**
* METHOD: create()
*	Creates a chart.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.create = function() {
	// Ensure that the width and height are set before creating a chart...
	this.width = this.width || this.clientWidth || this.parentNode.clientWidth || 600;
	this.height = this.height || this.clientHeight || this.parentNode.clientHeight || 400;

	// Create the chart layers...
	this
		.createBase()
		.createBackground()
		.createPaths()
		.createAxes()
		.createTitle()
		.createAnnotations()
		.createLegend();

	return this;
}; // end METHOD create()

/**
* METHOD: createBase()
*	Creates the chart base.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createBase = function() {
	var width = this.width,
		height = this.height,
		pLeft = this.paddingLeft,
		pTop = this.paddingTop,
		canvas;

	// Only cache the root element once (should not change)...
	if ( !this.$.root ) {
		this.$.root = this._d3.select( this.$.chart );
	}
	// Remove any existing canvas...
	if ( this.$.canvas ) {
		this.$.canvas.remove();
	}
	// Create the SVG element:
	canvas = this.$.root.append( 'svg:svg' )
		.attr( 'property', 'canvas' )
		.attr( 'class', 'canvas' )
		.attr( 'width', width )
		.attr( 'height', height );
	this.$.canvas = canvas;

	// Create the clip-path:
	this.$.clipPath = canvas.append( 'svg:defs' )
		.append( 'svg:clipPath' )
			.attr( 'id', this._clipPathID )
			.append( 'svg:rect' )
				.attr( 'class', 'clipPath' )
				.attr( 'width', this.graphWidth() )
				.attr( 'height', this.graphHeight() );

	// Create the graph element:
	this.$.graph = canvas.append( 'svg:g' )
		.attr( 'property', 'graph' )
		.attr( 'class', 'graph' )
		.attr( 'data-graph-type', 'timeseries' )
		.attr( 'transform', 'translate(' + pLeft + ',' + pTop + ')' );

	// Create the meta element:
	this.$.meta = canvas.append( 'svg:g' )
		.attr( 'property', 'meta' )
		.attr( 'class', 'meta' )
		.attr( 'data-graph-type', 'timeseries' )
		.attr( 'transform', 'translate(0,0)' );

	return this;
}; // end METHOD createBase()

/**
* METHOD: createBackground()
*	Creates a background element.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createBackground = function() {
	// Remove any existing background...
	if ( this.$.bkgd ) {
		this.$.bkgd.remove();
	}
	this.$.bkgd = this.$.graph.append( 'svg:rect' )
		.attr( 'class', 'background' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.attr( 'width', this.graphWidth() )
		.attr( 'height', this.graphHeight() );

	return this;
}; // end METHOD createBackground()

/**
* METHOD: createPaths()
*	Creates graph path elements.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createPaths = function() {
	// Remove any existing marks...
	if ( this.$.marks ) {
		this.$.marks.remove();
	}
	// Create a `marks` group:
	this.$.marks = this.$.graph.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + this._clipPathID + ')' );

	// Add paths:
	this.$.paths = this.$.marks.selectAll( '.line' )
		.data( this.data )
		.enter()
		.append( 'svg:path' )
			.attr( 'property', 'line timeseries' )
			.attr( 'class', 'line' )
			.attr( 'data-label', this._getLabel )
			.attr( 'data-color', this._getColor )
			.attr( 'd', this._line );

	return this;
}; // end METHOD createPaths()

/**
* METHOD: createAxes()
*	Creates chart axes.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createAxes = function() {
	var graph = this.$.graph,
		height = this.graphHeight(),
		axis;

	// Remove any existing axes...
	if ( this.$.xAxis ) {
		this.$.xAxis.remove();
	}
	if ( this.$.yAxis ) {
		this.$.yAxis.remove();
	}
	axis = graph.append( 'svg:g' )
		.attr( 'property', 'axis' )
		.attr( 'class', 'x axis' )
		.attr( 'transform', 'translate(0,' + height + ')' )
		.call( this._xAxis );
	this.$.xAxis = axis;

	this.$.xLabel = axis.append( 'svg:text' )
		.attr( 'y', 45 )
		.attr( 'x', this.graphWidth() / 2 )
		.attr( 'text-anchor', 'middle' )
		.attr( 'property', 'axis_label' )
		.attr( 'class', 'label noselect' )
		.text( this.xLabel );

	axis.selectAll( '.tick' )
		.attr( 'property', 'axis_tick' );

	axis.selectAll( '.domain' )
		.attr( 'property', 'axis_domain' );

	axis = graph.append( 'svg:g' )
		.attr( 'property', 'axis' )
		.attr( 'class', 'y axis' )
		.call( this._yAxis );
	this.$.yAxis = axis;

	this.$.yLabel = axis.append( 'svg:text' )
		.attr( 'transform', 'rotate(-90)' )
		.attr( 'y', -72 )
		.attr( 'x', -height / 2 )
		.attr( 'text-anchor', 'middle' )
		.attr( 'property', 'axis_label' )
		.attr( 'class', 'label noselect' )
		.text( this.yLabel );

	axis.selectAll( '.tick' )
		.attr( 'property', 'axis_tick' );

	axis.selectAll( '.domain' )
		.attr( 'property', 'axis_domain' );

	return this;
}; // end METHOD createAxes()

/**
* METHOD: createTitle()
*	Creates the chart title.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createTitle = function() {
	if ( this.$.title ) {
		this.$.title.remove();
	}
	this.$.title = this.$.meta.append( 'svg:text' )
		.attr( 'property', 'chart.title' )
		.attr( 'class', 'title noselect' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.text( this.chartTitle );

	return this;
}; // end METHOD createTitle()

/**
* METHOD: createAnnotations()
*	Creates chart annotations.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createAnnotations = function() {
	var gEnter;

	if ( this.$.agroup ) {
		this.$.agroup.remove();
	}
	this.$.agroup = this.$.graph.append( 'svg:g' )
		.attr( 'class', 'annotations' )
		.attr( 'property', 'annotations' );

	gEnter = this.$.agroup.selectAll( '.annotation' )
		.data( this.annotations )
		.enter().append( 'svg:g' )
			.attr( 'class', 'annotation' )
			.attr( 'property', 'annotation' );
	this.$.annotations = gEnter;

	this.$.annotationMarkers = gEnter.append( 'svg:path' )
		.attr( 'class', 'marker' )
		.attr( 'd', this._triangle )
		.on( 'click', this._toggleVLine );

	this.$.annotationLines = gEnter.append( 'svg:path' )
		.attr( 'class', 'vline hidden' )
		.attr( 'd', this._vline )
		.attr( 'stroke-dasharray', '4,4' );

	return this;
}; // end METHOD createAnnotations()

/**
* METHOD: createLegend()
*	Creates the chart legend.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createLegend = function() {
	var getColor = this._getColor,
		getLabel = this._getLabel,
		numLabels = this.labels.length,
		range,
		legend,
		entries,
		symbols,
		labels,
		i;

	if ( this.$.legend ) {
		this.$.legend.remove();
	}
	range = this._d3.range( numLabels );

	// Main legend container:
	legend = this.$.root.append( 'xhtml:div' )
		.attr( 'property', 'legend' )
		.attr( 'class', 'legend multicolumn-3' );
	this.$.legend = legend;

	// Create a legend entry for each label:
	entries = legend.selectAll( '.entry' )
		.data( range )
		.enter()
		.append( 'xhtml:p' )
			.attr( 'class', 'entry noselect' )
			.attr( 'draggable', this.isDraggable )
			.on( 'click', this._toggleSeries, false )
			.on( 'dragstart', this._onDragStart, false )
			.on( 'dragend', this._onDragEnd, false );

	this.$.legendEntries = entries;

	// Each entry should include a color-coded symbol and a label:
	entries.append( 'xhtml:span' )
		.attr( 'class', 'symbol' )
		.html( '&nbsp;' );

	entries.append( 'xhtml:span' )
		.attr( 'class', 'label' );

	// Set the color of all symbols...
	symbols = entries.selectAll( '.symbol' );
	for ( i = 0; i < symbols.length; i++ ) {
		symbols[ i ][ 0 ].classList.add( getColor( null, i ) + '-span' );
	}
	this.$.legendSymbols = symbols;

	// Set the text of all labels...
	labels = entries.selectAll( '.label' );
	for ( i = 0; i < labels.length; i++ ) {
		labels[ i ][ 0 ].innerHTML = getLabel( null, i );
	}
	this.$.legendLabels = labels;
	return this;
}; // end METHOD createLegend()

/**
* METHOD: resetPaths()
*	Resets graph path elements.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.resetPaths = function() {
	var paths;

	// Bind the data and update existing paths:
	paths = this.$.marks.selectAll( '.line' )
		.data( this.data )
		.attr( 'd', this._line );

	// Remove any old paths:
	paths.exit().remove();

	// Add any new paths:
	paths.enter().append( 'svg:path' )
		.attr( 'property', 'line timeseries' )
		.attr( 'class', 'line' )
		.attr( 'data-label', this._getLabel )
		.attr( 'data-color', this._getColor )
		.attr( 'd', this._line );

	// Cache a reference to the paths:
	this.$.paths = paths;

	return this;
}; // end METHOD resetPaths()

/**
* METHOD: resetAnnotations()
*	Resets graph annotations.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.resetAnnotations = function() {
	var group, annotations, gEnter;

	group = this.$.agroup;

	// Bind the data and update existing annotations:
	annotations = group.selectAll( '.annotation' )
		.data( this.annotations );

	// Remove any old annotations:
	annotations.exit().remove();

	// Add any new annotations:
	gEnter = annotations.enter().append( 'svg:g' )
		.attr( 'property', 'annotation' )
		.attr( 'class', 'annotation' );

	gEnter.append( 'svg:path' )
		.attr( 'class', 'marker' )
		.attr( 'd', this._triangle )
		.on( 'click', this._toggleVLine );

	gEnter.append( 'svg:path' )
		.attr( 'class', 'vline hidden' )
		.attr( 'd', this._vline )
		.attr( 'stroke-dasharray', '4,4' );

	// Cache a reference to the annotations:
	this.$.annotations = annotations;
	this.$.annotationMarkers = group.selectAll( '.marker' );
	this.$.annotationLines = group.selectAll( '.vline' );

	return this;
}; // end METHOD resetAnnotations()

/**
* METHOD: resetLegend()
*	Resets legend elements.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.resetLegend = function() {
	var getColor = this._getColor,
		getLabel = this._getLabel,
		numLabels = this.labels.length,
		range,
		entries,
		gEnter,
		symbols,
		labels,
		i;

	range = this._d3.range( numLabels );

	// Bind a set of labels:
	entries = this.$.legend.selectAll( '.entry' )
		.data( range );

	// Remove old legend entries:
	entries.exit().remove();

	// Add any new entries:
	gEnter = entries.enter().append( 'xhtml:p' )
		.attr( 'class', 'entry noselect' )
		.attr( 'draggable', this.isDraggable )
		.on( 'click', this._toggleSeries, false )
		.on( 'dragstart', this._onDragStart, false )
		.on( 'dragend', this._onDragEnd, false );

	gEnter.append( 'xhtml:span' )
		.attr( 'class', 'symbol' )
		.html( '&nbsp;' );

	gEnter.append( 'xhtml:span' )
		.attr( 'class', 'label' );

	this.$.legendEntries = entries;

	// Update all symbols:
	symbols = entries.selectAll( '.symbol' );
	for ( i = 0; i < symbols.length; i++ ) {
		symbols[ i ][ 0 ].classList.add( getColor( null, i ) + '-span' );
	}
	this.$.legendSymbols = symbols;

	// Update all labels:
	labels = entries.selectAll( '.label' );
	for ( i = 0; i < labels.length; i++ ) {
		labels[ i ][ 0 ].innerHTML = getLabel( null, i );
	}
	this.$.legendLabels = labels;

	return this;
}; // end METHOD resetLegend()

/**
* METHOD: clear()
*	Clears the chart and resets axes.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.clear = function() {
	// TODO: should meta data (e.g., title) be cleared as well?

	// Remove data, annotations, labels:
	this.labels.length = 0;
	this.data.length = 0;
	this.annotations.length = 0;

	// Reset the axes domains:
	this._xScale.domain( [ X1, X2 ] );
	this._yScale.domain( [ 0, 1 ] );

	// Redraw the axes:
	this.$.xAxis.call( this._xAxis );
	this.$.yAxis.call( this._yAxis );

	return this;
}; // end METHOD clear()

/**
* METHOD: formatData( data )
*	Converts data to standard representation. Needed for non-deterministic accessors.
*
* @param {Array} data - array of arrays
* @returns {Array} data - array of arrays
*/
Chart.prototype.formatData = function( data ) {
	var xValue = this.xValue,
		yValue = this.yValue,
		len,
		dataset,
		tmp,
		n,
		out,
		err,
		i, j;

	if ( !Array.isArray( data ) ) {
		err = new TypeError( 'formatData()::invalid input argument. Must provide an array. Value: `' + data + '`.' );
		this.fire( 'err', err );
		return;
	}
	len = data.length;
	out = new Array( len );
	for ( i = 0; i < len; i++ ) {
		dataset = data[ i ];
		if ( !Array.isArray( dataset ) ) {
			err = new TypeError( 'formatData()::invalid input argument. Must provide an array of arrays. Value: `' + data + '`.' );
			this.fire( 'err', err );
			return;
		}
		n = dataset.length;
		tmp = new Array( n );
		for ( j = 0; j < n; j++ ) {
			tmp[ j ] = [
				xValue( dataset[ j ] ),
				yValue( dataset[ j ] )
			];
		}
		out[ i ] = tmp;
	}
	return out;
}; // end METHOD formatData()

/**
* METHOD: formatAnnotations( arr )
*	Converts an array of annotations to standard representation. Needed for non-deterministic accessors.
*
* @param {Array} arr - array of annotations
* @returns {Array} annotations - array of annotations in standard format
*/
Chart.prototype.formatAnnotations = function( arr ) {
	var xValue = this.xValue,
		aValue = this.aValue,
		len,
		out,
		err;

	if ( !Array.isArray( arr ) ) {
		err = new TypeError( 'formatAnnotations()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
		this.fire( 'err', err );
		return;
	}
	len = arr.length;
	out = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		out[ i ] = [
			xValue( arr[ i ] ),
			aValue( arr[ i ] )
		];
	}
	return out;
}; // end METHOD formatAnnotations()

/**
* METHOD: x( d )
*	Maps an x-value to a pixel value.
*
* @param {Array} d - datum
* @returns {Number} pixel value
*/
Chart.prototype.x = function( d ) {
	return this._xScale( d[ 0 ] );
}; // end METHOD x()

/**
* METHOD: y( d )
*	Maps an y-value to a pixel value.
*
* @param {Array} d - datum
* @returns {Number} pixel value
*/
Chart.prototype.y = function( d ) {
	return this._yScale( d[ 1 ] );
}; // end METHOD y()

/**
* METHOD: getLabel( d, i )
*	Returns a label based on a provided index.
*
* @param {Array} d - datum
* @param {Number} i - index
* @returns {String} data label
*/
Chart.prototype.getLabel = function( d, i ) {
	return this.labels[ i ];
}; // end METHOD getLabel()

/**
* METHOD: getColor( d, i )
*	Returns a color based on a provided index.
*
* @param {Array} d - datum
* @param {Number} i - index
* @returns {String} color class/data attribute
*/
Chart.prototype.getColor = function( d, i ) {
	return this._colors[ i % this._colors.length ];
}; // end METHOD getColor()

/**
* METHOD: graphWidth()
*	Returns the graph width.
*
* @returns {Number} graph width
*/
Chart.prototype.graphWidth = function() {
	return this.width - this.paddingLeft - this.paddingRight;
}; // end METHOD graphWidth()

/**
* METHOD: graphHeight()
*	Returns the graph height.
*
* @returns {Number} graph height
*/
Chart.prototype.graphHeight = function() {
	return this.height - this.paddingTop - this.paddingBottom;
}; // end METHOD graphHeight()

/**
* METHOD: xDomain( min, max )
*	Computes the x-domain.
*
* @param {Null|String|Number|Date} min - minimum value
* @param {Null|String|Number|Date} max - maximum value
* @returns {Array} domain
*/
Chart.prototype.xDomain = function( min, max ) {
	var d3 = this._d3,
		data = this.data,
		err;

	if ( min !== null ) {
		min = new Date( min ).getTime();
		if ( min !== min ) {
			err = new TypeError( 'xDomain()::invalid input argument. Must be a valid `Date` object, string, or number, or `null`. Value: `' + min + '`.' );
			this.fire( 'err', err );
			return;
		}
	} else {
		min = d3.min( data, function onDataset( dataset ) {
			return d3.min( dataset, function onDatum( d ) {
				return d[ 0 ];
			});
		});
	}
	if ( max !== null ) {
		max = new Date( max ).getTime();
		if ( max !== max ) {
			err = new TypeError( 'xDomain()::invalid input argument. Must be a valid `Date` object, string, or number, or `null`. Value: `' + max + '`.' );
			this.fire( 'err', err );
			return;
		}
	} else {
		max = d3.max( data, function onDataset( dataset ) {
			return d3.max( dataset, function onDatum( d ) {
				return d[ 0 ];
			});
		});
	}
	return [ min, max ];
}; // end METHOD xDomain()

/**
* METHOD: yDomain( min, max )
*	Computes the y-domain.
*
* @param {Null|Number} min - minimum value
* @param {Null|Number} max - maximum value
* @returns {Array} domain
*/
Chart.prototype.yDomain = function( min, max ) {
	var d3 = this._d3,
		data = this.data,
		err;

	if ( min !== null && ( typeof min !== 'number' || min !== min ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Must be numeric or `null`. Value: `' + min + '`.' );
		this.fire( 'err', err );
		return;
	}
	if ( max !== null && ( typeof max !== 'number' || max !== max ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Must be numeric or `null`. Value: `' + max + '`.' );
		this.fire( 'err', err );
		return;
	}
	if ( min === null ) {
		min = d3.min( data, function onDataset( dataset ) {
			return d3.min( dataset, function onDatum( d ) {
				return d[ 1 ];
			});
		});
	}
	if ( max === null ) {
		max = d3.max( data, function onDataset( dataset ) {
			return d3.max( dataset, function onDatum( d ) {
				return d[ 1 ];
			});
		});
	}
	return [ min, max ];
}; // end METHOD yDomain()

/**
* METHOD: autoUpdateChanged( oldVal, newVal )
*	Event handler invoked when the `autoUpdate` attribute changes.
*
* @param {Boolean} oldVal - old value
* @param {Boolean} newVal - new value
*/
Chart.prototype.autoUpdateChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'boolean' ) {
		err = new TypeError( 'autoUpdate::invalid assignment. Must be a boolean.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.autoUpdate = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'autoUpdate',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD autoUpdateChanged()

/**
* METHOD: dataChanged( val[, newVal] )
*	Event handler invoked when the `data` attribute changes.
*
* @param {Array} val - change event value
* @param {Array} [newVal] - new value
*/
Chart.prototype.dataChanged = function( val, newVal ) {
	var data = this.data,
		len,
		domain,
		err,
		i;

	// Determine if we have a new data array...
	if ( arguments.length > 1 && !Array.isArray( newVal ) ) {
		err = new TypeError( 'data::invalid assignment. Must provide an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.data = val;
		return;
	}
	len = data.length;
	// Validate that all array elements are arrays...
	for ( i = 0; i < len; i++ ) {
		if ( !Array.isArray( data[ i ] ) ) {
			val = data.splice( i, 1 );
			err = new TypeError( 'data::invalid assignment. Data must be an array of arrays. Invalid array element: `' + val + '`.' );
			this.fire( 'err', err );
			return;
		}
	}
	// Do we even have any data arrays?
	if ( !len ) {
		if ( this.$.paths ) {
			this.$.paths.remove();
		}
		return;
	}
	// [0] Update the xDomain:
	domain = this.xDomain( this.xMin, this.xMax );

	// [1] Update the xScale:
	this._xScale.domain( domain );

	// [2] Update the yDomain:
	domain = this.yDomain( this.yMin, this.yMax );

	// [3] Update the yScale:
	this._yScale.domain( domain );

	if ( this.autoUpdate ) {
		// [4] Update the xAxis:
		this.$.xAxis.call( this._xAxis );

		// [5] Update the yAxis:
		this.$.yAxis.call( this._yAxis );

		// [6] Update annotations: (TODO: this is not always necessary. Only when updating data such that the xMin and/or xMax changes.)
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );

		// [7] Create new paths:
		this.resetPaths();
	}
	this.fire( 'data', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'data',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'data',
			'prev': val,
			'curr': newVal
		});
	}
}; // end METHOD dataChanged()

/**
* METHOD: annotationsChanged( val[, newVal] )
*	Event handler invoked when the `annotations` attribute changes.
*
* @param {Array} val - change event value
* @param {Array} [newVal] - new value
*/
Chart.prototype.annotationsChanged = function( val, newVal ) {
	var arr = this.annotations,
		len,
		err,
		i;

	// Determine if we have a new annotations array...
	if ( arguments.length > 1 && !Array.isArray( newVal ) ) {
		err = new TypeError( 'annotations::invalid assignment. Must provide an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.annotations = val;
		return;
	}
	len = arr.length;
	// Validate that all array elements are arrays...
	for ( i = 0; i < len; i++ ) {
		if ( !Array.isArray( arr[ i ] ) ) {
			val = arr.splice( i, 1 );
			err = new TypeError( 'annotations::invalid assignment. Must be an array of arrays. Invalid array element: `' + val + '`.' );
			this.fire( 'err', err );
			return;
		}
	}
	// Do we even have any annotations?
	if ( !len ) {
		if ( this.$.annotations ) {
			this.$.annotations.remove();
		}
		return;
	}
	if ( this.autoUpdate ) {
		this.resetAnnotations();
	}
	this.fire( 'annotations', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'annotations',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'annotations',
			'prev': val,
			'curr': newVal
		});
	}
}; // end METHOD annotationsChanged()

/**
* METHOD: configChanged( oldConfig, newConfig )
*	Event handler invoked when the `config` attribute changes.
*
* @param {Object} oldConfig - old config
* @param {Object} newConfig - new config
*/
Chart.prototype.configChanged = function( oldConfig, newConfig ) {
	var bool,
		err;

	if ( typeof newConfig !== 'object' || newConfig === null || Array.isArray( newConfig) ) {
		err = new TypeError( 'config::invalid assignment. Must be an `object`. Value: `' + newConfig + '`.' );
		this.fire( 'err', err );
		this.config = oldConfig;
		return;
	}
	// TODO: schema validator

	// Turn off auto-update:
	bool = this.autoUpdate;
	this.autoUpdate = false;

	// this.width = newConfig.canvas.width;
	// this.height = newConfig.canvas.height;

	// FIXME: title should not be part of annotations, but meta. The config should be standardized. Put in repo. Version it. Create an associated validator. NPM.
	// this.chartTitle = newConfig.annotations.title;
	// this.xLabel = newConfig.axes[ 0 ].label;
	// this.yLabel = newConfig.axes[ 1 ].label;
	// this.xMin = newConfig.scales[ 0 ].domain[ 0 ];
	// this.xMax = newConfig.scales[ 0 ].domain[ 1 ];
	// this.yMin = newConfig.scales[ 1 ].domain[ 0 ];
	// this.yMax = newConfig.scales[ 1 ].domain[ 1 ];
	// this.xNumTicks = newConfig.axes[ 0 ].ticks;
	// this.yNumTicks = newConfig.axes[ 1 ].ticks;
	// this.xTickFormat = newConfig.axes[ 0 ].format;
	// this.xAxisOrient = newConfig.axes[ 0 ].orient;
	// this.yAxisOrient = newConfig.axes[ 1 ].orient;

	// TODO: support this and `tension` for multiple lines.
	// this.interpolation = newConfig.marks[ 0 ].properties.interpolation;

	// this.labels = newConfig.marks.map( function onMark( mark ) {
	// 	return mark.data;
	// });

	this.fire( 'changed', {
		'attr': 'config',
		'prev': oldConfig,
		'curr': newConfig
	});

	// Reset the auto update flag to its original value:
	this.autoUpdate = bool;

	// Only if auto update is enabled, redraw the chart...
	if ( bool ) {
		this.create();
	}
}; // end METHOD configChanged()

/**
* METHOD: xValueChanged( oldVal, newVal )
*	Event handler invoked when the `xValue` attribute changes.
*
* @param {Function} oldVal - old value
* @param {Function} newVal - new value
*/
Chart.prototype.xValueChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'xValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xValue = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'xValue',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xValueChanged()

/**
* METHOD: yValueChanged( oldVal, newVal )
*	Event handler invoked when the `yValue` attribute changes.
*
* @param {Function} oldVal - old value
* @param {Function} newVal - new value
*/
Chart.prototype.yValueChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'yValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yValue = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'yValue',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yValueChanged()

/**
* METHOD: aValueChanged( oldVal, newVal )
*	Event handler invoked when the `aValue` attribute changes.
*
* @param {Function} oldVal - old value
* @param {Function} newVal - new value
*/
Chart.prototype.aValueChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'aValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.aValue = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'aValue',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD aValueChanged()

/**
* METHOD: isDefinedChanged( oldVal, newVal )
*	Event handler invoked when the `isDefined` attribute changes.
*
* @param {Function} oldVal - old value
* @param {Function} newVal - new value
*/
Chart.prototype.isDefinedChanged = function( oldVal, newVal ) {
	var selection = this.$.paths,
		line = this._line,
		err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'isDefined::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.isDefined = oldVal;
		return;
	}
	line.defined( newVal );

	if ( this.autoUpdate ) {
		selection.attr( 'd', line );
	}
	this.fire( 'changed', {
		'attr': 'isDefined',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD isDefinedChanged()

/**
* METHOD: widthChanged( oldVal, newVal )
*	Event handler invoked when the `width` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.widthChanged = function( oldVal, newVal ) {
	var width,
		range,
		err;
	if ( typeof newVal !== 'number' || newVal !== newVal || newVal <= 0 ) {
		err = new TypeError( 'width::invalid assignment. Must be a number greater than 0. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.width = oldVal;
		return;
	}
	width = newVal - this.paddingLeft - this.paddingRight;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

	if ( !this.$.canvas ) {
		return;
	}
	if ( this.autoUpdate ) {
		// [1] Update the SVG canvas:
		this.$.canvas.attr( 'width', newVal );

		// [2] Update the background:
		this.$.bkgd.attr( 'width', width );

		// [3] Update the clipPath:
		this.$.clipPath.attr( 'width', width );

		// [4] Update the x-axis:
		this.$.xAxis.call( this._xAxis );

		// [5] Update the x-label position:
		this.$.xLabel.attr( 'x', width / 2 );

		// [6] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [7] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'width', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'width',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD widthChanged()

/**
* METHOD: heightChanged( oldVal, newVal )
*	Event handler invoked when the `height` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.heightChanged = function( oldVal, newVal ) {
	var range,
		height,
		err;
	if ( typeof newVal !== 'number' || newVal !== newVal || newVal <= 0 ) {
		err = new TypeError( 'height::invalid assignment. Must be a number greater than 0. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.height = oldVal;
		return;
	}
	height = newVal - this.paddingTop - this.paddingBottom;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( !this.$.canvas ) {
		return;
	}
	if ( this.autoUpdate ) {
		// [1] Update the SVG canvas:
		this.$.canvas.attr( 'height', newVal );

		// [2] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [3] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [4] Update the x-axis:
		this.$.xAxis.attr( 'transform', 'translate(0,' + height + ')' );

		// [5] Update the y-axis:
		this.$.yAxis.call( this._yAxis );

		// [6] Update the y-label position:
		this.$.yLabel.attr( 'x', -height / 2 );

		// [7] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [8] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'height', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'height',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD heightChanged()

/**
* METHOD: labelsChanged( val[, newVal] )
*	Event handler invoked when the `labels` attribute changes.
*
* @param {Array} val - change event value
* @param {Array} [newVal] - new value
*/
Chart.prototype.labelsChanged = function( val, newVal ) {
	var labels = this.labels,
		len,
		err,
		i;

	// Determine if we have a new label array...
	if ( arguments.length > 1 && !Array.isArray( newVal ) ) {
		err = new TypeError( 'labels::invalid assignment. Must be an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.labels = val;
		return;
	}
	len = labels.length;
	// Validate that all labels are strings...
	for ( i = 0; i < len; i++ ) {
		if ( typeof labels[ i ] !== 'string' ) {
			val = this.labels.splice( i, 1 );
			err = new TypeError( 'labels::invalid assignment. Labels must be an array of strings. Invalid label: `' + val + '`.' );
			this.fire( 'err', err );
			return;
		}
	}
	if ( this.autoUpdate ) {
		// [0] Reset the data labels:
		this.$.paths.attr( 'data-label', this._getLabel );

		// [1] Reset the chart legend:
		this.resetLegend();
	}
	this.fire( 'labels', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'labels',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'labels',
			'prev': val,
			'curr': newVal
		});
	}
}; // end METHOD labelsChanged()

/**
* METHOD: chartTitleChanged( oldVal, newVal )
*	Event handler invoked when the `chartTitle` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.chartTitleChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		err = new TypeError( 'charTitle::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.chartTitle = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.title.text( newVal );
	}
	this.fire( 'changed', {
		'attr': 'chartTitle',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD chartTitleChanged()

/**
* METHOD: xLabelChanged( oldVal, newVal )
*	Event handler invoked when the `xLabel` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.xLabelChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		err = new TypeError( 'xlabel::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xLabel = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.xLabel.text( newVal );
	}
	this.fire( 'changed', {
		'attr': 'xLabel',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xLabelChanged()

/**
* METHOD: yLabelChanged( oldVal, newVal )
*	Event handler invoked when the `yLabel` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.yLabelChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		err = new TypeError( 'yLabel::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yLabel = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.yLabel.text( newVal );
	}
	this.fire( 'changed', {
		'attr': 'yLabel',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yLabelChanged()

/**
* METHOD: xMinChanged( oldVal, newVal )
*	Event handler invoked when the `xMin` attribute changes.
*
* @param {Null|Number} oldVal - old value
* @param {Null|Number} newVal - new value
*/
Chart.prototype.xMinChanged = function( oldVal, newVal ) {
	var xScale = this._xScale,
		domain = xScale.domain(),
		err;

	if ( newVal !== null && !( newVal instanceof Date ) ) {
		err = new TypeError( 'xMin::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xMin = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = this.xDomain( newVal, domain[ 1 ] );

	// [1] Update the xScale:
	xScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the xAxis:
		this.$.xAxis.call( this._xAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [4] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'xMin', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'xMin',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xMinChanged()

/**
* METHOD: xMaxChanged( oldVal, newVal )
*	Event handler invoked when the `xMax` attribute changes.
*
* @param {Null|Number} oldVal - old value
* @param {Null|Number} newVal - new value
*/
Chart.prototype.xMaxChanged = function( oldVal, newVal ) {
	var xScale = this._xScale,
		domain = xScale.domain(),
		err;

	if ( newVal !== null && !( newVal instanceof Date ) ) {
		err = new TypeError( 'xMax::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xMax = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = this.xDomain( domain[ 0 ], newVal );

	// [1] Update the xScale:
	xScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the xAxis:
		this.$.xAxis.call( this._xAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [4] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}

	this.fire( 'xMax', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'xMax',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xMaxChanged()

/**
* METHOD: yMinChanged( oldVal, newVal )
*	Event handler invoked when the `yMin` attribute changes.
*
* @param {Null|Number} oldVal - old value
* @param {Null|Number} newVal - new value
*/
Chart.prototype.yMinChanged = function( oldVal, newVal ) {
	var yScale = this._yScale,
		domain = yScale.domain(),
		err;

	if ( newVal !== null && (typeof newVal !== 'number' || newVal !== newVal) ) {
		err = new TypeError( 'yMin::invalid assignment. Must be a numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yMin = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = this.yDomain( newVal, domain[ 1 ] );

	// [1] Update the yScale:
	yScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the yAxis:
		this.$.yAxis.call( this._yAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );
	}

	this.fire( 'yMin', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'yMin',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yMinChanged()

/**
* METHOD: yMaxChanged( oldVal, newVal )
*	Event handler invoked when the `yMax` attribute changes.
*
* @param {Null|Number} oldVal - old value
* @param {Null|Number} newVal - new value
*/
Chart.prototype.yMaxChanged = function( oldVal, newVal ) {
	var yScale = this._yScale,
		domain = yScale.domain(),
		err;

	if ( newVal !== null && (typeof newVal !== 'number' || newVal !== newVal) ) {
		err = new TypeError( 'yMax::invalid assignment. Must be numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yMax = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = this.yDomain( domain[ 0 ], newVal );

	// [1] Update the yScale:
	yScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the yAxis:
		this.$.yAxis.call( this._yAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );
	}

	this.fire( 'yMax', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'yMax',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yMaxChanged()

/**
* METHOD: xNumTicksChanged( oldVal, newVal )
*	Event handler invoked when the `xNumTicks` attribute changes.
*
* @param {Number|Null} oldVal - old value
* @param {Number|Null} newVal - new value
*/
Chart.prototype.xNumTicksChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( newVal !== null && ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) ) {
		err = new TypeError( 'xNumTicks::invalid assignment. Must be a positive integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xNumTicks = oldVal;
		return;
	}
	xAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}
	this.fire( 'changed', {
		'attr': 'xNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xNumTicksChanged()

/**
* METHOD: yNumTicksChanged( oldVal, newVal )
*	Event handler invoked when the `yNumTicks` attribute changes.
*
* @param {Number|Null} oldVal - old value
* @param {Number|Null} newVal - new value
*/
Chart.prototype.yNumTicksChanged = function( oldVal, newVal ) {
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( newVal !== null && ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) ) {
		err = new TypeError( 'yNumTicks::invalid assignment. Must be a positive integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yNumTicks = oldVal;
		return;
	}
	yAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		selection.call( yAxis );
	}
	this.fire( 'changed', {
		'attr': 'yNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yNumTicksChanged()

/**
* METHOD: xAxisOrientChanged( oldVal, newVal )
*	Event handler invoked when the `xAxisOrient` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.xAxisOrientChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( typeof newVal !== 'string' || OPTS.xAxisOrient.indexOf( newVal ) === -1 ) {
		err = new TypeError( 'xAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.xAxisOrient.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xAxisOrient = oldVal;
		return;
	}
	xAxis.orient( newVal );
	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}

	// TODO: this is subtle. As labels, etc may need to change.

	this.fire( 'changed', {
		'attr': 'xAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xAxisOrientChanged()

/**
* METHOD: yAxisOrientChanged( oldVal, newVal )
*	Event handler invoked when the `yAxisOrient` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.yAxisOrientChanged = function( oldVal, newVal ) {
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( typeof newVal !== 'string' || OPTS.yAxisOrient.indexOf( newVal ) === -1 ) {
		err = new TypeError( 'yAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.yAxisOrient.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yAxisOrient = oldVal;
		return;
	}
	yAxis.orient( newVal );
	if ( this.autoUpdate ) {
		selection.call( yAxis );
	}

	// TODO: this is subtle. As labels, etc may need to change.

	this.fire( 'changed', {
		'attr': 'yAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yAxisOrientChanged()

/**
* METHOD: xTickFormatChanged( oldVal, newVal )
*	Event handler invoked when the `xTickFormat` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.xTickFormatChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( typeof newVal !== 'string' ) {
		err = new TypeError( 'xTickFormat::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xTickFormat = oldVal;
		return;
	}
	this._xTickFormat = this._d3.time.format( newVal );
	xAxis.tickFormat( this._xTickFormat );

	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}
	this.fire( 'changed', {
		'attr': 'xTickFormat',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD xTickFormatChanged()

/**
* METHOD: yTickFormatChanged( oldVal, newVal )
*	Event handler invoked when the `yTickFormat` attribute changes.
*
* @param {String|Null} oldVal - old value
* @param {String|Null} newVal - new value
*/
Chart.prototype.yTickFormatChanged = function( oldVal, newVal ) {
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( typeof newVal !== 'string' && newVal !== null ) {
		err = new TypeError( 'yTickFormat::invalid assignment. Must be either a string specifier or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yTickFormat = oldVal;
		return;
	}
	if ( newVal !== null ) {
		this._yTickFormat = this._d3.format( newVal );
	} else {
		this._yTickFormat = null;
	}
	yAxis.tickFormat( this._yTickFormat );
	if ( this.autoUpdate ) {
		selection.call( yAxis );
	}
	this.fire( 'changed', {
		'attr': 'yTickFormat',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD yTickFormatChanged()

/**
* METHOD: interpolationChanged( oldVal, newVal )
*	Event handler invoked when the `interpolation` attribute changes.
*
* @param {String} oldVal - old value
* @param {String} newVal - new value
*/
Chart.prototype.interpolationChanged = function( oldVal, newVal ) {
	var selection = this.$.paths,
		line = this._line,
		err;

	if ( typeof newVal !== 'string' || OPTS.interpolation.indexOf( newVal ) === -1 ) {
		err = new TypeError( 'intepolation::invalid assignment. Must be one of the following: `' + OPTS.interpolation.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.interpolation = oldVal;
		return;
	}
	line.interpolate( newVal );
	if ( this.autoUpdate ) {
		selection.attr( 'd', line );
	}
	this.fire( 'changed', {
		'attr': 'interpolation',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD interpolationChanged()

/**
* METHOD: tensionChanged( oldVal, newVal )
*	Event handler invoked when the `tension` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.tensionChanged = function( oldVal, newVal ) {
	var selection = this.$.paths,
		line = this._line,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal ) {
		err = new TypeError( 'tension::invalid assignment. Must be numeric. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.tension = oldVal;
		return;
	}
	line.tension( newVal );
	if ( this.autoUpdate ) {
		selection.attr( 'd', line );
	}
	this.fire( 'changed', {
		'attr': 'tension',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD tensionChanged()

/**
* METHOD: colorsChanged( val[, newVal] )
*	Event handler invoked when the `colors` attribute changes.
*
* @param {String|Array} val - change event value
* @param {String|Array} [newVal] - new value
*/
Chart.prototype.colorsChanged = function( val, newVal ) {
	var getColor = this._getColor,
		oldColors = this._colors,
		list,
		symbols,
		el,
		err,
		color,
		i, j;

	if ( arguments.length > 1 ) {
		if ( typeof newVal === 'string' ) {
			if ( OPTS.colors.indexOf( newVal ) === -1 ) {
				err = new TypeError( 'colors::invalid assignement. Unrecognized color set. Value: `' + newVal + '`.' );
				this.fire( 'err', err );
				this.colors = val;
				return;
			}
			this._colors = OPTS[ newVal ];
		}
		else if ( Array.isArray( newVal ) ) {
			this._colors = newVal;
		}
		else {
			err = new TypeError( 'colors::invalid assignment. Must be an `array` of classes or a recognized color set. Value: `' + newVal + '`.' );
			this.fire( 'err', err );
			this.colors = val;
			return;
		}
	}
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'data-color', getColor );

		// Set the color of all symbols...
		symbols = this.$.legendSymbols;
		for ( i = 0; i < symbols.length; i++ ) {
			el = symbols[ i ][ 0 ];
			if ( !el ) {
				continue;
			}
			color = oldColors[ i ];

			// Remove any existing color class...
			list = el.classList;
			for ( j = 0; j < list.length; j++ ) {
				if ( list[j] === color ) {
					el.classList.remove( list[j] );
				}
			}
			// Add the new color class:
			el.classList.add( getColor( null, i ) + '-span' );
		}
	}
	this.fire( 'colors', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'colors',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'colors',
			'prev': val,
			'curr': newVal
		});
	}
}; // end METHOD colorsChanged()

/**
* METHOD: paddingLeftChanged( oldVal, newVal )
*	Event handler invoked when the `paddingLeft` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.paddingLeftChanged = function( oldVal, newVal ) {
	var width,
		range,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		err = new TypeError( 'paddingLeft::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.paddingLeft = oldVal;
		return;
	}
	width = this.width - newVal - this.paddingRight;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'width', width );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'width', width );

		// [3] Update the graph:
		this.$.graph.attr( 'transform', 'translate(' + newVal + ',' + this.paddingTop + ')' );

		// [4] Update the x-axis:
		this.$.xAxis.call( this._xAxis );

		// [5] Update the x-label position:
		this.$.xLabel.attr( 'x', width / 2 );

		// [6] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [7] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'changed', {
		'attr': 'paddingLeft',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD paddingLeftChanged()

/**
* METHOD: paddingRightChanged( oldVal, newVal )
*	Event handler invoked when the `padding` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.paddingRightChanged = function( oldVal, newVal ) {
	var width,
		range,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		err = new TypeError( 'paddingRight::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.paddingRight = oldVal;
		return;
	}
	width = this.width - this.paddingLeft - newVal;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'width', width );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'width', width );

		// [3] Update the x-axis:
		this.$.xAxis.call( this._xAxis );

		// [4] Update the x-label position:
		this.$.xLabel.attr( 'x', width / 2 );

		// [5] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [6] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'changed', {
		'attr': 'paddingRight',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD paddingRightChanged()

/**
* METHOD: paddingBottomChanged( oldVal, newVal )
*	Event handler invoked when the `paddingBottom` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.paddingBottomChanged = function( oldVal, newVal ) {
	var height,
		range,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		err = new TypeError( 'paddingBottom::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.paddingBottom = oldVal;
		return;
	}
	height = this.height - this.paddingTop - newVal;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [3] Update the x-axis:
		this.$.xAxis.attr( 'transform', 'translate(0,' + height + ')' );

		// [4] Update the y-axis:
		this.$.yAxis.call( this._yAxis );

		// [5] Update the y-label position:
		this.$.yLabel.attr( 'x', -height / 2 );

		// [6] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [7] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'changed', {
		'attr': 'paddingBottom',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD paddingBottomChanged()

/**
* METHOD: paddingTopChanged( oldVal, newVal )
*	Event handler invoked when the `paddingTop` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.paddingTopChanged = function( oldVal, newVal ) {
	var height,
		range,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		err = new TypeError( 'paddingTop::invalid assignment. Must be an integer greater than or equal to 0.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.paddingTop = oldVal;
		return;
	}
	height = this.height - newVal - this.paddingBottom;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [3] Update the graph:
		this.$.graph.attr( 'transform', 'translate(' + this.paddingLeft + ',' + newVal + ')' );

		// [4] Update the x-axis:
		this.$.xAxis.attr( 'transform', 'translate(0,' + height + ')' );

		// [5] Update the y-axis:
		this.$.yAxis.call( this._yAxis );

		// [6] Update the y-label position:
		this.$.yLabel.attr( 'x', -height / 2 );

		// [7] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [8] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'changed', {
		'attr': 'paddingTop',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD paddingTopChanged()

/**
* METHOD: toggleSeries( d, i )
*	Event handler to toggle a displayed time series.
*
* @param {Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
Chart.prototype.toggleSeries = function( d, i ) {
	var d3 = this._d3,
		selection,
		path,
		flg;

	// Toggle the legend entry visibility...
	selection = d3.select( this.$.legendEntries[ 0 ][ i ] );

	// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code.
	if ( !selection.node() ) {
		return;
	}
	flg = !selection.classed( 'hidden' );
	selection.classed( 'hidden', flg );

	// Toggle the path visibility...
	path = d3.select( this.$.paths[ 0 ][ i ] );

	if ( path.node() ) {
		path.classed( 'hidden', flg );
	}

	// FIXME: this should not be in this function. The function should be kept general. Move to separate click handler. Bind two listeners to the legend entry --> no, click handler should simply invoke the toggleSeries method with `(null, i)`. Here, emit a toggled event (???).
	this.fire( 'clicked', {
		'el': 'legend',
		'data': {
			'idx': i,
			'state': ( flg ? 'hidden' : '' )
		},
		'msg': 'Legend entry clicked.'
	});
	return false;
}; // end METHOD toggleSeries()

/**
* METHOD: toggleVLine( d, i )
*	Event handler to toggle a vertical line marking an annotation.
*
* @param {Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
Chart.prototype.toggleVLine = function( d, i ) {
	var d3 = this._d3,
		path,
		flg;

	// Get the vertical line element corresponding to the clicked annotation marker...
	path = d3.select( this.$.annotationLines[ 0 ][ i ] );

	// NOTE: catch case where method may be invoked with an out-of-bounds index; e.g., 3rd party code.
	if ( !path.node() ) {
		return;
	}
	// Toggle the line visibility...
	flg = !path.classed( 'hidden' );
	path.classed( 'hidden', flg );

	// FIXME: clicked event should be moved to click handler
	this.fire( 'clicked', {
		'el': 'annotationMarker',
		'data': {
			'idx': i,
			'state': ( flg ? 'hidden' : '' )
		},
		'msg': 'Annotation marker clicked.'
	});
	if ( !flg ) {
		this.fire( 'annotation', {
			'idx': i,
			'value': d[ 0 ]
		});
	}
	return false;
}; // end METHOD toggleVLine()

/**
* METHOD: isDraggableChanged( oldVal, newVal )
*	Event handler invoked when the `isDraggable` attribute changes.
*
* @param {Boolean} oldVal - old value
* @param {Boolean} newVal - new value
*/
Chart.prototype.isDraggableChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'boolean' ) {
		err = new TypeError( 'isDraggable::invalid assignment. Must be a boolean.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.isDraggable = oldVal;
		return;
	}
	this.$.legendEntries.attr( 'draggable', newVal );
	this.fire( 'changed', {
		'attr': 'isDraggable',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD isDraggableChanged()

/**
* METHOD: isDroppableChanged( oldVal, newVal )
*	Event handler invoked when the `isDroppable` attribute changes.
*
* @param {Boolean} oldVal - old value
* @param {Boolean} newVal - new value
*/
Chart.prototype.isDroppableChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'boolean' ) {
		err = new TypeError( 'isDroppable::invalid assignment. Must be a boolean.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.isDroppable = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'isDroppable',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD isDroppableChanged()

/**
* FUNCTION: onDragStart( d, i )
*	Event handler invoked at the start of dragging chart elements.
*
* @param {Array|Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
Chart.prototype.onDragStart = function( d, i ) {
	var evt = this._d3.event,
		path,
		label,
		data;

	// Get the label:
	label = this.$.legendLabels[ i ][ 0 ].innerHTML;

	// Get the path data...
	if ( this.$.paths ) {
		path = this.$.paths[ 0 ][ i ];
		// Possibility that a corresponding path has not yet been drawn; e.g., more labels than datasets.
		if ( path ) {
			data = this._d3.select( path ).data();
		} else {
			data = [];
		}
	} else {
		data = [];
	}
	// Create a data object:
	data = {
		'uid': this.__uid__,
		'id': i,
		'type': 'timeseries',
		'data': data[ 0 ],
		'label': label,
		'xMin': this.xMin,
		'xMax': this.xMax,
		'yMin': this.yMin,
		'yMax': this.yMax,
		'yLabel': this.yLabel
	};

	// Set the drag payload:
	evt.dataTransfer.effectAllowed = 'move';
	evt.dataTransfer.setData( 'application/x-polymer-chart-data', JSON.stringify( data ) );

	// TODO: define additional behavior

	this.fire( 'dragStart', evt );
	return false;
}; // end METHOD onDragStart()

/**
* METHOD: onDragEnter( evt, detail, sender )
*	Event handler invoked on a 'dragenter' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
Chart.prototype.onDragEnter = function( evt ) {
	if ( evt.preventDefault ) {
		evt.preventDefault();
	}

	// TODO: define additional behavior

	this.fire( 'dragEnter', evt );
	return false;
}; // end METHOD onDragEnter()

/**
* METHOD: onDragOver( evt, detail, sender )
*	Event handler invoked on a 'dragover' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
Chart.prototype.onDragOver = function( evt ) {
	if ( evt.preventDefault ) {
		evt.preventDefault();
	}
	return false;
}; // end METHOD onDragOver()

/**
* FUNCTION: onDragLeave( evt, detail, sender )
*	Event handler invoked on a 'dragleave' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Boolean} false
*/
Chart.prototype.onDragLeave = function( evt ) {

	// TODO: define additional behavior

	this.fire( 'dragLeave', evt );
	return false;
}; // end METHOD onDragLeave()

/**
* METHOD: onDrop( evt, detail, sender )
*	Event handler invoked on a 'drop' event.
*
* @param {Event} evt - event object
* @param {*} detail - event detail
* @param {DOMElement} sender - event source
* @returns {Undefined|Boolean} undefined or false
*/
Chart.prototype.onDrop = function( evt ) {
	var types = evt.dataTransfer.types,
		flg = false,
		mimeType,
		payload;

	if ( !this.isDroppable ) {
		return;
	}
	mimeType  = 'application/x-polymer-chart-data';
	for ( var i = 0; i < types.length; i++ ) {
		if ( types[ i ] === mimeType ) {
			flg = true;
			break;
		}
	}
	if ( !flg ) {
		return;
	}
	payload = evt.dataTransfer.getData( 'application/x-polymer-chart-data' );

	payload = JSON.parse( payload );

	// Add the new dataset...
	if ( payload.data.length ) {
		this.data.push( payload.data );
	}
	// Add the new label:
	this.labels.push( payload.label );

	// TODO: define additional behavior (#39)

	if ( evt.preventDefault ) {
		evt.preventDefault();
	}
	if ( evt.stopPropagation ) {
		evt.stopPropagation();
	}
	this.fire( 'dropped', payload );
	return false;
}; // end METHOD onDrop()

/**
* METHOD: onDragEnd( d, i )
*	Event handler invoked on a 'dragend' event.
*
* @param {Array|Number} d - data
* @param {Number} i - index
* @returns {Boolean} false
*/
Chart.prototype.onDragEnd = function( d, i ) {
	// Remove the dragged label:
	this.labels.splice( i, 1 );

	// Remove the dragged timeseries:
	this.data.splice( i, 1 );

	if ( !this.data.length && !this.labels.length ) {
		this.clear();
	}
	this.fire( 'dragEnd', this._d3.event );
	return false;
}; // end METHOD onDragEnd()

/**
* METHOD: autoResizeChanged( oldVal, newVal )
*	Event handler invoked when the `autoResize` attribute changes.
*
* @param {Boolean} oldVal - old value
* @param {Boolean} newVal - new value
*/
Chart.prototype.autoResizeChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'boolean' ) {
		err = new TypeError( 'autoResize::invalid assignment. Must be a boolean.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.autoResize = oldVal;
		return;
	}
	if ( newVal ) {
		window.addEventListener( 'resize', this._onResize, false );
	} else {
		window.removeEventListener( 'resize', this._onResize );
	}
	this.fire( 'changed', {
		'attr': 'autoResize',
		'prev': oldVal,
		'curr': newVal
	});
}; // end METHOD autoResizeChanged()

/**
* METHOD: onResize()
*	Resize listener.
*/
Chart.prototype.onResize = function() {
	this.fire( 'resized', {
		'el': 'polymer-timeseries',
		'msg': 'Received a resize event.'
	});
	if ( !this.$.canvas ) {
		return;
	}
	this.width = this.clientWidth;
}; // end METHOD onResize()

/**
* METHOD: stream( [options])
*	Returns a writable stream.
*
* @param {Object} [options] - Writable stream options
* @returns {Stream} Stream instance
*/
Chart.prototype.stream = function( options ) {
	var opts = {},
		clbk,
		err;
	if ( arguments.length ) {
		if ( typeof options !== 'object' || options === null || Array.isArray( options ) ) {
			err = new TypeError( 'stream()::invalid input argument. Options must be an object.' );
			this.fire( 'err', err );
			return;
		}
		opts = options;
	}
	clbk = onData.bind( this );
	this._stream = new Stream( clbk, opts );
	return this._stream;

	function onData( error, arr ) {
		/* jshint validthis: true */
		if ( error ) {
			this.fire( 'err', error );
			return;
		}
		// TODO: call update function
		// TODO: change event name to something other than 'data'; 'data' is already used.
		this.fire( 'data', arr );
	}
}; // end METHOD stream()


// EXPORTS //

module.exports = Chart;
