'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// OBSERVER //

/**
* FUNCTION: paddingBottomChanged( newVal, oldVal )
*	Event handler invoked when the `paddingBottom` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function paddingBottomChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var height,
		range,
		err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'paddingBottom::invalid assignment. Must be a nonnegative integer. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.paddingBottom = oldVal;
		return;
	}
	height = this.height - this.paddingTop - newVal;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [3] Update the x-axis:
		this.$.xAxis.attr( 'transform', 'translate(0,' + height + ')' );

		// [4] Update the y-axis:
		this.$.yAxis.call( this._yAxis );

		// [5] Update the y-label position:
		this.$.yLabel.attr( 'x', -height / 2 );

		// [6] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [7] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'change', {
		'attr': 'paddingBottom',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION paddingBottomChanged()


// EXPORTS //

module.exports = paddingBottomChanged;
