'use strict';

// MODULES //

var isStringArray = require( 'validate.io-string-array' ),
	isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var COLORS = require( './../colors' );


// OBSERVER //

/**
* FUNCTION: colorsChanged( newVal, oldVal )
*	Event handler invoked when the `colors` property changes.
*
* @param {String|Array} newVal - new value
* @param {String|Array} oldVal - old value
*/
function colorsChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var oldColors = this._colors,
		symbols,
		color,
		list,
		err,
		el,
		i, j;

	if ( oldVal === void 0 ) {
		return;
	}
	if ( isString( newVal ) ) {
		if ( !contains( COLORS.colors, newVal ) ) {
			err = new TypeError( 'colors::invalid assignment. Unrecognized color set. Value: `' + newVal + '`.' );
			this.fire( 'err', err );
			this.colors = oldVal;
			return;
		}
		this._colors = COLORS[ newVal ];
	}
	else if ( isStringArray( newVal ) ) {
		this._colors = newVal;
	}
	else {
		err = new TypeError( 'colors::invalid assignment. Must be an `array` of classes or a recognized color set. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.colors = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'data-color', this._getColor );

		// Set the color of all symbols...
		symbols = this.$.legendSymbols;
		for ( i = 0; i < symbols.length; i++ ) {
			el = symbols[ i ][ 0 ];
			if ( !el ) {
				continue;
			}
			color = oldColors[ i ];

			// Remove any existing color class...
			list = el.classList;
			for ( j = 0; j < list.length; j++ ) {
				if ( list[j] === color ) {
					el.classList.remove( list[j] );
				}
			}
			// Add the new color class:
			el.classList.add( this._getColor( null, i ) + '-span' );
		}
	}
	this.fire( 'colors', {
		'type': 'change'
	});
	this.fire( 'change', {
		'attr': 'colors',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION colorsChanged()


// EXPORTS //

module.exports = colorsChanged;
