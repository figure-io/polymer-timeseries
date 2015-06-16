'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// OBSERVER //

/**
* FUNCTION: yTickFormatChanged( newVal, oldVal )
*	Event handler invoked when the `yTickFormat` property changes.
*
* @param {String|Null} newVal - new value
* @param {String|Null} oldVal - old value
*/
function yTickFormatChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( !isString( newVal ) && newVal !== null ) {
		err = new TypeError( 'yTickFormat::invalid assignment. Must be either a string or null. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yTickFormat = oldVal;
		return;
	}
	if ( newVal !== null ) {
		this._yTickFormat = this._d3.format( newVal );
	} else {
		this._yTickFormat = null;
	}
	this._yAxis.tickFormat( this._yTickFormat );
	if ( this.autoUpdate ) {
		this.$.yAxis.call( this._yAxis );
	}
	this.fire( 'changed', {
		'attr': 'yTickFormat',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yTickFormatChanged()


// EXPORTS //

module.exports = yTickFormatChanged;
