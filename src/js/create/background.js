'use strict';

/**
* FUNCTION: createBackground()
*	Creates a background element.
*
* @returns {Object} context
*/
function createBackground() {
	/* jshint validthis:true */
	// Remove any existing background...
	if ( this.$.bkgd ) {
		this.$.bkgd.remove();
	}
	this.$.bkgd = this.$.graph.append( 'svg:rect' )
		.attr( 'class', 'background' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.attr( 'width', this._graphWidth() )
		.attr( 'height', this._graphHeight() );

	return this;
} // end FUNCTION createBackground()


// EXPORTS //

module.exports = createBackground;
