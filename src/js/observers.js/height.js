'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive' );


// OBSERVER //

/**
* METHOD: heightChanged( newVal, oldVal )
*	Event handler invoked when the `height` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function heightChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var range,
		height,
		err;
	if ( !isPositive( newVal ) ) {
		err = new TypeError( 'height::invalid assignment. Must be a positive number. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.height = oldVal;
		return;
	}
	height = newVal - this.paddingTop - this.paddingBottom;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( !this.$.canvas ) {
		return;
	}
	if ( this.autoUpdate ) {
		// [1] Update the SVG canvas:
		this.$.canvas.attr( 'height', newVal );

		// [2] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [3] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [4] Update the x-axis:
		this.$.xAxis.attr( 'transform', 'translate(0,' + height + ')' );

		// [5] Update the y-axis:
		this.$.yAxis.call( this._yAxis );

		// [6] Update the y-label position:
		this.$.yLabel.attr( 'x', -height / 2 );

		// [7] Update the paths:
		this.$.paths.attr( 'd', this._line );

		// [8] Update the annotations:
		this.$.annotationMarkers.attr( 'd', this._triangle );
		this.$.annotationLines.attr( 'd', this._vline );
	}
	this.fire( 'height', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'height',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION heightChanged()


// EXPORTS //

module.exports = heightChanged;
