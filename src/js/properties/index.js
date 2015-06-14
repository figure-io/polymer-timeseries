'use strict';

// PROPERTIES //

var props = {};

/**
* Chart data.
*
* @type {Array}
* @default []
*/
props.data = {
	'observer': '',
	'type': Array,
	'value': function data() {
		return [];
	}
};

/**
* Data labels.
*
* @type {String[]}
* @default []
*/
props.labels = {
	'observer': '',
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
	'observer': '',
	'type': Array,
	'value': function annotations() {
		return [];
	}
};

/**
* x-value accessor.
*
* @type {Function}
* @default null
*/
props.xValue = {
	'observer': '',
	'type': Function,
	'value': null
};

/**
* y-value accessor.
*
* @type {Function}
* @default null
*/
props.yValue = {
	'observer': '',
	'type': Function,
	'value': null
};

/**
* Annotation accessor.
*
* @type {Function}
* @default null
*/
props.aValue = {
	'observer': '',
	'type': Function,
	'value': null
};

/**
* Accessor function which controls where a line is defined. Used to specify how missing values are encoded. Default behavior is to ignore data points or y-values which are `null`. See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined}.
*
* @type {Function}
* @default null
*/
props.isDefined = {
	'observer': '',
	'type': Function,
	'value': null
};

/**
* Chart configuration.
*
* @type {Object}
* @default {}
*/
props.config = {
	'observer': '',
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
	'observer': '',
	'value': 'category10'
};

/**
* Chart canvas width. If not explicitly set, defaults to the width of the parent node.
*
* @type {Number}
* @default null
*/
props.width = {
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
	'type': String,
	'value': 'y'
};

/**
* x-limit minimum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
props.xMin = {
	'observer': '',
	'type': Date,
	'value': null
};

/**
* x-limit maximum value. If `null`, the limit is computed from the data.
*
* @type {Null|Number}
* @default null
*/
props.xMax = {
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
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
	'observer': '',
	'type': Boolean,
	'value': true
};


// EXPORTS //

module.exports = props;
