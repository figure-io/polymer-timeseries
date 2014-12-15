/**
*
*	VALIDATE: options
*
*
*	DESCRIPTION:
*		- Validates writable stream options.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

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

	if ( typeof options !== 'object' || options === null || Array.isArray( options ) ) {
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
	if ( typeof value !== 'number' || value !== value || value < 0 ) {
		return new TypeError( 'Stream()::invalid input argument. High watermark must be numeric and greater than 0.' );
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
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'Stream()::invalid input argument. objectMode must be a boolean.' );
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
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'Stream()::invalid input argument. decodeStrings must be a boolean.' );
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
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'Stream()::invalid input argument. Delimiter must be a string.' );
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
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'Stream()::invalid input argument. newline separator must be a string.' );
	}
	return null;
} // end FUNCTION newline()


// EXPORTS //

module.exports = validate;
