'use strict';

/**
* FUNCTION: xValueChanged( newVal, oldVal )
*	Event handler invoked when the `xValue` property changes.
*
* @param {Function} newVal - new value
* @param {Function} oldVal - old value
*/
function xValueChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'xValue::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xValue = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'xValue',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xValueChanged()


// EXPORTS //

module.exports = xValueChanged;
