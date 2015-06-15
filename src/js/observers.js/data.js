'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isArrayArray = require( 'validate.io-array-array' );


// OBSERVER //

/**
* FUNCTION: dataChanged( val[, newVal] )
*	Event handler invoked when the `data` property changes.
*
* @param {Array} val - change event value
* @param {Array} [newVal] - new value
*/
function dataChanged( val, newVal ) {
	/* jshint validthis:true */
	var data = this.data,
		len,
		domain,
		err;

	// Determine if we have a new data array...
	if ( arguments.length > 1 && !isArray( newVal ) ) {
		err = new TypeError( 'data::invalid assignment. Must provide an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.data = val;
		return;
	}
	len = data.length;
	// Validate that all array elements are arrays...
	if ( !isArrayArray( data ) ) {
		err = new TypeError( 'data::invalid assignment. Data must be an array of arrays.' );
		this.fire( 'err', err );
		return;
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
} // end FUNCTION dataChanged()


// EXPORTS //

module.exports = dataChanged;
