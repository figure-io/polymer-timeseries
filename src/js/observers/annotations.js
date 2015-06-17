'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isArrayArray = require( 'validate.io-array-array' );


// OBSERVER //

/**
* FUNCTION: annotationsChanged( newVal, oldVal )
*	Event handler invoked when the `annotations` property changes.
*
* @param {Array[]} newVal - new value
* @param {Array[]} oldVal - old value
*/
function annotationsChanged( newVal, oldVal ) {
	/* jshint validthis: true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isArrayArray( newVal ) && !( isArray( newVal ) && !newVal.length ) ) {
		err = new TypeError( 'annotations::invalid assignment. Must be an array of arrays.' );
		this.fire( 'err', err );
		return;
	}
	if ( !newVal.length && this.$.annotations ) {
		this.$.annotations.remove();
	} else if ( this.autoUpdate ) {
		this._resetAnnotations();
	}
	this.fire( 'annotations', {
		'type': 'change'
	});
	this.fire( 'change', {
		'attr': 'annotations',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION annotationsChanged()


// EXPORTS //

module.exports = annotationsChanged;
