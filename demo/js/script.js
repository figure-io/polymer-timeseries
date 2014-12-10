
(function() {
	'use strict';

	// FUNCTIONS //

	/**
	* FUNCTION: getResource( url, clbk )
	*   Fetches a resource from a provided URL and returns the result to a provided callback.
	*
	* @param {String} url - resource location
	* @param {Function} clbk - callback to invoke upon resource receipt. Function should accept one input argument: [ result ]
	*/
	function getResource( url, clbk ) {
		var xhr;

		// Create a new request object:
		xhr = new XMLHttpRequest();

		// Open the request connection:
		xhr.open( 'GET', url, true );

		// Define the state change callback:
		xhr.onreadystatechange = function () {
			if ( xhr.readyState !== 4 || xhr.status !== 200 ){
				return;
			}
			clbk( xhr.responseText );
		};

		// Send the request:
		xhr.send();
	} // end FUNCTION getResource()

	/**
	* FUNCTION: onData( body )
	*	Response handler for an HTTP request. Parses the returned data.
	*
	* @param {String} body - HTTP response body
	*/
	function onData( body ) {
		var el = document.querySelector( '#figure2' ).querySelector( '.chart' );

		el.yMin = 0;
		el.yMax = 1;
		el.xLabel = 'seconds';
		el.labels = [
			'cpu.utilization',
			'mem.utilization',
			'disk.utilization'
		];
		el.data( JSON.parse( body ), false );
	} // end FUNCTION onData()


	// SCRIPT //

	// Get the template for a figure configuration:
	getResource( './../demo/data/timeseries.json', onData );

})();
