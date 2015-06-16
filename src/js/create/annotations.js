'use strict';

/**
* FUNCTION: createAnnotations()
*	Creates chart annotations.
*
* @returns {Object} context
*/
function createAnnotations() {
	/* jshint validthis:true */
	var gEnter;

	if ( this.$.agroup ) {
		this.$.agroup.remove();
	}
	this.$.agroup = this.$.graph.append( 'svg:g' )
		.attr( 'class', 'annotations' )
		.attr( 'property', 'annotations' );

	gEnter = this.$.agroup.selectAll( '.annotation' )
		.data( this.annotations )
		.enter().append( 'svg:g' )
			.attr( 'class', 'annotation' )
			.attr( 'property', 'annotation' );
	this.$.annotations = gEnter;

	this.$.annotationMarkers = gEnter.append( 'svg:path' )
		.attr( 'class', 'marker' )
		.attr( 'd', this._triangle )
		.on( 'click', this._toggleVLine );

	this.$.annotationLines = gEnter.append( 'svg:path' )
		.attr( 'class', 'vline hidden' )
		.attr( 'd', this._vline )
		.attr( 'stroke-dasharray', '4,4' );

	return this;
} // end FUNCTION createAnnotations()


// EXPORTS //

module.exports = createAnnotations;
