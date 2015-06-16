'use strict';

/**
* FUNCTION: createLegend()
*	Creates the chart legend.
*
* @returns {Object} context
*/
function createLegend() {
	/* jshint validthis:true */
	var getColor = this._getColor,
		getLabel = this._getLabel,
		numLabels = this.labels.length,
		range,
		legend,
		entries,
		symbols,
		labels,
		i;

	if ( this.$.legend ) {
		this.$.legend.remove();
	}
	range = this._d3.range( numLabels );

	// Main legend container:
	legend = this.$.root.append( 'xhtml:div' )
		.attr( 'property', 'legend' )
		.attr( 'class', 'legend multicolumn-3' );
	this.$.legend = legend;

	// Create a legend entry for each label:
	entries = legend.selectAll( '.entry' )
		.data( range )
		.enter()
		.append( 'xhtml:p' )
			.attr( 'class', 'entry noselect' )
			.attr( 'draggable', this.isDraggable )
			.on( 'click', this._toggleSeries, false )
			.on( 'dragstart', this._onDragStart, false )
			.on( 'dragend', this._onDragEnd, false );

	this.$.legendEntries = entries;

	// Each entry should include a color-coded symbol and a label:
	entries.append( 'xhtml:span' )
		.attr( 'class', 'symbol' )
		.html( '&nbsp;' );

	entries.append( 'xhtml:span' )
		.attr( 'class', 'label' );

	// Set the color of all symbols...
	symbols = entries.selectAll( '.symbol' );
	for ( i = 0; i < symbols.length; i++ ) {
		symbols[ i ][ 0 ].classList.add( getColor( null, i ) + '-span' );
	}
	this.$.legendSymbols = symbols;

	// Set the text of all labels...
	labels = entries.selectAll( '.label' );
	for ( i = 0; i < labels.length; i++ ) {
		labels[ i ][ 0 ].innerHTML = getLabel( null, i );
	}
	this.$.legendLabels = labels;
	return this;
} // end FUNCTION createLegend()


// EXPORTS //

module.exports = createLegend;
