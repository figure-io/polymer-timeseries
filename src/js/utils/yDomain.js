'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// Y-DOMAIN //

/**
* FUNCTION: yDomain( min, max )
*	Computes the y-domain.
*
* @param {Null|Number} min - minimum value
* @param {Null|Number} max - maximum value
* @returns {Array} domain
*/
function yDomain( min, max ) {
	/* jshint validthis:true */
	var d3 = this._d3,
		data = this.data,
		err;

	if ( min !== null && !isNumber( min ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Minimum value must be numeric or `null`. Value: `' + min + '`.' );
		this.fire( 'err', err );
		return;
	}
	if ( max !== null && !isNumber( max ) ) {
		err = new TypeError( 'yDomain()::invalid input argument. Maximum value must be numeric or `null`. Value: `' + max + '`.' );
		this.fire( 'err', err );
		return;
	}
	if ( min === null ) {
		min = d3.min( data, function onDataset( dataset ) {
			return d3.min( dataset, function onDatum( d ) {
				return d[ 1 ];
			});
		});
	}
	if ( max === null ) {
		max = d3.max( data, function onDataset( dataset ) {
			return d3.max( dataset, function onDatum( d ) {
				return d[ 1 ];
			});
		});
	}
	return [ min, max ];
} // end FUNCTION yDomain()


// EXPORTS //

module.exports = yDomain;
