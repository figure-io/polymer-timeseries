'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );


// OBSERVER //

/**
* FUNCTION: configChanged( newConfig, oldConfig )
*	Event handler invoked when the `config` property changes.
*
* @param {Object} newConfig - new config
* @param {Object} oldConfig - old config
*/
function configChanged( newConfig, oldConfig ) {
	/* jshint validthis:true */
	var bool,
		err;

	if ( !isObject( newConfig ) ) {
		err = new TypeError( 'config::invalid assignment. Must be an `object`. Value: `' + newConfig + '`.' );
		this.fire( 'err', err );
		this.config = oldConfig;
		return;
	}
	// TODO: schema validator

	// Turn off auto-update:
	bool = this.autoUpdate;
	this.autoUpdate = false;

	// this.width = newConfig.canvas.width;
	// this.height = newConfig.canvas.height;

	// FIXME: title should not be part of annotations, but meta. The config should be standardized. Put in repo. Version it. Create an associated validator. NPM.
	// this.chartTitle = newConfig.annotations.title;
	// this.xLabel = newConfig.axes[ 0 ].label;
	// this.yLabel = newConfig.axes[ 1 ].label;
	// this.xMin = newConfig.scales[ 0 ].domain[ 0 ];
	// this.xMax = newConfig.scales[ 0 ].domain[ 1 ];
	// this.yMin = newConfig.scales[ 1 ].domain[ 0 ];
	// this.yMax = newConfig.scales[ 1 ].domain[ 1 ];
	// this.xNumTicks = newConfig.axes[ 0 ].ticks;
	// this.yNumTicks = newConfig.axes[ 1 ].ticks;
	// this.xTickFormat = newConfig.axes[ 0 ].format;
	// this.xAxisOrient = newConfig.axes[ 0 ].orient;
	// this.yAxisOrient = newConfig.axes[ 1 ].orient;

	// TODO: support this and `tension` for multiple lines.
	// this.interpolation = newConfig.marks[ 0 ].properties.interpolation;

	// this.labels = newConfig.marks.map( function onMark( mark ) {
	// 	return mark.data;
	// });

	this.fire( 'changed', {
		'attr': 'config',
		'prev': oldConfig,
		'curr': newConfig
	});

	// Reset the auto update flag to its original value:
	this.autoUpdate = bool;

	// Only if auto update is enabled, redraw the chart...
	if ( bool ) {
		this.create();
	}
} // end FUNCTION configChanged()


// EXPORTS //

module.exports = configChanged;
