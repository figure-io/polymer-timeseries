'use strict';

/**
* FUNCTION: onResize( ctx )
*	Wraps a function context and returns a resize listener.
*
* @param {Object} ctx - context
* @returns {Function} resize listener
*/
function onResize( ctx ) {
	/**
	* FUNCTION: onResize()
	*	Resize listener.
	*/
	return function onResize() {
		ctx.fire( 'resized', {
			'el': 'polymer-timeseries',
			'msg': 'Received a resize event.',
			'width': ctx.clientWidth,
			'height': ctx.clientHeight
		});
		if ( !ctx.$.canvas ) {
			return;
		}
		ctx.width = ctx.clientWidth;
	}; // end FUNCTION onResize()
} // end FUNCTION onResize()


// EXPORTS //

module.exports = onResize;
