'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isStringArray = require( 'validate.io-string-array' );


// OBSERVER //

/**
* FUNCTION: labelsChanged( val[, newVal] )
*	Event handler invoked when the `labels` property changes.
*
* @param {String[]} val - change event value
* @param {String[]} [newVal] - new value
*/
function labelsChanged( val, newVal ) {
	/* jshint validthis: true */
	var labels = this.labels,
		len,
		err;

	// Determine if we have a new label array...
	if ( arguments.length > 1 && !isArray( newVal ) ) {
		err = new TypeError( 'labels::invalid assignment. Must be an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.labels = val;
		return;
	}
	len = labels.length;

	// Validate that all labels are strings...
	if ( !isStringArray( labels ) ) {
		err = new TypeError( 'labels::invalid assignment. Labels must be an array of strings..' );
		this.fire( 'err', err );
		return;
	}
	if ( this.autoUpdate ) {
		// [0] Reset the data labels:
		this.$.paths.attr( 'data-label', this._getLabel );

		// [1] Reset the chart legend:
		this.resetLegend();
	}
	this.fire( 'labels', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'labels',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'labels',
			'prev': val,
			'curr': newVal
		});
	}
} // end FUNCTION labelsChanged()


// EXPORTS //

module.exports = labelsChanged;
