'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// OBSERVER //

/**
* FUNCTION: yNumTicksChanged( newVal, oldVal )
*	Event handler invoked when the `yNumTicks` property changes.
*
* @param {Number|Null} newVal - new value
* @param {Number|Null} oldVal - old value
*/
function yNumTicksChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( newVal !== null && !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'yNumTicks::invalid assignment. Must be a nonnegative integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yNumTicks = oldVal;
		return;
	}
	yAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		selection.call( yAxis );
	}
	this.fire( 'changed', {
		'attr': 'yNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yNumTicksChanged()


// EXPORTS //

module.exports = yNumTicksChanged;
