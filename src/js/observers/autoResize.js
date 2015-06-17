/* global window */
'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' );


// OBSERVER //

/**
* FUNCTION: autoResizeChanged( newVal, oldVal )
*	Event handler invoked when the `autoResize` property changes.
*
* @param {Boolean} newVal - new value
* @param {Boolean} oldVal - old value
*/
function autoResizeChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isBoolean( newVal ) ) {
		err = new TypeError( 'autoResize::invalid assignment. Must be a boolean primitive.  Value: `' + newVal + '.' );
		this.fire( 'err', err );
		this.autoResize = oldVal;
		return;
	}
	if ( newVal ) {
		window.addEventListener( 'resize', this._onResize, false );
	} else {
		window.removeEventListener( 'resize', this._onResize );
	}
	this.fire( 'change', {
		'attr': 'autoResize',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION autoResizeChanged()


// EXPORTS //

module.exports = autoResizeChanged;
