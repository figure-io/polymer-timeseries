'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// OBSERVER //

/**
* FUNCTION: xNumTicksChanged( newVal, oldVal )
*	Event handler invoked when the `xNumTicks` property changes.
*
* @param {Number|Null} newVal - new value
* @param {Number|Null} oldVal - old value
*/
function xNumTicksChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( newVal !== null && !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'xNumTicks::invalid assignment. Must be a nonnegative integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xNumTicks = oldVal;
		return;
	}
	xAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}
	this.fire( 'changed', {
		'attr': 'xNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xNumTicksChanged()


// EXPORTS //

module.exports = xNumTicksChanged;
