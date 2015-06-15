'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var OPTS = [
	'bottom',
	'top'
];


// OBSERVER //

/**
* FUNCTION: xAxisOrientChanged( newVal, oldVal )
*	Event handler invoked when the `xAxisOrient` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function xAxisOrientChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.xAxis,
		xAxis = this._xAxis,
		err;

	if ( !isString( newVal ) || !contains( OPTS, newVal ) ) {
		err = new TypeError( 'xAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.xAxisOrient = oldVal;
		return;
	}
	xAxis.orient( newVal );
	if ( this.autoUpdate ) {
		selection.call( xAxis );
	}

	// TODO: this is subtle. As labels, etc may need to change.

	this.fire( 'changed', {
		'attr': 'xAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION xAxisOrientChanged()


// EXPORTS //

module.exports = xAxisOrientChanged;
