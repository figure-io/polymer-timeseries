'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isArrayArray = require( 'validate.io-array-array' );


// OBSERVER //

/**
* FUNCTION: dataChanged( newVal, oldVal )
*	Event handler invoked when the `data` property changes.
*
* @param {Array[]} newVal - new value
* @param {Array[]} oldVal - old value
*/
function dataChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var domain,
		err;
	if ( !isArrayArray( newVal ) ) {
		err = new TypeError( 'data::invalid assignment. Data must be an array of arrays.' );
		this.fire( 'err', err );
		return;
	}
	// Do we even have any data arrays?
	if ( !newVal.length ) {
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
		this._resetPaths();
	}
	this.fire( 'data', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'data',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION dataChanged()


// EXPORTS //

module.exports = dataChanged;
