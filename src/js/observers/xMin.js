'use strict';

/**
* FUNCTION: xMinChanged( newVal, oldVal )
*	Event handler invoked when the `xMin` property changes.
*
* @param {Null|Number} newVal - new value
* @param {Null|Number} oldVal - old value
*/
function xMinChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var xScale = this._xScale,
		domain,
		err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( newVal !== null && !( newVal instanceof Date ) ) {
		err = new TypeError( 'xMin::invalid assignment. Must be a `Date` object or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xMin = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = xScale.domain();
	domain = this._xDomain( newVal, domain[ 1 ] );

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
	this.fire( 'xMin', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'xMin',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xMinChanged()


// EXPORTS //

module.exports = xMinChanged;
