'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isPositive = require( 'validate.io-positive' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isString = require( 'validate.io-string-primitive' );


// VARIABLES //

var validators = {
	'highWaterMark': highWaterMark,
	'objectMode': objectMode,
	'decodeStrings': decodeStrings,
	'delimiter': delimiter,
	'newline': newline
};


// FUNCTIONS //

/**
* FUNCTION: validate( options )
*	Validates stream options.
*
* @private
* @param {Object} options - Readable stream options
* @returns {Null|TypeError} null if valid or TypeError if invalid
*/
function validate( options ) {
	var validator,
		keys,
		key,
		err;

	if ( !isObject( options ) ) {
		return new TypeError( 'Stream()::invalid input argument. Options must be an object.' );
	}
	keys = Object.keys( options );
	for ( var i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		validator = validators[ key ];
		err = validator( options[key] );
		if ( err ) {
			return err;
		}
	}
	return null;
} // end FUNCTION validate()

/**
* FUNCTION: highWaterMark( value )
*	Validates the stream high watermark option.
*
* @private
* @param {Number} value - stream high watermark
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function highWaterMark( value ) {
	if ( !isPositive( value ) ) {
		return new TypeError( 'Stream()::invalid input argument. High watermark must be a positive number.' );
	}
	return null;
} // end FUNCTION highWaterMark()

/**
* FUNCTION: objectMode( value )
*	Validates the stream objectMode option.
*
* @private
* @param {Boolean} value - stream objectMode option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function objectMode( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'Stream()::invalid input argument. objectMode must be a boolean primitive.' );
	}
	return null;
} // end FUNCTION objectMode()

/**
* FUNCTION: decodeStrings( value )
*	Validates the stream decodeStrings option.
*
* @private
* @param {Boolean} value - decodeStrings option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function decodeStrings( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'Stream()::invalid input argument. decodeStrings must be a boolean primitive.' );
	}
	return null;
} // end FUNCTION decodeStrings()

/**
* FUNCTION: delimiter( value )
*	Validates the stream delimiter option.
*
* @private
* @param {String} value - delimiter option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function delimiter( value ) {
	if ( !isString( value ) ) {
		return new TypeError( 'Stream()::invalid input argument. Delimiter must be a string primitive.' );
	}
	return null;
} // end FUNCTION delimiter()

/**
* FUNCTION: newline( value )
*	Validates the stream newline option.
*
* @private
* @param {String} value - newline option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function newline( value ) {
	if ( !isString( value ) ) {
		return new TypeError( 'Stream()::invalid input argument. newline separator must be a string primitive.' );
	}
	return null;
} // end FUNCTION newline()


// EXPORTS //

module.exports = validate;
