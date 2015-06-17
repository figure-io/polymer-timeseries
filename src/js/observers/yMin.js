'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// OBSERVER //

/**
* FUNCTION: yMinChanged( newVal, oldVal )
*	Event handler invoked when the `yMin` property changes.
*
* @param {Null|Number} newVal - new value
* @param {Null|Number} oldVal - old value
*/
function yMinChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var yScale = this._yScale,
		domain,
		err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( newVal !== null && !isNumber( newVal ) ) {
		err = new TypeError( 'yMin::invalid assignment. Must be a numeric or `null`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yMin = oldVal;
		return;
	}
	// [0] Update the domain:
	domain = yScale.domain();
	domain = this._yDomain( newVal, domain[ 1 ] );

	// [1] Update the yScale:
	yScale.domain( domain );

	if ( this.autoUpdate ) {
		// [2] Update the yAxis:
		this.$.yAxis.call( this._yAxis );

		// [3] Update the paths:
		this.$.paths.attr( 'd', this._line );
	}
	this.fire( 'yMin', {
		'type': 'change'
	});
	this.fire( 'change', {
		'attr': 'yMin',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yMinChanged()


// EXPORTS //

module.exports = yMinChanged;
