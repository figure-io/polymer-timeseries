'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' );


// OBSERVER //

/**
* FUNCTION: isDroppableChanged( newVal, oldVal )
*	Event handler invoked when the `isDroppable` property changes.
*
* @param {Boolean} newVal - new value
* @param {Boolean} oldVal - old value
*/
function isDroppableChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isBoolean( newVal ) ) {
		err = new TypeError( 'isDroppable::invalid assignment. Must be a boolean primitive.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.isDroppable = oldVal;
		return;
	}
	this.fire( 'changed', {
		'attr': 'isDroppable',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION isDroppableChanged()


// EXPORTS //

module.exports = isDroppableChanged;
