'use strict';

/**
* FUNCTION: aValueChanged( newVal, oldVal )
*	Event handler invoked when the `aValue` property changes.
*
* @param {Function} newVal - new value
* @param {Function} oldVal - old value
*/
function aValueChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'aValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.aValue = oldVal;
		return;
	}
	this.fire( 'change', {
		'attr': 'aValue',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION aValueChanged()


// EXPORTS //

module.exports = aValueChanged;
