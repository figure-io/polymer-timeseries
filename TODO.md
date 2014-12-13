TODO
====

1. 	Include note about the distributed version being a vulcanized version (see core-component-page polymer element)
2. 	Annotations
3. 	Fix `core-component-page`. Currently, has hard-coded assumptions about `demo.html`, etc.
4. 	jsdoc events/fires
5. 	config method
6. 	write method (stream spec; see node module for gauge)
7. 	stream api
	- 	stream()
	-	should you be able to specify the particular path you want to update? Makes updating rather hard, as updates which should be batched/grouped together arrive sequentially
	- 	re-emit data event --> use a sink stream!!
8. 	d3-chart, chartist
9. 	To view example,

	``` bash
	$ cd ..
	$ python -m SimpleHTTPServer 9090
	```

	Navigate in browser to `chart-timeseries/examples`.
		- 	`/simple`
		-	`/stream`
10. dbl-click to zoom canvas
	-	actually needs to be set on the parent container (e.g., a figure element)
	-	use fixed positioning to take up entire screen
	-	could use magnifying glass icon
11. breakpoints
	- 	at smaller resolutions, fire callback to, e.g., reduce number of tick marks (eventually could become similar to a sparkline)
12. Answer thread about code [organization](x-webdoc://ED43E348-979D-4AA7-89A7-9ED0353AFA37/#group_thread_5)
13. Path stream
	-	append
	-	incrpath
	- 	window
	-	incrmpath
	- 	nan (missing values) --> encoded? Broken segment?
	- 	keep in `array` and output using `Array.prototype.join`
14. `getConfig`
	-	returns a chart configuration
	- 	marks property should either be an `array` of settings or a single `object`. If `object`, applies to all marks
	- 	Or, charts just choose whether to encode multiple or just one (i.e., the first option)
	- 	I opt for choosing. In which case, `getConfig.marks = [{}]` is a single element `array`.
15. See how plottable does their time x-axis to improve formatting 
16. timeseries stream as separate module (see stream.js and string parsing)
17. move stream to flow
18. ensure jsdom not browserified w D3
19. replace d3 min/max with compute-min/max
