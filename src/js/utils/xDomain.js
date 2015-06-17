'use strict';

/**
* FUNCTION: xDomain( min, max )
*	Computes the x-domain.
*
* @param {Null|String|Number|Date} min - minimum value
* @param {Null|String|Number|Date} max - maximum value
* @returns {Array} domain
*/
function xDomain( min, max ) {
	/* jshint validthis:true */
	var d3 = this._d3,
		data = this.data,
		err;

	if ( min !== null ) {
		min = new Date( min ).getTime();
		if ( min !== min ) {
			err = new TypeError( 'xDomain()::invalid input argument. Minimum value must be a valid `Date` object, string, number, or `null`. Value: `' + min + '`.' );
			this.fire( 'err', err );
			return;
		}
	} else {
		min = d3.min( data, function onDataset( dataset ) {
			return d3.min( dataset, function onDatum( d ) {
				return d[ 0 ];
			});
		});
	}
	if ( max !== null ) {
		max = new Date( max ).getTime();
		if ( max !== max ) {
			err = new TypeError( 'xDomain()::invalid input argument. Maximum value must be a valid `Date` object, string, number, or `null`. Value: `' + max + '`.' );
			this.fire( 'err', err );
			return;
		}
	} else {
		max = d3.max( data, function onDataset( dataset ) {
			return d3.max( dataset, function onDatum( d ) {
				return d[ 0 ];
			});
		});
	}
	return [ min, max ];
} // end FUNCTION xDomain()


// EXPORTS //

module.exports = xDomain;
