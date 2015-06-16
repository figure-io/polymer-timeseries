'use strict';

/**
* FUNCTION: onResize()
*	Resize listener.
*/
function onResize() {
	/* jshint validthis:true */
	this.fire( 'resized', {
		'el': 'polymer-timeseries',
		'msg': 'Received a resize event.',
		'width': this.clientWidth,
		'height': this.clientHeight
	});
	if ( !this.$.canvas ) {
		return;
	}
	this.width = this.clientWidth;
} // end FUNCTION onResize()


// EXPORTS //

module.exports = onResize;
