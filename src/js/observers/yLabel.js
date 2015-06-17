'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// OBSERVER //

/**
* FUNCTION: yLabelChanged( newVal, oldVal )
*	Event handler invoked when the `yLabel` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function yLabelChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isString( newVal ) ) {
		err = new TypeError( 'yLabel::invalid assignment. Must be a string primitive. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yLabel = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.yLabel.text( newVal );
	}
	this.fire( 'change', {
		'attr': 'yLabel',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yLabelChanged()


// EXPORTS //

module.exports = yLabelChanged;
