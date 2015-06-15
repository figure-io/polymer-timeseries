'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// OBSERVER //

/**
* FUNCTION: xTickFormatChanged( newVal, oldVal )
*	Event handler invoked when the `xTickFormat` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function xTickFormatChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( !isString( newVal ) ) {
		err = new TypeError( 'xTickFormat::invalid assignment. Must be a string. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xTickFormat = oldVal;
		return;
	}
	this._xTickFormat = this._d3.time.format( newVal );
	xAxis.tickFormat( this._xTickFormat );

	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}
	this.fire( 'changed', {
		'attr': 'xTickFormat',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xTickFormatChanged()


// EXPORTS //

module.exports = xTickFormatChanged;
