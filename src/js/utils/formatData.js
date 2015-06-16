'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// FORMAT DATA //

/**
* FUNCTION: formatData( data )
*	Converts data to standard representation. Needed for non-deterministic accessors.
*
* @param {Array[]} data - array of arrays
* @returns {Array[]} data - array of arrays
*/
function formatData( data ) {
	/* jshint validthis:true */
	var xValue = this.xValue,
		yValue = this.yValue,
		len,
		dataset,
		tmp,
		n,
		out,
		err,
		i, j;

	if ( !isArray( data ) ) {
		err = new TypeError( 'formatData()::invalid input argument. Must provide an array. Value: `' + data + '`.' );
		this.fire( 'err', err );
		return;
	}
	len = data.length;
	out = new Array( len );
	for ( i = 0; i < len; i++ ) {
		dataset = data[ i ];
		if ( !isArray( dataset ) ) {
			err = new TypeError( 'formatData()::invalid input argument. Must provide an array of arrays. Value: `' + data + '`.' );
			this.fire( 'err', err );
			return;
		}
		n = dataset.length;
		tmp = new Array( n );
		for ( j = 0; j < n; j++ ) {
			tmp[ j ] = [
				xValue( dataset[ j ] ),
				yValue( dataset[ j ] )
			];
		}
		out[ i ] = tmp;
	}
	return out;
} // end FUNCTION formatData()


// EXPORTS //

module.exports = formatData;
