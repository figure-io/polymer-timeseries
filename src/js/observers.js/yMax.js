'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// OBSERVER //

/**
* FUNCTION: yMaxChanged( newVal, oldVal )
*	Event handler invoked when the `yMax` property changes.
*
* @param {Null|Number} newVal - new value
* @param {Null|Number} oldVal - old value
*/
function yMaxChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var yScale = this._yScale,
		domain = yScale.domain(),
		err;

	if ( newVal !== null && !isNumber( newVal ) ) {
		err = new TypeError( 'yMax::invalid assignment. Must be numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yMax = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = this.yDomain( domain[ 0 ], newVal );

	// [1] Update the yScale:
	yScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the yAxis:
		this.$.yAxis.call( this._yAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );
	}
	this.fire( 'yMax', {
		'type': 'changed'
	});
	this.fire( 'changed', {
		'attr': 'yMax',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yMaxChanged()


// EXPORTS //

module.exports = yMaxChanged;
