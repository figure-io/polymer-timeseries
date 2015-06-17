'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// OBSERVER //

/**
* FUNCTION: xLabelChanged( newVal, oldVal )
*	Event handler invoked when the `xLabel` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function xLabelChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isString( newVal ) ) {
		err = new TypeError( 'xlabel::invalid assignment. Must be a string primitive. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xLabel = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.xLabel.text( newVal );
	}
	this.fire( 'change', {
		'attr': 'xLabel',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xLabelChanged()


// EXPORTS //

module.exports = xLabelChanged;
