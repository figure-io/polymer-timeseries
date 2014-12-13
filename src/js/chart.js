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

'use strict';

// MODULES //

var d3 = require( 'd3' ),
	uuid = require( 'node-uuid' ),
	isObject = require( 'validate.io-object' ),
	Stream = require( './stream' );


// VARIABLES //

var OPTS = {},
	X1,
	X2;

X2 = new Date();
X1 = new Date( X2.getTime() - 3600000 );

OPTS.xTickFormat = [
	'%Y',
	'%B',
	'%b',
	'%a',
	'%d',
	'%I',
	'%p',
	'%M',
	'%S',
	'%L'
];

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


// FUNCTIONS //

/**
* FUNCTION: x( d )
*	Maps an x-value to a pixel value.
*
* @private
* @param {Array} d - datum
* @param {Number} pixel value
*/
function x( d ) {
	/* jshint validthis: true */
	return this._xScale( d[ 0 ] );
}

/**
* FUNCTION: y( d )
*	Maps an y-value to a pixel value.
*
* @private
* @param {Array} d - datum
* @param {Number} pixel value
*/
function y( d ) {
	/* jshint validthis: true */
	return this._yScale( d[ 1 ] );
}

/**
* FUNCTION: setLabels( d, i )
*	Sets data labels.
*
* @private
* @param {Array} d - datum
* @param {Number} i - index
*/
function setLabels( d, i ) {
	/* jshint validthis: true */
	return this.labels[ i ];
}

/**
* FUNCTION: setColors( d, i )
*	Sets data colors.
*
* @private
* @param {Array} d - datum
* @param {Number} i - index
*/
function setColors( d, i ) {
	/* jshint validthis: true */
	return this.colors[ i % this.colors.length ];
}

/**
* FUNCTION: graphWidth()
*	Returns the graph width.
*
* @private
* @returns {Number} graph width
*/
function graphWidth() {
	/* jshint validthis: true */
	return this.width - this.paddingLeft - this.paddingRight;
}

/**
* FUNCTION: graphHeight()
*	Returns the graph height.
*
* @private
* @returns {Number} graph height
*/
function graphHeight() {
	/* jshint validthis: true */
	return this.height - this.paddingTop - this.paddingBottom;
}

/**
* FUNCTION: legendTransform( d, i )
*	Sets a legend item position.
*
* @private
* @param {String} d - legend label
* @param {Number} i - index
*/
function legendTransform( d, i ) {
	var xPos = Math.floor( i / 2 ) * 210,
		yPos = (i%2) * 25;

	return 'translate(' + xPos + ',' + yPos + ')';
}


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
* ATTRIBUTE: config
*	Chart configuration object.
*
* @type {Object}
* @default {}
*/
Chart.prototype.config = {};

/**
* ATTRIBUTE: _data
*	Chart data.
*
* @private
* @type {Array}
* @default []
*/
Chart.prototype._data = [];

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
Chart.prototype.paddingRight = 0;

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
*	Chart canvas width.
*
* @type {Number}
* @default 600px
*/
Chart.prototype.width = 600;

/**
* ATTRIBUTE: height
*	Chart canvas height.
*
* @type {Number}
* @default 400px
*/
Chart.prototype.height = 400;

/**
* ATTRIBUTE: labels
*	Data labels.
*
* @type {Array}
* @default []
*/
Chart.prototype.labels = [];

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
* @default '%M' (minutes)
*/
Chart.prototype.xTickFormat = '%M';

/**
* ATTRIBUTE: xNumTicks
*	Number of tick marks on the x-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number}
* @default 5 ticks
*/
Chart.prototype.xNumTicks = 5;

/**
* ATTRIBUTE: yNumTicks
*	Number of tick marks on the y-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number}
* @default 5 ticks
*/
Chart.prototype.yNumTicks = 5;

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
* ATTRIBUTE: colors
*	Defines a list of possible line colors. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10}.
*
* @type {Array}
* @default [...]
*/
Chart.prototype.colors = [
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

/**
* ATTRIBUTE: events
*	List of events emitted from the element.
*
* @type {Array}
* @default [...]
*/
Chart.prototype.events = [
	'reset',
	'error',
	'changed',
	'resize',
	'click'
];

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
	var self = this;

	// Private methods...

	// Graph...
	this._graphWidth = graphWidth.bind( this );
	this._graphHeight = graphHeight.bind( this );

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

	this._xAxis = d3.svg.axis()
		.scale( this._xScale )
		.orient( this.xAxisOrient )
		.tickFormat( this._xTickFormat )
		.ticks( this.xNumTicks );

	this._yAxis = d3.svg.axis()
		.scale( this._yScale )
		.orient( this.yAxisOrient )
		.ticks( this.yNumTicks );

	// Paths...
	this._line = d3.svg.line()
		.x( x.bind( this ) )
		.y( y.bind( this ) )
		.defined( this.isDefined )
		.interpolate( this.interpolation )
		.tension( this.tension );

	// Stream...
	this._stream = null;

	// Encoding...
	this._colors = setColors.bind( this );

	// Legend...
	this._legendTransform = legendTransform.bind( this );
	this._setLabels = setLabels.bind( this );

	// Interaction:
	this._toggleSeries = toggleSeries;

	// Elements...
	this.$ = {
		'canvas': null,
		'clipPath': null,
		'graph': null,
		'xAxis': null,
		'yAxis': null,
		'xLabel': null,
		'yLabel': null,
		'meta': null,
		'title': null,
		'legend': null,
		'legendSymbols': null,
		'legendLabels': null,
		'bkgd': null,
		'marks': null,
		'paths': null,
		'annotations': null
	};
	this._clipPathID = uuid.v4();

	return;

	/**
	* FUNCTION: toggleSeries()
	*	Event handler to toggle a displayed time series.
	*/
	function toggleSeries() {
		/* jshint validthis: true */
		var selection,
			path,
			idx,
			flg;

		// Note: `this` is the legend element which was clicked.

		// Get the corresponding path element...
		selection = d3.select( this );
		idx = selection.data()[ 0 ];
		path = d3.select( self.$.paths[ 0 ][ idx ] );

		// Toggle the path visibility...
		flg = !selection.classed( 'hidden' );
		selection.classed( 'hidden', flg );
		path.classed( 'hidden', flg );

		// TODO: determine how UI events should be handled. What data to pass along?
		self.fire( 'click', {
			'msg': 'Legend entry clicked.',
			'state': ( flg ? 'hidden' : '' )
		});
	} // end FUNCTION toggleSeries()
}; // end METHOD init()

/**
* METHOD: attached()
*	Polymer hook that is called when the element is inserted in the DOM.
*/
Chart.prototype.attached = function() {
	this.chart();
}; // end METHOD attached()

/**
* METHOD: chart()
*	Creates a chart.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.chart = function() {
	this
		.createBase()
		.createBackground()
		.createPaths()
		.createAxes()
		.createTitle()
		.createAnnotations()
		.createLegend();

	return this;
}; // end METHOD chart()

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

	// Create the SVG element:
	canvas = d3.select( this.$.chart ).append( 'svg:svg' )
		.attr( 'property', 'canvas' )
		.attr( 'class', 'canvas' )
		.attr( 'width', width )
		.attr( 'height', height )
		.attr( 'viewBox', '0 0 ' + width + ' ' + height )
		.attr( 'preserveAspectRatio', 'xMidYMid' )
		.attr( 'data-aspect', width / height );
	this.$.canvas = canvas;

	// Create the clip-path:
	this.$.clipPath = canvas.append( 'svg:defs' )
		.append( 'svg:clipPath' )
			.attr( 'id', this._clipPathID )
			.append( 'svg:rect' )
				.attr( 'class', 'clipPath' )
				.attr( 'width', this._graphWidth() )
				.attr( 'height', this._graphHeight() );

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
	this.$.bkgd = this.$.graph.append( 'svg:rect' )
		.attr( 'class', 'background' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.attr( 'width', this._graphWidth() )
		.attr( 'height', this._graphHeight() );

	return this;
}; // end METHOD createBackground()

/**
* METHOD: createPaths()
*	Creates graph path elements.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createPaths = function() {
	// Create a `marks` group:
	this.$.marks = this.$.graph.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + this._clipPathID + ')' );

	// Add paths:
	this.$.paths = this.$.marks.selectAll( '.line' )
		.data( this._data )
		.enter()
		.append( 'svg:path' )
			.attr( 'property', 'line timeseries' )
			.attr( 'class', 'line' )
			.attr( 'data-label', this._setLabels )
			.attr( 'color', this._colors )
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
		height = this._graphHeight(),
		axis;

	axis = graph.append( 'svg:g' )
		.attr( 'property', 'axis' )
		.attr( 'class', 'x axis' )
		.attr( 'transform', 'translate(0,' + height + ')' )
		.call( this._xAxis );
	this.$.xAxis = axis;

	this.$.xLabel = axis.append( 'svg:text' )
		.attr( 'y', 40 )
		.attr( 'x', ( this._graphWidth() ) / 2 )
		.attr( 'text-anchor', 'middle' )
		.attr( 'property', 'axis_label' )
		.attr( 'class', 'label' )
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
		.attr( 'class', 'label' )
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
	this.$.title = this.$.meta.append( 'svg:text' )
		.attr( 'property', 'chart.title' )
		.attr( 'class', 'title' )
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
	// TODO
	return this;
}; // end METHOD createAnnotations()

/**
* METHOD: createLegend()
*	Creates the chart legend.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.createLegend = function() {
	var colors = this._colors,
		setLabels = this._setLabels,
		numLabels = this.labels.length,
		numData = this._data.length,
		len,
		range,
		legend,
		entries,
		symbols,
		labels,
		el,
		i;

	// Determine how many legend labels to create...
	len = ( numLabels > numData ) ? numData : numLabels;
	range = d3.range( len );

	legend = this.$.meta.append( 'svg:g' )
		.attr( 'property', 'legend' )
		.attr( 'class', 'legend' )
		.attr( 'transform', 'translate(0,20)' );
	this.$.legend = legend;

	entries = legend.selectAll( '.entry' )
		.data( range )
		.enter()
		.append( 'svg:g' )
			.attr( 'class', 'entry noselect' )
			.attr( 'transform', this._legendTransform )
			.on( 'click', this._toggleSeries );
	this.$.legendEntries = entries;

	symbols = entries.append( 'svg:line' )
		.attr( 'class', 'symbol' )
		.attr( 'x1', 0 )
		.attr( 'x2', 10 )
		.attr( 'y1', 0 )
		.attr( 'y2', 0 );
	this.$.legendSymbols = symbols;

	labels = entries.append( 'svg:text' )
		.attr( 'class', 'label' )
		.attr( 'dy', '.35em' )
		.attr( 'transform', 'translate(15,0)' );
	this.$.legendLabels = labels;

	// Set the color of all symbols...
	for ( i = 0; i < symbols.length; i++ ) {
		el = symbols[ i ][ 0 ];
		if ( el ) {
			el.setAttribute( 'color', colors( null, i ) );
		}
	}

	// Set the text of all labels...
	for ( i = 0; i < labels.length; i++ ) {
		el = labels[ i ][ 0 ];
		if ( el ) {
			el.textContent = setLabels( null, i );
		}
	}

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
		.data( this._data )
		.attr( 'd', this._line );

	// Remove any old paths:
	paths.exit().remove();

	// Add any new paths:
	paths.enter().append( 'svg:path' )
		.attr( 'property', 'line timeseries' )
		.attr( 'class', 'line' )
		.attr( 'data-label', this._setLabels )
		.attr( 'color', this._colors )
		.attr( 'd', this._line );

	// Cache a reference to the paths:
	this.$.paths = paths;

	this.fire( 'reset', {
		'msg': 'Reset chart paths.'
	});

	return this;
}; // end METHOD resetPaths()

/**
* METHOD: resetLegend()
*	Resets legend elements.
*
* @returns {DOMElement} element instance
*/
Chart.prototype.resetLegend = function() {
	var colors = this._colors,
		setLabels = this._setLabels,
		numLabels = this.labels.length,
		numData = this._data.length,
		len,
		range,
		entries,
		gEnter,
		symbols,
		labels,
		i;

	// Determine how many legend labels to create...
	len = ( numLabels > numData ) ? numData : numLabels;
	range = d3.range( len );

	// Bind a set of labels:
	entries = this.$.legend.selectAll( '.entry' )
		.data( range );

	// Remove old legend entries:
	entries.exit().remove();

	// Add any new entries:
	gEnter = entries.enter().append( 'svg:g' )
		.attr( 'class', 'entry noselect' )
		.attr( 'transform', this._legendTransform )
		.on( 'click', this._toggleSeries );

	gEnter.append( 'svg:line' )
		.attr( 'class', 'symbol' )
		.attr( 'x1', 0 )
		.attr( 'x2', 10 )
		.attr( 'y1', 0 )
		.attr( 'y2', 0 );

	gEnter.append( 'svg:text' )
		.attr( 'class', 'label' )
		.attr( 'dy', '.35em' )
		.attr( 'transform', 'translate(15,0)' );

	this.$.legendEntries = entries;

	// Update all symbols:
	symbols = entries.selectAll( '.symbol' );
	for ( i = 0; i < symbols.length; i++ ) {
		symbols[ i ][ 0 ].setAttribute( 'color', colors( null, i ) );
	}
	this.$.legendSymbols = symbols;

	// Update all labels:
	labels = entries.selectAll( '.label' );
	for ( i = 0; i < labels.length; i++ ) {
		labels[ i ][ 0 ].textContent = setLabels( null, i );
	}
	this.$.legendLabels = labels;

	this.fire( 'reset', {
		'msg': 'Reset chart legend.'
	});

	return this;
}; // end METHOD resetLegend()

/**
* METHOD: data( data[, bool] )
*	Sets the chart data.
*
* @param {Array} data - array of arrays
* @param {Boolean} [bool] - boolean flag indicating if the data is already formatted (default: false)
* @returns {Null|Array} data - array of arrays
*/
Chart.prototype.data = function( data, bool ) {
	var flg = false,
		domain,
		err;
	if ( !Array.isArray( data ) ) {
		err = new TypeError( 'data()::invalid input argument. Must provide an array. Value: `' + data + '`.' );
		this.fire( 'error', err );
		return;
	}
	if ( arguments.length > 1 ) {
		if ( typeof bool !== 'boolean' ) {
			err = new TypeError( 'data()::invalid input argument. Second argument must be a boolean. Value: `' + bool + '`.' );
			this.fire( 'error', err );
			return;
		}
		flg = bool;
	}
	if ( !bool ) {
		data = this.formatData( data );
	}
	this._data = data;

	// TODO: Transitions!!!!

	// [0] Update the xDomain:
	domain = this.xDomain( this.xMin, this.xMax );

	// [1] Update the xScale:
	this._xScale.domain( domain );

	// [2] Update the xAxis:
	this.$.xAxis.call( this._xAxis );

	// [3] Update the yDomain:
	domain = this.yDomain( this.yMin, this.yMax );

	// [4] Update the yScale:
	this._yScale.domain( domain );

	// [5] Update the yAxis:
	this.$.yAxis.call( this._yAxis );

	// [6] Create new paths:
	this.resetPaths();

	return this;
}; // end METHOD data()

/**
* METHOD: formatData( data )
*	Converts data to standard representation. Needed for non-deterministic accessors.
*
* @param {Array} data - array of arrays
* @returns {Null|Array} data - array of arrays
*/
Chart.prototype.formatData = function( data ) {
	var xValue = this.xValue,
		yValue = this.yValue,
		len = data.length,
		dataset,
		tmp,
		n,
		out,
		err;

	if ( !Array.isArray( data ) ) {
		err = new TypeError( 'formatData()::invalid input argument. Must provide an array. Value: `' + data + '`.' );
		this.fire( 'error', err );
		return;
	}
	out = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		dataset = data[ i ];
		if ( !Array.isArray( dataset ) ) {
			err = new TypeError( 'formatData()::invalid input argument. Must provide an array of arrays. Value: `' + data + '`.' );
			this.fire( 'error', err );
			return;
		}
		n = dataset.length;
		tmp = new Array( n );
		for ( var j = 0; j < n; j++ ) {
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
* METHOD: xDomain( min, max )
*	Computes the x-domain.
*
* @param {Null|Date} min - minimum value
* @param {Null|Date} max - maximum value
* @returns {Array} domain
*/
Chart.prototype.xDomain = function( min, max ) {
	var data = this._data,
		err;

	if ( min !== null && !( min instanceof Date ) ) {
		err = new TypeError( 'xDomain()::invalid input argument. Must be a `Date` object or `null`. Value: `' + min + '`.' );
		this.fire( 'error', err );
		return;
	}
	if ( max !== null && !( max instanceof Date ) ) {
		err = new TypeError( 'xDomain()::invalid input argument. Must be a `Date` object or `null`. Value: `' + max + '`.' );
		this.fire( 'error', err );
		return;
	}
	if ( min === null ) {
		min = d3.min( data, function onDataset( dataset ) {
			return d3.min( dataset, function onDatum( d ) {
				return d[ 0 ];
			});
		});
	}
	if ( max === null ) {
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
	var data = this._data,
		err;

	if ( min !== null && ( typeof min !== 'number' || min !== min ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Must be numeric or `null`. Value: `' + min + '`.' );
		this.fire( 'error', err );
		return;
	}
	if ( max !== null && ( typeof max !== 'number' || max !== max ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Must be numeric or `null`. Value: `' + max + '`.' );
		this.fire( 'error', err );
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
* METHOD: configChanged( oldConfig, newConfig )
*	Event handler invoked when the `config` attribute changes.
*
* @param {Object} oldConfig - old config
* @param {Object} newConfig - new config
*/
Chart.prototype.configChanged = function( oldConfig, newConfig ) {
	var err;
	if ( typeof newConfig !== 'object' || newConfig === null || Array.isArray( newConfig) ) {
		this.config = oldConfig;
		err = new TypeError( 'config::invalid assignment. Must be an `object`. Value: `' + newConfig + '`.' );
		this.fire( 'error', err );
		return;
	}
	// TODO: schema validator

	this.fire( 'changed', {
		'attr': 'config',
		'prev': oldConfig,
		'curr': newConfig
	});

	// TODO: want a way to update everything after setting all params; not constantly updating. Recall: this._init = false. Something more semantic?

	this.width = newConfig.canvas.width;
	this.height = newConfig.canvas.height;
	this.title = newConfig.annotations.title;
	this.xLabel = newConfig.axes[ 0 ].label;
	this.yLabel = newConfig.axes[ 1 ].label;
	this.xMin = newConfig.scales[ 0 ].domain.min;
	this.xMax = newConfig.scales[ 0 ].domain.max;
	this.yMin = newConfig.scales[ 1 ].domain.min;
	this.yMax = newConfig.scales[ 1 ].domain.max;
	this.xNumTicks = newConfig.axes[ 0 ].ticks;
	this.yNumTicks = newConfig.axes[ 1 ].ticks;
	this.xTickFormat = newConfig.axes[ 0 ].format;
	this.xAxisOrient = newConfig.axes[ 0 ].orient;
	this.yAxisOrient = newConfig.axes[ 1 ].orient;

	// TODO: support this and `tension` for multiple lines.
	// this.interpolation = newConfig.marks[ 0 ].properties.interpolation;

	this.labels = newConfig.marks.map( function onMark( mark ) {
		return mark.data;
	});
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
		this.xValue = oldVal;
		err = new TypeError( 'xValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xValue'
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
		this.yValue = oldVal;
		err = new TypeError( 'yValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yValue'
	});
}; // end METHOD yValueChanged()

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
		this.isDefined = oldVal;
		err = new TypeError( 'isDefined::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'isDefined'
	});
	line.defined( newVal );
	selection.attr( 'd', line );
}; // end METHOD isDefinedChanged()

/**
* METHOD: widthChanged( oldVal, newVal )
*	Event handler invoked when the `width` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.widthChanged = function( oldVal, newVal ) {
	var height = this.height,
		width,
		range,
		err;
	if ( typeof newVal !== 'number' || newVal !== newVal || newVal <= 0 ) {
		this.width = oldVal;
		err = new TypeError( 'width::invalid assignment. Must be a number greater than 0. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'width',
		'prev': oldVal,
		'curr': newVal
	});

	width = newVal - this.paddingLeft - this.paddingRight;

	// [0] Update the SVG canvas:
	this.$.canvas
		.attr( 'width', newVal )
		.attr( 'viewBox', '0 0 ' + newVal + ' ' + height )
		.attr( 'data-aspect', newVal / height );

	// [1] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

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
}; // end METHOD widthChanged()

/**
* METHOD: heightChanged( oldVal, newVal )
*	Event handler invoked when the `height` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.heightChanged = function( oldVal, newVal ) {
	var width = this.width,
		range,
		height,
		err;
	if ( typeof newVal !== 'number' || newVal !== newVal || newVal <= 0 ) {
		this.height = oldVal;
		err = new TypeError( 'height::invalid assignment. Must be a number greater than 0. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'height',
		'prev': oldVal,
		'curr': newVal
	});

	height = newVal - this.paddingTop - this.paddingBottom;

	// [0] Update the SVG canvas:
	this.$.canvas
		.attr( 'height', newVal )
		.attr( 'viewBox', '0 0 ' + width + ' ' + newVal )
		.attr( 'data-aspect', width / newVal );

	// [1] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

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
}; // end METHOD heightChanged()

/**
* METHOD: labelsChanged( oldVal, newVal )
*	Event handler invoked when the `labels` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.labelsChanged = function( oldVal, newVal ) {
	var err;
	if ( !Array.isArray( newVal ) ) {
		this.labels = oldVal;
		err = new TypeError( 'labels::invalid assignment. Must be an array. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'labels',
		'prev': oldVal,
		'curr': newVal
	});

	// [0] Reset the data labels:
	this.$.paths.attr( 'data-label', this._setLabels );

	// [1] Reset the chart legend:
	this.resetLegend();
}; // end METHOD labelsChanged()

/**
* METHOD: chartTitleChanged( oldVal, newVal )
*	Event handler invoked when the `chartTitle` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.chartTitleChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		this.chartTitle = oldVal;
		err = new TypeError( 'charTitle::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'title',
		'prev': oldVal,
		'curr': newVal
	});
	this.$.meta.select( '.title' )
		.html( newVal );
}; // end METHOD chartTitleChanged()

/**
* METHOD: xLabelChanged( oldVal, newVal )
*	Event handler invoked when the `xLabel` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.xLabelChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		this.xLabel = oldVal;
		err = new TypeError( 'xlabel::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xLabel',
		'prev': oldVal,
		'curr': newVal
	});
	this.$.xLabel.text( newVal );
}; // end METHOD xLabelChanged()

/**
* METHOD: yLabelChanged( oldVal, newVal )
*	Event handler invoked when the `yLabel` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.yLabelChanged = function( oldVal, newVal ) {
	var err;
	if ( typeof newVal !== 'string' ) {
		this.yLabel = oldVal;
		err = new TypeError( 'yLabel::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yLabel',
		'prev': oldVal,
		'curr': newVal
	});
	this.$.yLabel.text( newVal );
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
		this.xMin = oldVal;
		err = new TypeError( 'xMin::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xMin',
		'prev': oldVal,
		'curr': newVal
	});
	// [0] Update the domain:
	domain = this.xDomain( newVal, domain[ 1 ] );

	// [1] Update the xScale:
	xScale.domain( domain );

	// [2] Update the xAxis:
	this.$.xAxis.call( this._xAxis );

	// [3] Update the paths:
	this.$.paths.attr( 'd', this._line );
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
		this.xMax = oldVal;
		err = new TypeError( 'xMax::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xMax',
		'prev': oldVal,
		'curr': newVal
	});
	// [0] Update the domain:
	domain = this.xDomain( domain[ 0 ], newVal );

	// [1] Update the xScale:
	xScale.domain( domain );

	// [2] Update the xAxis:
	this.$.xAxis.call( this._xAxis );

	// [3] Update the paths:
	this.$.paths.attr( 'd', this._line );
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
		this.yMin = oldVal;
		err = new TypeError( 'yMin::invalid assignment. Must be a numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yMin',
		'prev': oldVal,
		'curr': newVal
	});
	// [0] Update the domain:
	domain = this.yDomain( newVal, domain[ 1 ] );

	// [1] Update the yScale:
	yScale.domain( domain );

	// [2] Update the yAxis:
	this.$.yAxis.call( this._yAxis );

	// [3] Update the paths:
	this.$.paths.attr( 'd', this._line );
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
		this.yMax = oldVal;
		err = new TypeError( 'yMax::invalid assignment. Must be numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yMax',
		'prev': oldVal,
		'curr': newVal
	});
	// [0] Update the domain:
	domain = this.yDomain( domain[ 0 ], newVal );

	// [1] Update the yScale:
	yScale.domain( domain );

	// [2] Update the yAxis:
	this.$.yAxis.call( this._yAxis );

	// [3] Update the paths:
	this.$.paths.attr( 'd', this._line );
}; // end METHOD yMaxChanged()

/**
* METHOD: xNumTicksChanged( oldVal, newVal )
*	Event handler invoked when the `xNumTicks` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.xNumTicksChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		this.xNumTicks = oldVal;
		err = new TypeError( 'xNumTicks::invalid assignment. Must be a positive integer. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
	xAxis.ticks( newVal );
	selection.call( xAxis );
}; // end METHOD xNumTicksChanged()

/**
* METHOD: yNumTicksChanged( oldVal, newVal )
*	Event handler invoked when the `yNumTicks` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.yNumTicksChanged = function( oldVal, newVal ) {
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( typeof newVal !== 'number' || newVal !== newVal || newVal%1 !== 0 || newVal < 0 ) {
		this.yNumTicks = oldVal;
		err = new TypeError( 'yNumTicks::invalid assignment. Must be a positive integer. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
	yAxis.ticks( newVal );
	selection.call( yAxis );
}; // end METHOD yNumTicksChanged()

/**
* METHOD: xAxisOrientChanged( oldVal, newVal )
*	Event handler invoked when the `xAxisOrient` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.xAxisOrientChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( typeof newVal !== 'string' || OPTS.xAxisOrient.indexOf( newVal ) === -1 ) {
		this.xAxisOrient = oldVal;
		err = new TypeError( 'xAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.xAxisOrient.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
	xAxis.orient( newVal );
	selection.call( xAxis );

	// TODO: this is subtle. As labels, etc may need to change.
}; // end METHOD xAxisOrientChanged()

/**
* METHOD: yAxisOrientChanged( oldVal, newVal )
*	Event handler invoked when the `yAxisOrient` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.yAxisOrientChanged = function( oldVal, newVal ) {
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( typeof newVal !== 'string' || OPTS.yAxisOrient.indexOf( newVal ) === -1 ) {
		this.yAxisOrient = oldVal;
		err = new TypeError( 'yAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.yAxisOrient.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'yAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
	yAxis.orient( newVal );
	selection.call( yAxis );

	// TODO: this is subtle. As labels, etc may need to change.
}; // end METHOD yAxisOrientChanged()

/**
* METHOD: xTickFormatChanged( oldVal, newVal )
*	Event handler invoked when the `xTickFormat` attribute changes.
*
* @param {Number} oldVal - old value
* @param {Number} newVal - new value
*/
Chart.prototype.xTickFormatChanged = function( oldVal, newVal ) {
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( typeof newVal !== 'string' || OPTS.xTickFormat.indexOf( newVal ) === -1 ) {
		this.xTickFormat = oldVal;
		err = new TypeError( 'xTickFormat::invalid assignment. Must be one of the following: `' + OPTS.xTickFormat.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'xTickFormat',
		'prev': oldVal,
		'curr': newVal
	});
	this._xTickFormat = d3.time.format( newVal );
	xAxis.tickFormat( this._xTickFormat );
	selection.call( xAxis );
}; // end METHOD xTickFormatChanged()

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
		this.interpolation = oldVal;
		err = new TypeError( 'intepolation::invalid assignment. Must be one of the following: `' + OPTS.interpolation.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'interpolation',
		'prev': oldVal,
		'curr': newVal
	});
	line.interpolate( newVal );
	selection.attr( 'd', line );
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

	if ( typeof newVal !== 'number' ) {
		this.tension = oldVal;
		err = new TypeError( 'tension::invalid assignment. Must be numeric. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'tension',
		'prev': oldVal,
		'curr': newVal
	});
	line.tension( newVal );
	selection.attr( 'd', line );
}; // end METHOD tensionChanged()

/**
* METHOD: colorsChanged( oldVal, newVal )
*	Event handler invoked when the `colors` attribute changes.
*
* @param {Array} oldVal - old value
* @param {Array} newVal - new value
*/
Chart.prototype.colorsChanged = function( oldVal, newVal ) {
	var err;
	if ( !Array.isArray( newVal ) ) {
		this.colors = oldVal;
		err = new TypeError( 'colors::invalid assignment. Must be an `array` of classes. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'colors',
		'prev': oldVal,
		'curr': newVal
	});
	this.$.paths.attr( 'color', this._colors );
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
		this.paddingLeft = oldVal;
		err = new TypeError( 'paddingLeft::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'paddingLeft',
		'prev': oldVal,
		'curr': newVal
	});

	width = this.width - newVal - this.paddingRight;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

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
		this.paddingRight = oldVal;
		err = new TypeError( 'paddingRight::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'paddingRight',
		'prev': oldVal,
		'curr': newVal
	});

	width = this.width - this.paddingLeft - newVal;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

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
		this.paddingBottom = oldVal;
		err = new TypeError( 'paddingBottom::invalid assignment. Must be an integer greater than or equal to 0. Value: `' + newVal + '`.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'paddingBottom',
		'prev': oldVal,
		'curr': newVal
	});

	height = this.height - this.paddingTop - newVal;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

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
		this.paddingTop = oldVal;
		err = new TypeError( 'paddingTop::invalid assignment. Must be an integer greater than or equal to 0.  Value: `' + newVal + '.' );
		this.fire( 'error', err );
		return;
	}
	this.fire( 'changed', {
		'attr': 'paddingTop',
		'prev': oldVal,
		'curr': newVal
	});

	height = this.height - newVal - this.paddingBottom;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

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
}; // end METHOD paddingTopChanged()

/**
* METHOD: onResize()
*	Resize listener.
*/
Chart.prototype.onResize = function() {
	var canvas,
		width,
		aspect;

	this.fire( 'resize', {
		'msg': 'Received a resize event.'
	});

	// Get the element's width:
	width = this.clientWidth;

	// Get the canvas:
	canvas = this.$.canvas;
	if ( !canvas ) {
		return;
	}

	// Get the canvas' aspect ratio:
	aspect = canvas.getAttribute( 'data-aspect' );

	// Set the canvas' width and height:
	canvas.setAttribute( 'width', width );
	canvas.setAttribute( 'height', Math.floor( width / aspect ) );
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
		err;
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			err = new TypeError( 'stream()::invalid input argument. Options must be an object.' );
			this.fire( 'error', err );
			return;
		}
		opts = options;
	}
	var clbk = onData.bind( this );
	this._stream = new Stream( clbk, opts );
	return this._stream;

	function onData( error, arr ) {
		/* jshint validthis: true */
		if ( error ) {
			this.fire( 'error', error );
			return;
		}
		// TODO: call update function
	}
}; // end METHOD stream()


// EXPORTS //

module.exports = Chart;
