'use strict';

// ELEMENT //

var element = {};


// NAME //

element.is = require( './name' );


// PROPERTIES //

element.properties = require( './properties' );


// LISTENERS //

element.onDragEnter = require( './listeners/dragEnter.js' );

element.onDragOver = require( './listeners/dragOver.js' );

element.onDragLeave = require( './listeners/dragLeave.js' );

element.onDrop = require( './listeners/drop.js' );


// OBSERVERS //

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


// EXPORTS //

module.exports = element;
