'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// FORMAT ANNOTATIONS //

/**
* FUNCTION: formatAnnotations( arr )
*	Converts an array of annotations to standard representation. Needed for non-deterministic accessors.
*
* @param {Array} arr - array of annotations
* @returns {Array} annotations - array of annotations in standard format
*/
function formatAnnotations( arr ) {
	/* jshint validthis:true */
	var xValue = this.xValue,
		aValue = this.aValue,
		len,
		out,
		err;

	if ( !isArray( arr ) ) {
		err = new TypeError( 'formatAnnotations()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
		this.fire( 'err', err );
		return;
	}
	len = arr.length;
	out = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		out[ i ] = [
			xValue( arr[ i ] ),
			aValue( arr[ i ] )
		];
	}
	return out;
} // end FUNCTION formatAnnotations()


// EXPORTS //

module.exports = formatAnnotations;
