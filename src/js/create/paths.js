'use strict';

/**
* FUNCTION: createPaths()
*	Creates graph path elements.
*
* @returns {Object} context
*/
function createPaths() {
	/* jshint validthis:true */

	// Remove any existing marks...
	if ( this.$.marks ) {
		this.$.marks.remove();
	}
	// Create a `marks` group:
	this.$.marks = this.$.graph.append( 'svg:g' )
		.attr( 'property', 'marks' )
		.attr( 'class', 'marks' )
		.attr( 'clip-path', 'url(#' + this._clipPathID + ')' );

	// Add paths:
	this.$.paths = this.$.marks.selectAll( '.line' )
		.data( this.data )
		.enter()
		.append( 'svg:path' )
			.attr( 'property', 'line timeseries' )
			.attr( 'class', 'line' )
			.attr( 'data-label', this._getLabel )
			.attr( 'data-color', this._getColor )
			.attr( 'd', this._line );

	return this;
} // end FUNCTION createPaths()


// EXPORTS //

module.exports = createPaths;
