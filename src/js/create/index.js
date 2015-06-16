'use strict';

/**
* FUNCTION: create()
*	Creates a chart.
*
* @returns {Object} context
*/
function create() {
	/* jshint validthis:true */

	// Ensure that the width and height are set before creating a chart...
	this.width = this.width || this.clientWidth || this.parentNode.clientWidth || 600;
	this.height = this.height || this.clientHeight || this.parentNode.clientHeight || 400;

	// Create the chart layers...
	this
		._createBase()
		._createBackground()
		._createPaths()
		._createAxes()
		._createTitle()
		._createAnnotations()
		._createLegend();

	return this;
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
