'use strict';

// MODULES //

var isStringArray = require( 'validate.io-string-array' );


// OBSERVER //

/**
* FUNCTION: labelsChanged( newVal, oldVal )
*	Event handler invoked when the `labels` property changes.
*
* @param {String[]} newVal - new value
* @param {String[]} oldVal - old value
*/
function labelsChanged( newVal, oldVal ) {
	/* jshint validthis: true */
	var err;
	if ( !isStringArray( newVal ) ) {
		err = new TypeError( 'labels::invalid assignment. Labels must be an array of strings..' );
		this.fire( 'err', err );
		return;
	}
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'data-label', this._getLabel );

		this.resetLegend();
	}
	this.fire( 'labels', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'labels',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION labelsChanged()


// EXPORTS //

module.exports = labelsChanged;
