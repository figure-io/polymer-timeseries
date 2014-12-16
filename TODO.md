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
	- 	re-emit data event
8. 	
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
18. 
19. replace d3 min/max with compute-min/max
	- 	Not so simple, as would require extracting desired values into separate array, etc. D3 has advantage of using accessors.
20. title positioning
	- 	currently disregarded in favor of legend entries
	- 	if set title, then should auto-update the padding
	- 	or simply set legend to being below the chart
21. should padding be public?
	- 	if do not expose, do not have to honor any settings and can auto-update as see fit. e.g., when provide title, can increase top padding, etc. Remove axis, can expand graph area
22. legend position
	-	`top`, `bottom`, `left`, `right`
23. make legend entries draggable!
	-	emit events
24. draggable timeseries
	-	clone path element into new SVG which is draggable
	-	if legend label, bind that to the data transfer object
25. allow chart to be drag-droppable
	- 	attribute: `dragdrop`
	-	if `true`, will accept data transfer objects with `data` (and `label`) fields
26. noselect for ticklabels
	-	could be relatively expensive, as need to set the class every time an axis is updated
27. update `package.json` scripts
	- 	place coveralls command in Makefile
28. for Travis, fire up firefox browser as before script and call it a day
	- 	integrate saucelabs at later time
