'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	Stream = require( './stream.js' );


// STREAM //

/**
* FUNCTION: stream( [options])
*	Returns a writable stream.
*
* @param {Object} [options] - Writable stream options
* @returns {Stream} Stream instance
*/
function stream( options ) {
	/* jshint validthis:true */
	var self = this,
		opts = {},
		err;
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			err = new TypeError( 'stream()::invalid input argument. Options must be an object.' );
			this.fire( 'err', err );
			return;
		}
		opts = options;
	}
	this._stream = new Stream( onData, opts );
	return this._stream;

	function onData( error, arr ) {
		/* jshint validthis: true */
		if ( error ) {
			self.fire( 'err', error );
			return;
		}
		// TODO: call update function
		// TODO: change event name to something other than 'data'; 'data' is already used.
		self.fire( 'data', arr );
	}
} // end FUNCTION stream()


// EXPORTS //

module.exports = stream;
