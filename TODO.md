TODO
====

#### Post-migration

1. Consider name change
	-	e.g., `figure-io-timeseries`
2. accept `x` as a vector and `y` as a `matrix`
3. see how arrays are deep watched
	-	deep observation no longer works as in 0.5. Will need to require users to rebind after they have mutated the respective property.
		-	this means that any observers/listeners (e.g., dragEnd) which mutate an `array` property need to reassign
4. schema validator
	-	configChanged
5. cross-check all methods with matrix-diagram
6. confirm that a `title` property name is allowed
	-	otherwise, use `chartTitle` (or `ctitle`)
7. stream implementation needs a fair amount of work
8. xMin/xMax
	-	number or `Date` or `String`? Are all allowed? If so, then need to update observer validators
9. x/yDomain
	-	refactor; use compute; no nested fcns
10. clean-up `init` `X1` and `X2`, as well as `clear`
11. default to [`shadow`](https://www.polymer-project.org/1.0/docs/devguide/settings.html) dom
12. 


#### Pre-migration

1. 	Include note about the distributed version being a vulcanized version (see core-component-page polymer element)
2. 	figure-io schemas
	-	timeseries
	-	histogram
	-	kde
	-	sparkline
	-	scatter
	-	line
	-	area
	-	brushable ""
	-	gauge
	- 	...
	-	(validator and examples)
3. 	Fix `core-component-page`. Currently, has hard-coded assumptions about `demo.html`, etc.
4. 	jsdoc events/fires
5. 	config method
6. 	write method (stream spec; see node module for gauge)
7. 	stream api
	- 	stream()
	-	should you be able to specify the particular path you want to update? Makes updating rather hard, as updates which should be batched/grouped together arrive sequentially
	- 	re-emit data event
8. 	
9. 	Examples
		- 	`/simple`
		-	`/stream`
10. dbl-click to zoom canvas
	-	actually needs to be set on the parent container (e.g., a figure element) --> why??
	-	use fixed positioning to take up entire screen
	-	could use magnifying glass icon
11. breakpoints
	- 	at smaller resolutions, fire callback to, e.g., reduce number of tick marks (eventually could become similar to a sparkline)
	-	use x and y num ticks being initially set to `null`
12. Answer thread about code [organization](x-webdoc://ED43E348-979D-4AA7-89A7-9ED0353AFA37/#group_thread_5)
13. Path stream
	-	append
	-	incrpath
	- 	window
	-	incrmpath
	- 	nan (missing values) --> encoded? Broken segment?
	- 	keep in `array` and output using `Array.prototype.join` ['M0,0', 'L1,1' ]
14. `getConfig`
	-	returns a chart configuration
	- 	marks property should either be an `array` of settings or a single `object`. If `object`, applies to all marks
	- 	Or, charts just choose whether to encode multiple or just one (i.e., the first option)
	- 	I opt for choosing. In which case, `getConfig.marks = [{}]` is a single element `array`.
15. See how plottable does their time x-axis to improve formatting 
16. timeseries stream as separate module (see stream.js and string parsing)
	-	Date string parsing!
17. move stream to flow
18. FIXME: stream currently assumes `objectMode`!!!!
	-	e.g., that a chunk is not a partial datum! (half a stringified array, etc)
	-	See how jsonstream parses incoming binary chunks
19. replace d3 min/max with compute-min/max
20. title positioning
	- 	currently disregarded in favor of legend entries
	- 	if set title, then should auto-update the padding
	- 	or simply set legend to being below the chart
21. should padding be public?
	- 	if do not expose, do not have to honor any settings and can auto-update as see fit. e.g., when provide title, can increase top padding, etc. Remove axis, can expand graph area
	-	autopad attribute ???
	-	no autopad; allow paddings to equal `null`. If `null`, the use internal padding values, which may be auto-calculated/dynamically adjusted
22. legend position
	-	`top`, `bottom`, `left`, `right`
23. 
24. draggable timeseries
	-	clone path element into new SVG which is draggable
	- 	probably more to this, cloned element has to be outside the normal DOM (absolute/fixed positioning); has to move with a cursor/finger. Things will probably feel hacky.
	-	if legend label, bind that to the data transfer object
25. 
26. noselect for ticklabels
	-	could be relatively expensive, as need to set the class every time an axis is updated
27. 
28. integrate saucelabs with Travis-ci
29. 
30. 
31. `changed` callbacks for `objects` (e.g., config)
	-	will impact how some things are updated (e.g., dragEnd) --> ????
32. clear method
	-	reset x/y labels? or keep until new data arrives?
		*	can probably just do the latter
		*	WARNING: not particularly generalizable between chart types (e.g., from timeseries to histogram; the labels will not match; I suppose, however, that each chart can decide whether and how to use label information)
33. 
34. demo socket/sse server
	-	stdin
	-	auto assign port
	-	generate client-side script
	-	open browser and url
	-	run client-side script
		-	establish ws connection
	-	once established, stream data to browser
	-	update
	-	may want to create a separate repo just for this demo
35. are transitions needed? I am skeptical.
36. create absolute and relative time components as part of component
	-	hide until needed
	- 	see datgui
	-	once configured, ability to export configuration
		-	config can then be provided to `el.config( config )` for auto-config
37. el.plot( data )
	-	assuming a selection has been set (else default to body), append a new `polymer-chart-timeseries` element and plot the data.
	-	else returns the new chart element
	- 	basically, a component, once configured, becomes a factory/template for similar components configured the same w diff data
	-	if provided a clbk, return chart.toString()
38. el.toString()
	-	walk DOM (create string)
	-	set styles
	-	crowbar
39. drop behavior
	- 	empty chart
		-	use data transfer min/max and labels
	-	existing chart
		-	min/max abide by new chart convention
		-	conflicting y-labels is a problem
40. 
41. move `wct.conf.js` to `/etc`
	-	requires resolved [issue](https://github.com/Polymer/web-component-tester/issues/98)
	-	update Makefile
42. xinv/yinv
	-	pixel value to data value
43. drag to copy in addition to drag to move/remove
	-	if drag series instead of legend entry
44. polymer-editor
	-	matlab plot editor, datgui, tangle
45. responsive --> [`window.matchmedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia)
46. visual downsampling
	-	mult algos
	-	on resize, resample
	-	flag to turn on downsampling (e.g., `autoDownsample`, or `downsampling`)
47. 
48. Should an option be provided to enforce an aspect ratio?
	-	Maybe more trouble than it is worth.
49. should attributes like `xNumTicks`, `yNumTicks`, etc be allowed to equal `null` to resume, say, special resize behavior (details on demand)?
	- 	yes (See #11)
50. x/y axis top and bottom orientations will require that these axes be updated on padding changes! Currently, e.g., with paddingLeft, assume do not need to update the y-axis.
51. displaying a legend should be optional
	-	will affect changed callbacks which reset the legend
52. include notes about inheritance
	- 	descendant will need to call `chart` and `addListeners` in `attached` and call `removeListeners` in `detached`
	-	etc
53. See `toggleSeries`; need to move `clicked` event to separate handler
	- 	method should be a general method
	-	dido for `toggleVLine`
54. README TOC / Wiki
55. 
56. Update year from 2014 to 2015 (2014-2015).
57. move try/catch in stream write method to separate fcn.
58. probably do not want `if ( !this.$.canvas ) {}`, as this prevents events from firing due to early return. Rather, you want, say, `if ( this.$.canvas && this.autoUpdate ) {}`.
59. currently, only width and height changes actually check that a canvas exists before updating chart elements; should the same not happen for other attribute changes??? Is checking for a canvas needed????
60. BUG: `dataChanged` does not emit a changed event when set to an empty array due to early return.
61. include screenshot in README
62. update to polymer 0.5.4
	- 	requires updating web-component-tester-istanbul plugin and using new configuration setup


#### Tests

1. 	Auto-build `test/index.html` such that suites do not have to be manually included; they should be discovered
	- 	find all directories
		-	check for `test.html`
2. 	Suite generator
3. 	Bash script to run a particular suite, as opposed to having to run all suites all the time (this ties into #1, as the `index.html` can be built to just include a particular suite, or a subset of suites)
4. 	`graphWidth()`
5. 	`graphHeight()`
6. 	`x()`
7. 	`y()`
8. 	`getColor()`
9. 	`getLabel()`
10. 
11. any test which updates DOM elements
	-	need to validate that the DOM elements were actually updated (regardless of implementation; D3 or otherwise)
12. `resetAnnotations`
13. `resetLegend`
14. `resetPaths`
15. `createLegend`
16. `createAnnotations`
17. `createTitle`
18. `createAxes`
19. `onDragStart' and `onDragEnd`
20. `stream`
21. `Chart` instance
	- 	how to do this?
22. 
23. 
24. xDomain
	-	should `true`/`false` be permitted??? See tests.
25. all emitted events are contracts!!!
	-	create tests which explicitly test for event data structure


#### Notes

As relates to a general plot()...

1. 	distinguish between timeseries and line
	-	parse x0; if fits a date, then create a timeseries element; else line
2. 	if provided a symbol, go with a scatter
3. 	if both, mixed
