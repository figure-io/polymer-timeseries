'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' );


// OBSERVER //

/**
* FUNCTION: isDraggableChanged( newVal, oldVal )
*	Event handler invoked when the `isDraggable` property changes.
*
* @param {Boolean} newVal - new value
* @param {Boolean} oldVal - old value
*/
function isDraggableChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isBoolean( newVal ) ) {
		err = new TypeError( 'isDraggable::invalid assignment. Must be a boolean primitive.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.isDraggable = oldVal;
		return;
	}
	this.$.legendEntries.attr( 'draggable', newVal );
	this.fire( 'changed', {
		'attr': 'isDraggable',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION isDraggableChanged()


// EXPORTS //

module.exports = isDraggableChanged;
