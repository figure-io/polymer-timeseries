'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// OBSERVER //

/**
* FUNCTION: paddingRightChanged( newVal, oldVal )
*	Event handler invoked when the `padding` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function paddingRightChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var width,
		range,
		err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'paddingRight::invalid assignment. Must be a nonnegative integer. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.paddingRight = oldVal;
		return;
	}
	width = this.width - this.paddingLeft - newVal;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'width', width );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'width', width );

		// [3] Update the x-axis:
		this.$.xAxis.call( this._xAxis );

		// [4] Update the x-label position:
		this.$.xLabel.attr( 'x', width / 2 );

		// [5] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [6] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'change', {
		'attr': 'paddingRight',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION paddingRightChanged()


// EXPORTS //

module.exports = paddingRightChanged;
