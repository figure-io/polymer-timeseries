/**
*
*	COMPONENT: stream
*
*
*	DESCRIPTION:
*		- Defines the component stream interface.
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

// MODULES //

var Writable = require( 'readable-stream' ).Writable,
	nextTick = require( 'next-tick' ),
	validate = require( './validate.js' );


// VARIABLES //

var isUnix = /^\d{10}$/,
	isTimestamp = /^\d{13}$/,
	isArray = /^\[{3}.+\]{3}$/;


// FUNCTIONS //

/**
* FUNCTION: copyOptions( options )
*	Copies relevant stream options into a new object.
*
* @private
* @param {Object} options - stream options
* @returns {Object} options copy
*/
function copyOptions( options ) {
	var props = [
			'objectMode',
			'highWaterMark',
			'decodeStrings',
			'delimiter',
			'newline'
		],
		copy = {},
		prop;

	for ( var i = 0; i < props.length; i++ ) {
		prop = props[ i ];
		if ( options.hasOwnProperty( prop ) ) {
			copy[ prop ] = options[ prop ];
		}
	}
	return copy;
} // end FUNCTION copyOptions()

/**
* FUNCTION: setOptions( options )
*	Sets stream specific options.
*
* @private
* @param {Object} options - stream options
*/
function setOptions( options ) {
	if ( !options.hasOwnProperty( 'objectMode' ) ) {
		options.objectMode = false;
	}
	if ( !options.hasOwnProperty( 'delimiter' ) ) {
		options.delimiter = ',';
	}
	if ( !options.hasOwnProperty( 'newline' ) ) {
		options.newline = '\n';
	}
} // end FUNCTION setOptions()

/**
* FUNCTION: isBuffer( chunk )
*	Checks if a chunk is a buffer via duck-typing. (NOTE: chunks emitted from a readable stream are not considered `buffers` by the browserify-buffer module due to `instanceof chunk !== Buffer`, despite a chunk being a Buffer. To address this, duck type based on known `buffer` methods.)
*
* @private
* @returns {Boolean} boolean indicating if a chunk is a Buffer instance
*/
function isBuffer( chunk ) {
	if ( Buffer.isBuffer( chunk ) ) {
		return true;
	}
	return ( typeof chunk.offset === 'number' && typeof chunk.get === 'function' && typeof chunk.readDoubleBE === 'function' && typeof chunk.readInt32BE === 'function' );
} // end FUNCTION isBuffer()


// STREAM //

/**
* FUNCTION: Stream( clbk[, options] )
*	Writable stream constructor.
*
* @constructor
* @param {Function} clbk - callback invoked upon receiving data
* @param {Object} [options] - Writable stream options
* @param {Number} [options.highWaterMark] - stream high watermark
* @param {Boolean} [options.objectMode] - whether the stream should operate in objectMode
* @param {Boolean} [option.decodeStrings] - whether the stream should decode strings back into buffers
* @param {String} [options.delimiter] - delimiter separating timeseries values
* @param {String} [options.newline] - delimiter separating values associated with separate timestamps
* @returns {Stream} Writable stream
*/
function Stream( clbk, options ) {
	var err;
	if ( !arguments.length ) {
		throw new Error( 'Stream()::insufficient input arguments. Must provide a callback.' );
	}
	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'Stream()::invalid input argument. Callback must be a function.' );
	}
	if ( arguments.length < 2 ) {
		options = {};
	}
	if ( !( this instanceof Stream ) ) {
		return new Stream( clbk, options );
	}
	err = validate( options );
	if ( err ) {
		throw err;
	}
	setOptions( options );
	Writable.call( this, options );
	this._clbk = clbk;
	this._mode = options.objectMode;
	this._delimiter = options.delimiter;
	this._newline = options.newline;
	this._destroyed = false;

	return this;
} // end FUNCTION Stream()

/**
* Create a prototype which inherits from the parent prototype.
*/
Stream.prototype = Object.create( Writable.prototype );

/**
* Set the constructor.
*/
Stream.prototype.constructor = Stream;

/**
* METHOD: _write( chunk, encoding, clbk )
*	Implements the `_write` method to accept input.
*
* @private
* @param {Buffer|String} chunk - the chunk to be written
* @param {String} encoding - chunk encoding
* @param {Function} clbk - callback invoked after writing a chunk
*/
Stream.prototype._write = function( chunk, encoding, clbk ) {
	var err = null,
		arr,
		val,
		sep,
		len,
		ts,
		i, j, N;

	if ( isBuffer( chunk ) ) {
		chunk = chunk.toString();
	}
	// [0] Object mode...
	if ( this._mode ) {
		if ( !Array.isArray( chunk ) ) {
			err = new TypeError( 'cannot stream non-arrays in objectMode. Chunk: `' + chunk + '`.' );
			this._clbk( err );
		} else {
			this._clbk( null, chunk );
		}
		clbk();
		return;
	}
	// [1] Stringified array...
	if ( isArray.test( chunk ) ) {
		try {
			chunk = JSON.parse( chunk );
			this._clbk( null, chunk );
		} catch ( e ) {
			err = new Error( 'unable to parse stream data as JSON array. Chunk: `' + chunk + '`.' );
			this._clbk( err );
		}
		clbk();
		return;
	}
	// [2] Parse string and convert to an array of array of arrays (i.e., multiple timeseries)...

	// Split based on timestamps:
	chunk = chunk.split( this._newline );
	len = chunk.length;

	// Split into separate timeseries:
	sep = this._delimiter;

	val = chunk[ 0 ].split( sep );
	N = val.length - 1;

	if ( !N ) {
		err = new Error( 'invalid stream data. Chunk: `' + chunk + '`.' );
		this._clbk( err );
		clbk();
		return;
	}
	arr = new Array( N );

	// Initialize the timeseries arrays...
	for ( i = 0; i < N; i++ ) {
		arr[ i ] = new Array( len );
	}

	// Handle the first value for each time series since we have already split into separate values...
	ts = val[ 0 ];
	if ( isUnix.test( ts ) ) {
		// Convert to milliseconds:
		ts = parseInt( ts, 10 ) * 1000;
	} else if ( isTimestamp.test( ts ) ) {
		ts = parseInt( ts, 10 );
	}
	for ( i = 0; i < N; i++ ) {
		// Force type conversion via `+` operator:
		arr[ i ][ 0 ] = [ ts, +val[i+1] ];
	}
	for ( j = 1; j < len; j++ ) {
		val = chunk[ j ].split( sep );
		ts = val[ 0 ];
		if ( isUnix.test( ts ) ) {
			ts = parseInt( ts, 10 ) * 1000;
		} else if ( isTimestamp.test( ts ) ) {
			ts = parseInt( ts, 10 );
		}
		for ( i = 0; i < N; i++ ) {
			arr[ i ][ j ] = [ ts, +val[i+1] ];
		}
	}
	this._clbk( null, arr );
	clbk();
}; // end METHOD _write()

/**
* METHOD: destroy( [error] )
*	Gracefully destroys a stream, providing backwards compatibility.
*
* @param {Object} [error] - error message
* @returns {Stream} Stream instance
*/
Stream.prototype.destroy = function( error ) {
	if ( this._destroyed ) {
		return;
	}
	var self = this;
	this._destroyed = true;
	nextTick( function destroy() {
		if ( error ) {
			self.emit( 'error', error );
		}
		self.emit( 'close' );
	});
	return this;
}; // end METHOD destroy()


// OBJECT MODE //

/**
* FUNCTION: objectMode( clbk[, options] )
*	Returns a stream with `objectMode` set to `true`.
*
* @param {Function} clbk - callback invoked upon receiving data
* @param {Object} [options] - Writable stream options
* @returns {Stream} Writable stream
*/
function objectMode( clbk, options ) {
	if ( arguments.length < 2 ) {
		options = {};
	}
	options.objectMode = true;
	return new Stream( clbk, options );
} // end FUNCTION objectMode()


// FACTORY //

/**
* FUNCTION: streamFactory( [options] )
*	Creates a reusable stream factory.
*
* @param {Object} [options] - Writable stream options
* @returns {Function} stream factory
*/
function streamFactory( options ) {
	if ( !arguments.length ) {
		options = {};
	}
	options = copyOptions( options );
	/**
	* FUNCTION: createStream( clbk )
	*	Creates a stream.
	*
	* @param {Function} clbk - callback to be invoked upon receiving data
	* @returns {Stream} Writable stream
	*/
	return function createStream( clbk ) {
		return new Stream( clbk, options );
	};
} // end METHOD streamFactory()


// EXPORTS //

module.exports = Stream;
module.exports.objectMode = objectMode;
module.exports.factory = streamFactory;
