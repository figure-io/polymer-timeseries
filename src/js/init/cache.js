'use strict';

/**
* FUNCTION: cache()
*	Returns a new element cache.
*
* @returns {Object} element cache
*/
function cache() {
	var $ = {};

	// Base elements...
	$.root = null;
	$.canvas = null;
	$.clipPath = null;
	$.graph = null;
	$.bkgd = null;

	// Axis elements...
	$.xAxis = null;
	$.yAxis = null;
	$.xLabel = null;
	$.yLabel = null;

	// Meta elements...
	$.meta = null;
	$.title = null;

	// Legend elements...
	$.legend = null;
	$.legendEntries = null;
	$.legendSymbols = null;
	$.legendLabels = null;

	// Data elements...
	$.marks = null;
	$.paths = null;

	// Annotation elements...
	$.agroup = null;
	$.annotations = null;
	$.annotationMarks = null;
	$.annotationLines = null;

	return $;
} // end FUNCTION cache()


// EXPORTS //

module.exports = cache;
