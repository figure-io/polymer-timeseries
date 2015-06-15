'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isArrayArray = require( 'validate.io-array-array' );


// OBSERVER //

/**
* METHOD: annotationsChanged( val[, newVal] )
*	Event handler invoked when the `annotations` property changes.
*
* @param {Array} val - change event value
* @param {Array} [newVal] - new value
*/
function annotationsChanged( val, newVal ) {
	/* jshint validthis: true */
	var arr = this.annotations,
		len,
		err;

	// Determine if we have a new annotations array...
	if ( arguments.length > 1 && !isArray( newVal ) ) {
		err = new TypeError( 'annotations::invalid assignment. Must provide an array. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.annotations = val;
		return;
	}
	len = arr.length;

	// Validate that all array elements are arrays...
	if ( !isArrayArray( arr ) ) {
		err = new TypeError( 'annotations::invalid assignment. Must be an array of arrays.' );
		this.fire( 'err', err );
		return;
	}
	// Do we even have any annotations?
	if ( !len ) {
		if ( this.$.annotations ) {
			this.$.annotations.remove();
		}
		return;
	}
	if ( this.autoUpdate ) {
		this.resetAnnotations();
	}
	this.fire( 'annotations', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'annotations',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'annotations',
			'prev': val,
			'curr': newVal
		});
	}
} // end FUNCTION annotationsChanged()


// EXPORTS //

module.exports = annotationsChanged;
