'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' );


// OBSERVER //

/**
* FUNCTION: autoUpdateChanged( newVal, oldVal )
*	Event handler invoked when the `autoUpdate` property changes.
*
* @param {Boolean} newVal - new value
* @param {Boolean} oldVal - old value
*/
function autoUpdateChanged( newVal, oldVal ) {
	/* jshint validthis: true */
	var err;
	if ( !isBoolean( newVal ) ) {
		err = new TypeError( 'autoUpdate::invalid assignment. Must be a boolean primitive.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.autoUpdate = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'autoUpdate',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION autoUpdateChanged()


// EXPORTS //

module.exports = autoUpdateChanged;
