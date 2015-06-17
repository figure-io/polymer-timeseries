'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive' );


// OBSERVER //

/**
* FUNCTION: widthChanged( newVal, oldVal )
*	Event handler invoked when the `width` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function widthChanged( newVal, oldVal ) {
	/* jshint validthis: true */
	var width,
		range,
		err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isPositive( newVal ) ) {
		err = new TypeError( 'width::invalid assignment. Must be a positive number. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.width = oldVal;
		return;
	}
	width = newVal - this.paddingLeft - this.paddingRight;

	// [0] Update the xScale:
	range = [ 0, width ];
	this._xScale.range( range );

	if ( !this.$.canvas ) {
		return;
	}
	if ( this.autoUpdate ) {
		// [1] Update the SVG canvas:
		this.$.canvas.attr( 'width', newVal );

		// [2] Update the background:
		this.$.bkgd.attr( 'width', width );

		// [3] Update the clipPath:
		this.$.clipPath.attr( 'width', width );

		// [4] Update the x-axis:
		this.$.xAxis.call( this._xAxis );

		// [5] Update the x-label position:
		this.$.xLabel.attr( 'x', width / 2 );

		// [6] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [7] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'width', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'width',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION widthChanged()


// EXPORTS //

module.exports = widthChanged;
