'use strict';

// MODULES //

var EVENTS = require( './../events' ),
	xValue = require( './../utils/xValue.js' ),
	yValue = require( './../utils/yValue.js' ),
	aValue = require( './../utils/aValue.js' ),
	isDefined = require( './../utils/isDefined.js' );


// PROPERTIES //

var props = {};

/**
* Chart data.
*
* @type {Array}
* @default []
*/
props.data = {
	'observer': '_dataChanged',
	'type': Array,
	'value': function data() {
		return [[]];
	}
};

/**
* Data labels.
*
* @type {String[]}
* @default []
*/
props.labels = {
	'observer': '_labelsChanged',
	'type': Array,
	'value': function labels() {
		return [];
	}
};

/**
* Chart annotations.
*
* @type {Array}
* @default []
*/
props.annotations = {
	'observer': '_annotationsChanged',
	'type': Array,
	'value': function annotations() {
		return [[]];
	}
};

/**
* x-value accessor.
*
* @type {Function}
*/
props.xValue = {
	'observer': '_xValueChanged',
	'type': Function,
	'value': xValue
};

/**
* y-value accessor.
*
* @type {Function}
*/
props.yValue = {
	'observer': '_yValueChanged',
	'type': Function,
	'value': yValue
};

/**
* Annotation accessor.
*
* @type {Function}
*/
props.aValue = {
	'observer': '_aValueChanged',
	'type': Function,
	'value': aValue
};

/**
* Accessor function which controls where a line is defined. Used to specify how missing values are encoded. Default behavior is to ignore data points or y-values which are `null`. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined}.
*
* @type {Function}
*/
props.isDefined = {
	'observer': '_isDefinedChanged',
	'type': Function,
	'value': isDefined
};

/**
* Chart configuration.
*
* @type {Object}
* @default {}
*/
props.config = {
	'observer': '_configChanged',
	'type': Object,
	'value': function config() {
		return {};
	}
};

/**
* Colors used for data encoding.
*
* @type {String|String[]}
* @default 'category10'
*/
props.colors = {
	'observer': '_colorsChanged',
	'value': 'category10'
};

/**
* Chart canvas width. If not explicitly set, defaults to the width of the parent node.
*
* @type {Number}
* @default null
*/
props.width = {
	'observer': '_widthChanged',
	'type': Number,
	'value': null
};

/**
* Chart canvas height. If not explicitly set, defaults to the height of the parent node.
*
* @type {Number}
* @default null
*/
props.height = {
	'observer': '_heightChanged',
	'type': Number,
	'value': null
};

/**
* Chart canvas left padding.
*
* @type {Number}
* @default 90px
*/
props.paddingLeft = {
	'observer': '_paddingLeftChanged',
	'type': Number,
	'value': 90
};

/**
* Chart canvas right padding.
*
* @type {Number}
* @default 20px
*/
props.paddingRight = {
	'observer': '_paddingRightChanged',
	'type': Number,
	'value': 20
};

/**
* Chart canvas top padding.
*
* @type {Number}
* @default 80px
*/
props.paddingTop = {
	'observer': '_paddingTopChanged',
	'type': Number,
	'value': 80
};

/**
* Chart canvas bottom padding.
*
* @type {Number}
* @default 80px
*/
props.paddingBottom = {
	'observer': '_paddingBottomChanged',
	'type': Number,
	'value': 80
};

/**
* Chart title.
*
* @type {String}
* @default ''
*/
props.title = {
	'observer': '_titleChanged',
	'type': String,
	'value': ''
};

/**
* x-axis label.
*
* @type {String}
* @default 'time'
*/
props.xLabel = {
	'observer': '_xLabelChanged',
	'type': String,
	'value': 'time'
};

/**
* y-axis label.
*
* @type {String}
* @default 'y'
*/
props.yLabel = {
	'observer': '_yLabelChanged',
	'type': String,
	'value': 'y'
};

/**
* x-limit minimum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number|Date}
* @default null
*/
props.xMin = {
	'observer': '_xMinChanged',
	'type': Date,
	'value': null
};

/**
* x-limit maximum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number|Date}
* @default null
*/
props.xMax = {
	'observer': '_xMaxChanged',
	'type': Date,
	'value': null
};

/**
* y-limit minimum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
props.yMin = {
	'observer': '_yMinChanged',
	'type': Number,
	'value': null
};

/**
* y-limit maximum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
props.yMax = {
	'observer': '_yMaxChanged',
	'type': Number,
	'value': null
};

/**
* x-axis tick format. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#tickFormat}.
*
* @type {String}
* @default '%H:%M' (hours:minutes)
*/
props.xTickFormat = {
	'observer': '_xTickFormatChanged',
	'type': String,
	'value': '%H:%M'
};

/**
* y-axis tick format. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/Formatting}.
*
* @type {String|Null}
* @default null
*/
props.yTickFormat = {
	'observer': '_yTickFormatChanged',
	'type': String,
	'value': null
};

/**
* Number of tick marks on the x-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number|Null}
* @default null
*/
props.xNumTicks = {
	'observer': '_xNumTicksChanged',
	'type': Number,
	'value': null
};

/**
* Number of tick marks on the y-axis. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#ticks}.
*
* @type {Number|Null}
* @default null
*/
props.yNumTicks = {
	'observer': '_yNumTicksChanged',
	'type': Number,
	'value': null
};

/**
* x-axis orientation. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#orient}.
*
* @type {String}
* @default 'bottom'
*/
props.xAxisOrient = {
	'observer': '_xAxisOrientChanged',
	'type': String,
	'value': 'bottom'
};

/**
* y-axis orientation. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Axes#orient}.
*
* @type {String}
* @default 'left'
*/
props.yAxisOrient = {
	'observer': '_yAxisOrientChanged',
	'type': String,
	'value': 'left'
};

/**
* Specifies the type of interpolation applied to path elements. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate}.
*
* @type {String}
* @default 'linear'
*/
props.interpolation = {
	'observer': '_interpolationChanged',
	'type': String,
	'value': 'linear'
};

/**
* Specifies the spline interpolation tension. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_tension}.
*
* @type {Number}
* @default 0.7
*/
props.tension = {
	'observer': '_tensionChanged',
	'type': Number,
	'value': 0.7
};

/**
* Specifies whether chart components (legend entires) should be draggable. See [tutorial]{@link http://www.html5rocks.com/en/tutorials/dnd/basics/}.
*
* @type {Boolean}
* @default true
*/
props.isDraggable = {
	'observer': '_isDraggableChanged',
	'type': Boolean,
	'value': true
};

/**
* Specifies whether data can be dropped into the chart. See [tutorial]{@link http://www.html5rocks.com/en/tutorials/dnd/basics/}.
*
* @type {Boolean}
* @default true
*/
props.isDroppable = {
	'observer': '_isDroppableChanged',
	'type': Boolean,
	'value': true
};

/**
* Boolean flag indicating whether a chart should auto update DOM elements whenever an attribute changes.
*
* @type {Boolean}
* @default true
*/
props.autoUpdate = {
	'observer': '_autoUpdateChanged',
	'type': Boolean,
	'value': true
};

/**
* Boolean flag indicating whether a chart should auto resize when the window resizes.
*
* @type {Boolean}
* @default true
*/
props.autoResize = {
	'observer': '_autoResizeChanged',
	'type': Boolean,
	'value': true
};

/**
* Public event names.
*
* @type {String[]}
*/
props.events = {
	'readOnly': true,
	'value': function events() {
		return EVENTS.slice();
	}
};


// EXPORTS //

module.exports = props;
