'use strict';

/**
* FUNCTION: createTitle()
*	Creates the chart title.
*
* @returns {Object} element instance
*/
function createTitle() {
	/* jshint validthis:true */
	if ( this.$.title ) {
		this.$.title.remove();
	}
	this.$.title = this.$.meta.append( 'svg:text' )
		.attr( 'property', 'chart.title' )
		.attr( 'class', 'title noselect' )
		.attr( 'x', 0 )
		.attr( 'y', 0 )
		.text( this.title );

	return this;
} // end FUNCTION createTitle()


// EXPORTS //

module.exports = createTitle;
