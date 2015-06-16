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
	var err;
	if ( newVal !== null && !isNonNegativeInteger( newVal ) ) {
		err = new TypeError( 'xNumTicks::invalid assignment. Must be a nonnegative integer or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xNumTicks = oldVal;
		return;
	}
	this._xAxis.ticks( newVal );
	if ( this.autoUpdate ) {
		this.$.xAxis.call( this._xAxis );
	}
	this.fire( 'changed', {
		'attr': 'xNumTicks',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xNumTicksChanged()


// EXPORTS //

module.exports = xNumTicksChanged;
