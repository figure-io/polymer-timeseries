/**
*
*	UTILS: delayed
*
*
*	DESCRIPTION:
*		- Throttles an event listener by delaying its invocation until after all events have finished firing.
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

/**
* FUNCTION: delayed( fcn, delay )
*	Returns a function that fires after the end of an event. A `delay` parameter specifies the interval between when the event was last triggered and when the end listener should be fired (i.e., a form of throttling).
*
* @param {Function} fcn - function to fire at the end of an event
* @param {Number} delay - millisecond delay to impose for function invocation
* @returns {Function} delayed function
*/
function delayed( fcn, delay ) {
	var timeout;
	if ( typeof fcn !== 'function' ) {
		throw new TypeError( 'delayed()::invalid input argument. First argument must be a function.' );
	}
	if ( typeof delay !== 'number' || delay !== delay || delay < 0 ) {
		throw new TypeError( 'delayed()::invalid input argument. Second argument must be a number greater than 0.' );
	}
	return function delayed() {
		var args;
		if ( timeout ) {
			clearTimeout( timeout );
			timeout = setTimeout( later, delay );
		}
		args = arguments;

		// Set a timeout for when the function can be invoked:
		timeout = setTimeout( later, delay );

		function later() {
			timeout = null;
			fcn.apply( null, args );
		}
	};
} // end FUNCTION delayed()


// EXPORTS //

module.exports = delayed;
