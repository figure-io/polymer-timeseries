'use strict';

/**
* FUNCTION: createAxes()
*	Creates chart axes.
*
* @returns {Object} context
*/
function createAxes() {
	/* jshint validthis:true */
	var graph = this.$.graph,
		height = this._graphHeight(),
		axis;

	// Remove any existing axes...
	if ( this.$.xAxis ) {
		this.$.xAxis.remove();
	}
	if ( this.$.yAxis ) {
		this.$.yAxis.remove();
	}
	axis = graph.append( 'svg:g' )
		.attr( 'property', 'axis' )
		.attr( 'class', 'x axis' )
		.attr( 'transform', 'translate(0,' + height + ')' )
		.call( this._xAxis );
	this.$.xAxis = axis;

	this.$.xLabel = axis.append( 'svg:text' )
		.attr( 'y', 45 )
		.attr( 'x', this._graphWidth() / 2 )
		.attr( 'text-anchor', 'middle' )
		.attr( 'property', 'axis.label' )
		.attr( 'class', 'label noselect' )
		.text( this.xLabel );

	axis.selectAll( '.tick' )
		.attr( 'property', 'axis.tick' );

	axis.selectAll( '.domain' )
		.attr( 'property', 'axis.domain' );

	axis = graph.append( 'svg:g' )
		.attr( 'property', 'axis' )
		.attr( 'class', 'y axis' )
		.call( this._yAxis );
	this.$.yAxis = axis;

	this.$.yLabel = axis.append( 'svg:text' )
		.attr( 'transform', 'rotate(-90)' )
		.attr( 'y', -72 )
		.attr( 'x', -height / 2 )
		.attr( 'text-anchor', 'middle' )
		.attr( 'property', 'axis.label' )
		.attr( 'class', 'label noselect' )
		.text( this.yLabel );

	axis.selectAll( '.tick' )
		.attr( 'property', 'axis.tick' );

	axis.selectAll( '.domain' )
		.attr( 'property', 'axis.domain' );

	return this;
} // end FUNCTION createAxes()


// EXPORTS //

module.exports = createAxes;
