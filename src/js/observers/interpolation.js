'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var OPTS = [
	'linear',
	// 'linear-closed',
	'step',
	'step-before',
	'step-after',
	'basis',
	'basis-open',
	// 'basis-closed',
	'bundle',
	'cardinal',
	'cardinal-open',
	// 'cardinal-closed',
	'monotone'
];


// OBSERVER //

/**
* FUNCTION: interpolationChanged( newVal, oldVal )
*	Event handler invoked when the `interpolation` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function interpolationChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isString( newVal ) || !contains( OPTS, newVal ) ) {
		err = new TypeError( 'intepolation::invalid assignment. Must be one of the following: `' + OPTS.join( ',' ) + '`. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.interpolation = oldVal;
		return;
	}
	this._line.interpolate( newVal );
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'd', this._line );
	}
	this.fire( 'change', {
		'attr': 'interpolation',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION interpolationChanged()


// EXPORTS //

module.exports = interpolationChanged;
