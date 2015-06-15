'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// OBSERVER //

/**
* FUNCTION: paddingTopChanged( newVal, oldVal )
*	Event handler invoked when the `paddingTop` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function paddingTopChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var height,
		range,
		err;

	if ( !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'paddingTop::invalid assignment. Must be an integer greater than or equal to 0.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.paddingTop = oldVal;
		return;
	}
	height = this.height - newVal - this.paddingBottom;

	// [0] Update the yScale:
	range = [ height, 0 ];
	this._yScale.range( range );

	if ( this.autoUpdate ) {
		// [1] Update the background:
		this.$.bkgd.attr( 'height', height );

		// [2] Update the clipPath:
		this.$.clipPath.attr( 'height', height );

		// [3] Update the graph:
		this.$.graph.attr( 'transform', 'translate(' + this.paddingLeft + ',' + newVal + ')' );

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
	this.fire( 'changed', {
		'attr': 'paddingTop',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION paddingTopChanged()


// EXPORTS //

module.exports = paddingTopChanged;
