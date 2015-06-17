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
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( newVal !== null && !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'yNumTicks::invalid assignment. Must be a nonnegative integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yNumTicks = oldVal;
		return;
	}
	this._yAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		this.$.yAxis.call( this._yAxis );
	}
	this.fire( 'changed', {
		'attr': 'yNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yNumTicksChanged()


// EXPORTS //

module.exports = yNumTicksChanged;
