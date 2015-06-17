'use strict';

/**
* FUNCTION: yValueChanged( newVal, oldVal )
*	Event handler invoked when the `yValue` property changes.
*
* @param {Function} newVal - new value
* @param {Function} oldVal - old value
*/
function yValueChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'yValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yValue = oldVal;
		return;
	}
	this.fire( 'change', {
		'attr': 'yValue',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yValueChanged()


// EXPORTS //

module.exports = yValueChanged;
