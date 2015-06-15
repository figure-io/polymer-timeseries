'use strict';

/**
* FUNCTION: onDragStart( d, i )
*	Event handler invoked at the start of dragging chart elements.
*
* @param {Array|Number} d - element data
* @param {Number} i - element index
* @returns {Boolean} false
*/
function onDragStart( d, i ) {
	/* jshint validthis:true */
	var evt = this._d3.event,
		path,
		label,
		data;

	// Get the label:
	label = this.$.legendLabels[ i ][ 0 ].innerHTML;

	// Get the path data...
	if ( this.$.paths ) {
		path = this.$.paths[ 0 ][ i ];
		// Possibility that a corresponding path has not yet been drawn; e.g., more labels than datasets.
		if ( path ) {
			data = this._d3.select( path ).data();
		} else {
			data = [];
		}
	} else {
		data = [];
	}
	// Create a data object:
	data = {
		'uid': this.__uid__,
		'id': i,
		'type': 'timeseries',
		'data': data[ 0 ],
		'label': label,
		'xMin': this.xMin,
		'xMax': this.xMax,
		'yMin': this.yMin,
		'yMax': this.yMax,
		'yLabel': this.yLabel
	};

	// Set the drag payload:
	evt.dataTransfer.effectAllowed = 'move';
	evt.dataTransfer.setData( 'application/x-polymer-chart-data', JSON.stringify( data ) );

	// TODO: define additional behavior

	this.fire( 'dragStart', evt );
	return false;
} // end FUNCTION onDragStart()


// EXPORTS //

module.exports = onDragStart;
