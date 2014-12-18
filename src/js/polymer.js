/**
*
*	COMPONENT: polymer-timeseries
*
*
*	DESCRIPTION:
*		- Registers the polymer-timeseries web-component.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

/* global Polymer */
'use strict';

// MODULES //

var Chart = require( './chart.js' );


// POLYMER //

Polymer( 'polymer-timeseries', Chart.prototype );
