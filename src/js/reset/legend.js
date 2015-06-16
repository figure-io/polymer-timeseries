'use strict';

/**
* FUNCTION: resetLegend()
*	Resets legend elements.
*
* @returns {Object} context
*/
function resetLegend() {
	/* jshint validthis:true */
	var getColor = this._getColor,
		getLabel = this._getLabel,
		numLabels = this.labels.length,
		range,
		entries,
		gEnter,
		symbols,
		labels,
		i;

	range = this._d3.range( numLabels );

	// Bind a set of labels:
	entries = this.$.legend.selectAll( '.entry' )
		.data( range );

	// Remove old legend entries:
	entries.exit().remove();

	// Add any new entries:
	gEnter = entries.enter().append( 'xhtml:p' )
		.attr( 'class', 'entry noselect' )
		.attr( 'draggable', this.isDraggable )
		.on( 'click', this._toggleSeries, false )
		.on( 'dragstart', this._onDragStart, false )
		.on( 'dragend', this._onDragEnd, false );

	gEnter.append( 'xhtml:span' )
		.attr( 'class', 'symbol' )
		.html( '&nbsp;' );

	gEnter.append( 'xhtml:span' )
		.attr( 'class', 'label' );

	this.$.legendEntries = entries;

	// Update all symbols:
	symbols = entries.selectAll( '.symbol' );
	for ( i = 0; i < symbols.length; i++ ) {
		symbols[ i ][ 0 ].classList.add( getColor( null, i ) + '-span' );
	}
	this.$.legendSymbols = symbols;

	// Update all labels:
	labels = entries.selectAll( '.label' );
	for ( i = 0; i < labels.length; i++ ) {
		labels[ i ][ 0 ].innerHTML = getLabel( null, i );
	}
	this.$.legendLabels = labels;

	return this;
} // end FUNCTION resetLegend()


// EXPORTS //

module.exports = resetLegend;
