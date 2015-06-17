'use strict';

/**
* FUNCTION: xMaxChanged( newVal, oldVal )
*	Event handler invoked when the `xMax` property changes.
*
* @param {Null|Number} newVal - new value
* @param {Null|Number} oldVal - old value
*/
function xMaxChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var xScale = this._xScale,
		domain,
		err;

	if ( oldVal === void 0 ) {
		return;
	}
	if ( newVal !== null && !( newVal instanceof Date ) ) {
		err = new TypeError( 'xMax::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xMax = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = xScale.domain();
	domain = this._xDomain( domain[ 0 ], newVal );

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
		'type': 'change'
	});
	this.fire( 'change', {
		'attr': 'xMax',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xMaxChanged()


// EXPORTS //

module.exports = xMaxChanged;
