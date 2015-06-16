'use strict';

// ELEMENT //

var element = {};


// NAME //

element.is = require( './name' );


// PROPERTIES //

element.properties = require( './properties' );


// LIFECYCLE //

element.created = require( './lifecycle/created.js' );

element.attached = require( './lifecycle/attached.js' );

element.detached = require( './lifecycle/detached.js' );


// INIT //

element._init = require( './init' );


// CHART CREATION //

element._create = require( './create' );

element._createBase = require( './create/base.js' );

element._createBackground = require( './create/background.js' );

element._createAxes = require( './create/axes.js' );

element._createPaths = require( './create/paths.js' );

element._createTitle = require( './create/title.js' );

element._createAnnotations = require( './create/annotations.js' );

element._createLegend = require( './create/legend.js' );


// RESET //

element._resetPaths = require( './reset/paths.js' );

element._resestAnnotations = require( './reset/annotations.js' );

element._resetLegend = require( './reset/legend.js' );


// CLEAR //

element.clear = require( './clear' );


// LISTENERS //

element._addListeners = require( './listeners/add.js' );

element._removeListeners = require( './listeners/remove.js' );

element.onDragEnter = require( './listeners/dragEnter.js' );

element.onDragOver = require( './listeners/dragOver.js' );

element.onDragLeave = require( './listeners/dragLeave.js' );

element.onDrop = require( './listeners/drop.js' );


// OBSERVERS //

element._dataChanged = require( './observers/data.js' );

element._labelsChanged = require( './observers/labels.js' );

element._annotationsChanged = require( './observers/annotations.js' );

element._xValueChanged = require( './observers/xValue.js' );

element._yValueChanged = require( './observers/yValue.js' );

element._aValueChanged = require( './observers/aValue.js' );

element._isDefinedChanged = require( './observers/isDefined.js' );

element._colorsChanged = require( './observers/colors.js' );

element._configChanged = require( './observers/config.js' );

element._widthChanged = require( './observers/width.js' );

element._heightChanged = require( './observers/height.js' );

element._paddingLeftChanged = require( './observers/propertyLeft.js' );

element._paddingRightChanged = require( './observers/propertyRight.js' );

element._paddingTopChanged = require( './observers/propertyTop.js' );

element._paddingBottomChanged = require( './observers/propertyBottom.js' );

element._titleChanged = require( './observers/title.js' );

element._xLabelChanged = require( './observers/xLabel.js' );

element._yLabelChanged = require( './observers/yLabel.js' );

element._xMinChanged = require( './observers/xMin.js' );

element._xMaxChanged = require( './observers/xMax.js' );

element._yMinChanged = require( './observers/yMin.js' );

element._yMaxChanged = require( './observers/yMax.js' );

element._xTickFormatChanged = require( './observers/xTickFormat.js' );

element._yTickFormatChanged = require( './observers/yTickFormat.js' );

element._xNumTicksChanged = require( './observers/xNumTicks.js' );

element._yNumTicksChanged = require( './observers/yNumTicks.js' );

element._xAxisOrientChanged = require( './observers/xAxisOrient.js' );

element._yAxisOrientChanged = require( './observers/yAxisOrient.js' );

element._interpolationChanged = require( './observers/interpolation.js' );

element._tensionChanged = require( './observers/tension.js' );

element._isDraggableChanged = require( './observers/isDraggable.js' );

element._isDroppableChanged = require( './observers/isDroppable.js' );

element._autoResizeChanged = require( './observers/autoResize.js' );


// UTILS //

element.formatData = require( './utils/formatData.js' );

element.formatAnnotations = require( './utils/formatAnnotations.js' );

element._graphWidth = require( './utils/graphWidth.js' );

element._graphHeight = require( './utils/graphHeight.js' );

element._xDomain = require( './utils/xDomain.js' );

element._yDomain = require( './utils/yDomain.js' );


// STREAM //

element.stream = require( './stream' );


// EXPORTS //

module.exports = element;
