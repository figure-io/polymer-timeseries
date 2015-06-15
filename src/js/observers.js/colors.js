'use strict';

// MODULES //

var isStringArray = require( 'validate.io-string-array' ),
	isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' );


// VARIABLES //

var OPTS = {};

// See [D3 documentation]{@link https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10}.
OPTS.colors = [
	'category10',
	'category20',
	'category20b',
	'category20c'
];

OPTS.category10 = [
	'category10-1',
	'category10-2',
	'category10-3',
	'category10-4',
	'category10-5',
	'category10-6',
	'category10-7',
	'category10-8',
	'category10-9',
	'category10-10'
];

OPTS.category20 = [
	'category20-1',
	'category20-2',
	'category20-3',
	'category20-4',
	'category20-5',
	'category20-6',
	'category20-7',
	'category20-8',
	'category20-9',
	'category20-10',
	'category20-11',
	'category20-12',
	'category20-13',
	'category20-14',
	'category20-15',
	'category20-16',
	'category20-17',
	'category20-18',
	'category20-19',
	'category20-20'
];

OPTS.category20b = [
	'category20b-1',
	'category20b-2',
	'category20b-3',
	'category20b-4',
	'category20b-5',
	'category20b-6',
	'category20b-7',
	'category20b-8',
	'category20b-9',
	'category20b-10',
	'category20b-11',
	'category20b-12',
	'category20b-13',
	'category20b-14',
	'category20b-15',
	'category20b-16',
	'category20b-17',
	'category20b-18',
	'category20b-19',
	'category20b-20'
];

OPTS.category20c = [
	'category20c-1',
	'category20c-2',
	'category20c-3',
	'category20c-4',
	'category20c-5',
	'category20c-6',
	'category20c-7',
	'category20c-8',
	'category20c-9',
	'category20c-10',
	'category20c-11',
	'category20c-12',
	'category20c-13',
	'category20c-14',
	'category20c-15',
	'category20c-16',
	'category20c-17',
	'category20c-18',
	'category20c-19',
	'category20c-20'
];


// OBSERVER //

/**
* FUNCTION: colorsChanged( val[, newVal] )
*	Event handler invoked when the `colors` property changes.
*
* @param {String|Array} val - change event value
* @param {String|Array} [newVal] - new value
*/
function colorsChanged( newVal, val ) {
	/* jshint validthis:true */
	var getColor = this._getColor,
		oldColors = this._colors,
		list,
		symbols,
		el,
		err,
		color,
		i, j;

	if ( arguments.length > 1 ) {
		if ( isString( newVal ) ) {
			if ( !contains( OPTS.colors, newVal ) ) {
				err = new TypeError( 'colors::invalid assignment. Unrecognized color set. Value: `' + newVal + '`.' );
				this.fire( 'err', err );
				this.colors = val;
				return;
			}
			this._colors = OPTS[ newVal ];
		}
		else if ( isStringArray( newVal ) ) {
			this._colors = newVal;
		}
		else {
			err = new TypeError( 'colors::invalid assignment. Must be an `array` of classes or a recognized color set. Value: `' + newVal + '`.' );
			this.fire( 'err', err );
			this.colors = val;
			return;
		}
	}
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'data-color', getColor );

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
			el.classList.add( getColor( null, i ) + '-span' );
		}
	}
	this.fire( 'colors', {
		'type': 'changed'
	});
	if ( newVal === void 0 ) {
		this.fire( 'changed', {
			'attr': 'colors',
			'data': val[ 0 ]
		});
	} else {
		this.fire( 'changed', {
			'attr': 'colors',
			'prev': val,
			'curr': newVal
		});
	}
} // end FUNCTION colorsChanged()


// EXPORTS //

module.exports = colorsChanged;
