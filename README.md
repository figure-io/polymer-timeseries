Timeseries
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> A [Polymer](https://www.polymer-project.org/) web component for displaying timeseries graphs.


## Install

``` bash
$ bower install figure-io/polymer-timeseries
```


## Usage

To use the component,

``` html
<!DOCTYPE html>
<html>
	<head>
		<script src="path/to/webcomponentsjs/webcomponents.min.js"></script>
		<link rel="import" href="path/to/polymer-timeseries">
	</head>
	<body>
		<polymer-timeseries id="chart"></polymer-timeseries>
	</body>
</html>
```

and

``` javascript
var el = document.querySelector( '#chart' );
```

The component has the following public attributes and methods...



### Attributes

#### el.data

Chart data. The expected format is an `array` of `arrays` of `arrays`, where each first level `array` is a timeseries and each second level `array` is a data point.

``` javascript
el.data = [
	[
		[1417563950959,0.25],
		[1417563952959,0.23],
		[1417563954959,0.24],
		[1417563956959,0.24]
	],
	[
		[1417563950959,0.73],
		[1417563952959,0.81],
		[1417563954959,0.83],
		[1417563956959,0.68]
	]
];
```

#### el.annotations

Chart annotations. The expected format is an `array` of `arrays`, where each first level `array` is an annotation.

``` javascript
el.annotations = [
	[1417563950959,'alert 1'],
	[1417563956959,'alert 2']
];
```


#### el.labels

Data labels corresponding to each timeseries.

``` javascript
el.labels = [
	'metric 1',
	'metric 2'
];
```

These labels are used when creating the chart legend.


#### el.colors

Specifies the chart [colors](https://github.com/mbostock/d3/wiki/Ordinal-Scales#category10). Colors can either be the name of a predefined set of classes (`category10`, `category20`, `category20b`, or `category20c`) or an independently defined `array` of classes. Default is `category10`.

``` javascript
// Known class list:
el.colors = 'category20';

// Create your own class list:
el.colors = [
	'category10-1',
	'category20b-10',
	'steelblue',
	'rainbow-wow'
];
```

#### el.config

Configuration `object` containing parameters corresponding to known attributes, as defined below.

``` javascript
el.config = {};
```

TODO: implement and define. Vega reference. Specification.


#### el.width

Chart canvas width. If not explicitly set, defaults to the width of the parent node.

``` javascript
el.width = 600; // px
```


#### el.height

Chart canvas height. If not explicitly set, default to the height of the parent node.

``` javascript
el.height = 400; // px
```


#### el.paddingLeft

Chart canvas left padding; i.e., space between the left canvas edge and the left graph edge. Typically needed to create room for a left oriented y-axis. Default is 90 pixels.

``` javascript
el.paddingLeft = 120; // px
```

#### el.paddingRight

Chart canvas right padding; i.e., space between the right canvas edge and the right graph edge. Typically needed to create room for a right oriented y-axis. Default is 20 pixels.

``` javascript
el.paddingRight = 90; // px
```

#### el.paddingTop

Chart canvas top padding; i.e., space between the top canvas edge and the top graph edge. Typically needed to create room for a chart title or top positioned legend. Default is 80 pixels.

``` javascript
el.paddingTop = 200; // px
```

#### el.paddingBottom

Chart canvas bottom padding; i.e., space between the bottom canvas edge and the bottom graph edge. Typically needed to create room for a bottom oriented x-axis or bottom positioned legend. Default is 80 pixels.

``` javascript
el.paddingBottom = 100; // px
```

#### el.chartTitle

Chart title. Default is an empty `string`.

``` javascript
el.chartTitle = 'Awesome chart.';
```

#### el.xLabel

x-axis label.

``` javascript
el.xLabel = 'seconds since epoch';
```

#### el.yLabel

y-axis label.

``` javascript
el.yLabel = '% utilization';
```

#### el.xMin

Defines the minimum value of the x-axis domain. Default is `null`.

``` javascript
el.xMin = new Date() - 186000;
```

If set to `null`, the `xMin` is dynamically calculated from the data.


#### el.xMax

Defines the maximum value of the x-axis domain. Default is `null`.

``` javascript
el.xMax = new Date();
```

If set to `null`, the `xMax` is dynamically calculated from the data.


#### el.yMin

Defines the minimum value of the y-axis domain. Default is `null`.

``` javascript
el.yMin = 0;
```

If set to `null`, the `yMin` is dynamically calculated from the data.


#### el.yMax

Defines the maximum value of the y-axis domain. Default is `null`.

``` javascript
el.yMax = 1;
```

If set to `null`, the `yMax` is dynamically calculated from the data.


#### el.xTickFormat

Defines the x-axis [tick format](https://github.com/mbostock/d3/wiki/SVG-Axes#tickFormat).

``` javascript
el.xTickFormat = '%H:%M';
```

#### el.yTickFormat

Defines the y-axis [tick format](https://github.com/mbostock/d3/wiki/Formatting).

``` javascript
el.yTickFormat = '%%';
```

#### el.xNumTicks

Defines the (suggested) number of x-axis [tick](https://github.com/mbostock/d3/wiki/SVG-Axes#ticks) marks.

``` javascript
el.xNumTicks = 5;
```

 TODO: describe what happens when set to `null`.


#### el.yNumTicks

Defines the (suggested) number of y-axis [tick](https://github.com/mbostock/d3/wiki/SVG-Axes#ticks) marks.

``` javascript
el.yNumTicks = 5;
```

TODO: describe what happens when set to `null`.


#### el.xAxisOrient

Defines the x-axis [orientation](https://github.com/mbostock/d3/wiki/SVG-Axes#orient). Default is `bottom`.

``` javascript
el.xAxisOrient = 'top';
```

#### el.yAxisOrient

Defines the y-axis [orientation](https://github.com/mbostock/d3/wiki/SVG-Axes#orient). Default is `left`.

``` javascript
el.yAxisOrient = 'right';
```


#### el.xValue

Defines the x-value accessor. The default accessor assumes an `array` of `arrays`.

``` javascript
// Default:
el.xValue = function( d ) {
	return d[ 0 ];
};

// Example of object based accessor:
el.xValue = function( d, i ) {
	return d.x;
};
```

#### el.yValue

Defines the y-value accessor. The default accessor assumes an `array` of `arrays`.

``` javascript
// Default:
el.yValue = function( d ) {
	return d[ 1 ];
};

// Example of object based accessor:
el.yValue = function( d, i ) {
	return d.y;
};
```

#### el.aValue

Defines the annotation accessor. The default accessor assumes an `array` of `arrays`.

``` javascript
// Default:
el.aValue = function( d ) {
	return d[ 1 ];
};

// Example of object based accessor:
el.aValue = function( d, i ) {
	return d.annotation;
};
```


#### el.isDefined

Defines an accessor function which controls where a line is [defined](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined). This accessor is used to specify how missing values are encoded. The default behavior is to ignore data points or y-values which are `null`.

``` javascript
// Default:
el.isDefined = function( d ) {
	return ( d !== null && d[ 1 ] !== null );
};

// Example checking for NaNs:
el.isDefined = function( d ) {
	return ( typeof d === 'number' && d === d );
};
```

#### el.interpolation

Specifies the type of [interpolation](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate) applied to path elements. Default is `linear`.

``` javascript
el.interpolation = 'basis';
```


#### el.tension

Specifies the spline interpolation [tension](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_tension). Default is `0.7`.

``` javascript
el.tension = 0.5;
```


#### el.isDraggable

Specifies whether chart components (e.g., legend entries) should be [draggable](http://www.html5rocks.com/en/tutorials/dnd/basics/). Default is `true`.

``` javascript
el.isDraggable = false;
```


#### el.isDroppable

Specifies whether data can be [dropped](http://www.html5rocks.com/en/tutorials/dnd/basics/) into the chart. Default is `true`.

``` javascript
el.isDroppable = false;
```


#### el.autoResize

Specifies whether the element should auto resize when the window resizes. Default is `true`.

``` javascript
el.autoResize = false;
```


### Methods

#### el.clear()

Clears the chart and resets axes.

``` javascript
el.clear();
```

#### el.formatData( data )

Converts data to standard representation. Needed for non-deterministic accessors. Use this method to convert raw data in non-standard format to standard format (see `el.data`).

``` javascript
var data = [
	[
		{'x':1417563950959,'y':0.25},
		{'x':1417563952959,'y':0.23},
		{'x':1417563954959,'y':0.24},
		{'x':1417563956959,'y':0.24}
	],
	[
		{'x':1417563950959,'y':0.73},
		{'x':1417563952959,'y':0.81},
		{'x':1417563954959,'y':0.83},
		{'x':1417563956959,'y':0.68}
	]
];

el.xValue = function( d ) {
	return d.x;
};
el.yValue = function( d ) {
	return d.y;
};

el.data = el.formatData( data );
```

#### el.formatAnnotations( annotations )

Converts an `array` of annotations to standard representation. Needed for non-deterministic accessors. Use this method to convert raw annotation data in non-standard format to standard format (see `el.annotations`).

``` javascript
var annotations = [
	{'time':1417563950959,'msg':'alert 1'},
	{'time':1417563956959,'msg':'alert 2'}
];

el.xValue = function( d ) {
	return d.time;
};
el.aValue = function( d ) {
	return d.msg;
};

el.annotations = el.formatAnnotations( annotations );
```

#### el.x( d )

Maps a datum's x-value to a pixel value.

``` javascript
var xPos = el.x( [1417563950959, 0.25] );
```

Note: assumes standard representation.


#### el.y( d )

Maps a datum's y-value to a pixel value.

``` javascript
var yPos = el.y( [1417563950959, 0.25] );
```

Note: assumes standard representation.


#### el.xDomain( min, max )

Calculates the x-axis domain. If `min` or `max` is `null`, calculates the respective value from the data.

``` javascript
var domain;

// Calculates the min x-limit from the data:
domain = el.xDomain( null, 1 );

// Calculates the max x-limit from the data:
domain = el.xDomain( 0, null );

// Calculates both the min and max from the data:
domain = el.xDomain( null, null );
```

#### el.yDomain( min, max )

Calculates the y-axis domain. If `min` or `max` is `null`, calculates the respective value from the data.

``` javascript
var domain;

// Calculates the min y-limit from the data:
domain = el.yDomain( null, 1 );

// Calculates the max y-limit from the data:
domain = el.yDomain( 0, null );

// Calculates both the min and max from the data:
domain = el.yDomain( null, null );
```


#### el.toggleSeries( d, i )

Toggles a displayed timeseries based on a provided index `i`. Used when a legend entry is clicked.

``` javascript
// Toggle the second timeseries:
el.toggleSeries( null, 1 );
```


#### el.toggleVLine( d, i )

Toggles a vertical line marking an annotation based on a provided index `i`. Used when an annotation marker is clicked.

``` javascript
// Toggle a vertical line for the third annotation:
el.toggleVLine( null, 2 );
```


#### el.stream( [options] )

Returns a writable chart stream.

``` javascript
var stream = el.stream();
```

TODO: define. Options. Behavior.


### Events

The component emits events during both chart configuration and interaction. The following events are emitted... 


#### 'err'

The element emits an `err` event whenever a error occurs; e.g., improper setting of attributes.

``` javascript
el.addEventListener( 'err', function onError( err ) {
	console.log( err );	
});
```

__NOTE__: the event name will change to `error` once issue [#138](https://github.com/webcomponents/webcomponentsjs/issues/138) is resolved. The preferred name is `error`.


#### 'changed'

The element emits a `changed` event whenever an attribute changes.

``` javascript
el.addEventListener( 'changed', function onChange( evt ) {
	console.log( evt.attr, evt.prev, evt.curr, evt.data );	
});
```

#### 'data'

The element emits a `data` event when the `data` attribute changes.

``` javascript
el.addEventListener( 'data', function onEvent( evt ) {
	console.log( this.data );
});
```

#### 'annotations'

The element emits an `annotations` when the `annotations` attribute changes.

``` javascript
el.addEventListener( 'annotations', function onEvent( evt ) {
	console.log( this.annotations );
});
```

#### 'labels'

The element emits a `labels` event when the `labels` attribute changes.

``` javascript
el.addEventListener( 'labels', function onEvent( evt ) {
	console.log( this.labels );
});
```


#### 'width'

The element emits a `width` event when the `width` attribute changes.

``` javascript
el.addEventListener( 'width', function onEvent( evt ) {
	console.log( this.width );
});
```

#### 'height'

The element emits a `height` event when the `height` attribute changes.

``` javascript
el.addEventListener( 'height', function onEvent( evt ) {
	console.log( this.height );
});
```

#### 'xMin'

The element emits an `xMin` event when the `xMin` attribute changes.

``` javascript
el.addEventListener( 'xMin', function onEvent( evt ) {
	console.log( this.xMin );
});
```

#### 'xMax'

The element emits an `xMax` event when the `xMax` attribute changes.

``` javascript
el.addEventListener( 'xMax', function onEvent( evt ) {
	console.log( this.xMax );
});
```

#### 'yMin'

The element emits a `yMin` event when the `yMin` attribute changes.

``` javascript
el.addEventListener( 'yMin', function onEvent( evt ) {
	console.log( this.yMin );
});
```

#### 'yMax'

The element emits a `yMax` event when the `yMax` attribute changes.

``` javascript
el.addEventListener( 'yMax', function onEvent( evt ) {
	console.log( this.yMax );
});
```


#### 'resized'

The element emits a `resized` event when the element's resize listener is triggered.

``` javascript
el.addEventListener( 'resized', function onResize( evt ) {
	console.log( 'Chart received a resize event.' );
});
```

#### 'clicked'

The element emits a `clicked` event when a chart element having a click handler is clicked.

``` javascript
el.addEventListener( 'clicked', function onClick( evt ) {
	console.log( evt );
});
```


#### 'annotation'

The element emits an `annotation` event when an annotation element is clicked and toggled to an active state.

``` javascript
el.addEventListener( 'annotation', function onClick( evt ) {
	console.log( evt.idx, evt.value );
});
```

Note: one use case for this event is linking the chart with an external element whose responsibility is displaying and filtering annotations. While annotation text could be displayed over top the graph, this will invariably be suboptimal within the context of an SVG. A more flexible solution would be to display the annotation text in a separate UI element which is activated when a corresponding SVG element is activated.


#### 'dragStart'

The element emits a `dragStart` event when a legend entry is dragged.

``` javascript
el.addEventListener( 'dragStart', function onDragStart( evt ) {
	console.log( evt );
});
```

#### 'dragEnd'

The element emits a `dragEnd` event when a legend entry stops being dragged.

``` javascript
el.addEventListener( 'dragEnd', function onDragEnd( evt ) {
	console.log( evt );
});
```

#### 'dragEnter'

The element emits a `dragEnter` event when a draggable element enters the chart area.

``` javascript
el.addEventListener( 'dragEnter', function onDragEnter( evt ) {
	console.log( evt );
});
```

#### 'dragLeave'

The element emits a `dragLeave` event when a draggable element leaves the chart area.

``` javascript
el.addEventListener( 'dragLeave', function onDragLeave( evt ) {
	console.log( evt );
});
```

#### 'dropped'

The element emits a `dropped` event when a draggable element is dropped into the chart area.

``` javascript
el.addEventListener( 'dropped', function onDrop( evt ) {
	console.log( evt );
});
```

__Note__: this event is only emitted when `isDroppable` is `true`.




## Examples

To run the example code, navigate to the parent directory and start a [simple python server](https://docs.python.org/2/library/simplehttpserver.html),

``` bash
$ cd ..
$ python -m SimpleHTTPServer 9090
```

Once the server is running, open the following URL in your browser

```
http://127.0.0.1:9090/polymer-timeseries/examples
```


## Development

To install development dependencies,

``` bash
$ make install
```

which installs [node modules](https://www.npmjs.org/) and [bower components](http://bower.io/).

> WARNING: bower components are installed in the parent directory, __not__ the component directory.

By installing components in the parent directory, we mimic a production environment, in which bower components are siblings (needed for correct relative paths). Beware, however, that this may result in conflicts with existing components. Or worse, where existing sibling components are being developed (git repositories), completely overwriting siblings.

To avoid such issues, you may want to clone the repository into its own isolated directory. The downside of this approach is increased disk usage due to (possibly) duplicated dependencies.


## Build

The `src` directory contains the component source files. Source files must be [browserified](https://github.com/substack/node-browserify) and then [vulcanized](https://github.com/polymer/vulcanize) before creating a distributable component. To run the build,

``` bash
$ make build
```

which generates a `build` directory containing [browserified](https://github.com/substack/node-browserify) scripts and a [vulcanized](https://github.com/polymer/vulcanize) distributable in the top-level directory.


## Tests

### Unit

Unit tests are run via [web component tester](https://github.com/Polymer/web-component-tester), which in turn uses the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) to instrument code coverage. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/.svg
[npm-url]: https://npmjs.org/package/

[travis-image]: http://img.shields.io/travis/figure-io/polymer-timeseries/master.svg
[travis-url]: https://travis-ci.org/figure-io/polymer-timeseries

[coveralls-image]: https://img.shields.io/coveralls/figure-io/polymer-timeseries/master.svg
[coveralls-url]: https://coveralls.io/r/figure-io/polymer-timeseries?branch=master

[dependencies-image]: http://img.shields.io/david/figure-io/polymer-timeseries.svg
[dependencies-url]: https://david-dm.org/figure-io/polymer-timeseries

[dev-dependencies-image]: http://img.shields.io/david/dev/figure-io/polymer-timeseries.svg
[dev-dependencies-url]: https://david-dm.org/dev/figure-io/polymer-timeseries

[github-issues-image]: http://img.shields.io/github/issues/figure-io/polymer-timeseries.svg
[github-issues-url]: https://github.com/figure-io/polymer-timeseries/issues

