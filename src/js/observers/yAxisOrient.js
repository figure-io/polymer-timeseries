'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var OPTS = [
	'left',
	'right'
];


// OBSERVER //

/**
* FUNCTION: yAxisOrientChanged( newVal, oldVal )
*	Event handler invoked when the `yAxisOrient` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function yAxisOrientChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.yAxis,
		yAxis = this._yAxis,
		err;

	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isString( newVal ) || !contains( OPTS, newVal ) ) {
		err = new TypeError( 'yAxisOrient::invalid assignment. Must be one of the following: `' + OPTS.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.yAxisOrient = oldVal;
		return;
	}
	yAxis.orient( newVal );
	if ( this.autoUpdate ) {
		selection.call( yAxis );
	}

	// TODO: this is subtle. As labels, etc may need to change.

	this.fire( 'changed', {
		'attr': 'yAxisOrient',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION yAxisOrientChanged()


// EXPORTS //

module.exports = yAxisOrientChanged;

