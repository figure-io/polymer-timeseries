'use strict';

// VARIABLES //

var X2 = new Date(),
	X1 = new Date( X2.getTime() - 3600000 );


// CLEAR //

/**
* FUNCTION: clear()
*	Clears the chart and resets axes.
*
* @returns {Object} context
*/
function clear() {
	/* jshint validthis:true */

	// TODO: should meta data (e.g., title) be cleared as well?

	// Remove data, annotations, labels:
	this.labels = []; // FIXME: reallocating memory
	this.data = []; // FIXME: reallocating memory
	this.annotations.length = []; // FIXME: reallocating memory

	// Reset the axes domains:
	this._xScale.domain( [ X1, X2 ] );
	this._yScale.domain( [ 0, 1 ] );

	// Redraw the axes:
	this.$.xAxis.call( this._xAxis );
	this.$.yAxis.call( this._yAxis );

	return this;
} // end FUNCTION clear()


// EXPORTS //

module.exports = clear;
