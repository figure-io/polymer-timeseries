'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// OBSERVER //

/**
* FUNCTION: tensionChanged( newVal, oldVal )
*	Event handler invoked when the `tension` property changes.
*
* @param {Number} newVal - new value
* @param {Number} oldVal - old value
*/
function tensionChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( !isNumber( newVal ) ) {
		err = new TypeError( 'tension::invalid assignment. Must be a number primitive. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.tension = oldVal;
		return;
	}
	this._line.tension( newVal );
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'd', this._line );
	}
	this.fire( 'change', {
		'attr': 'tension',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION tensionChanged()


// EXPORTS //

module.exports = tensionChanged;
