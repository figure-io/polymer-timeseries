'use strict';

/**
* FUNCTION: resetAnnotations()
*	Resets graph annotations.
*
* @returns {Object} context
*/
function resetAnnotations() {
	/* jshint validthis:true */
	var group, annotations, gEnter;

	group = this.$.agroup;

	// Bind the data and update existing annotations:
	annotations = group.selectAll( '.annotation' )
		.data( this.annotations );

	// Remove any old annotations:
	annotations.exit().remove();

	// Add any new annotations:
	gEnter = annotations.enter().append( 'svg:g' )
		.attr( 'property', 'annotation' )
		.attr( 'class', 'annotation' );

	gEnter.append( 'svg:path' )
		.attr( 'class', 'marker' )
		.attr( 'd', this._triangle )
		.on( 'click', this._toggleVLine );

	gEnter.append( 'svg:path' )
		.attr( 'class', 'vline hidden' )
		.attr( 'd', this._vline )
		.attr( 'stroke-dasharray', '4,4' );

	// Cache a reference to the annotations:
	this.$.annotations = annotations;
	this.$.annotationMarkers = group.selectAll( '.marker' );
	this.$.annotationLines = group.selectAll( '.vline' );

	return this;
} // end FUNCTION resetAnnotations()


// EXPORTS //

module.exports = resetAnnotations;
