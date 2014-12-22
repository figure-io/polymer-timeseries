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



### Events


#### Elements

##### 'canvas'

The element emits a `canvas` event to mark chart canvas life cycle events; e.g., creation and removal.

``` javascript
el.addEventListener( 'canvas', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'graph'

The element emits a `graph` event to mark chart graph life cycle events; e.g., creation.

``` javascript
el.addEventListener( 'graph', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'background'

The element emits a `background` event to mark graph background life cycle events; e.g., creation and removal.

``` javascript
el.addEventListener( 'background', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'timeseries'

The element emits a `timeseries` event to mark timeseries life cycle events; e.g., creation and reset.

``` javascript
el.addEventListener( 'timeseries', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'xAxis'

The element emits an `xAxis` event to mark x-axis life cycle events; e.g., creation and removal.

``` javascript
el.addEventListener( 'xAxis', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'yAxis'

The element emits a `yAxis` event to mark y-axis life cycle events; e.g., creation and removal.

``` javascript
el.addEventListener( 'yAxis', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'title'

The element emits a `title` event to mark chart title life cycle events; e.g., creation, removal, and changed (see below).

``` javascript
el.addEventListener( 'title', function onEvent( evt ) {
	console.log( evt );
	if ( evt.type === 'changed' ) {
		console.log( this.chartTitle );
	}
});
```

##### 'annotations'

The element emits an `annotations` event to mark graph annotation life cycle events; e.g., creation, removal, and changed (see below).

``` javascript
el.addEventListener( 'annotations', function onEvent( evt ) {
	console.log( evt );
});
```

##### 'legend'

The element emits a `legend` event to mark legend life cycle events; e.g., creation and removal.

``` javascript
el.addEventListener( 'legend', function onEvent( evt ) {
	console.log( evt );
});
```


#### Attributes

##### 'data'

The element emits a `data` event when the `data` attribute changes.

``` javascript
el.addEventListener( 'data', function onEvent( evt ) {
	console.log( 'Data changed.' );
});
```

##### 'config'

The element emits a `config` event when the `config` attribute changes.

``` javascript
el.addEventListener( 'config', function onEvent( evt ) {
	console.log( 'Chart config changed.' );
});
```

##### 'width'

The element emits a `width` event when the `width` attribute changes.

``` javascript
el.addEventListener( 'width', function onEvent( evt ) {
	console.log( this.width );
});
```

##### 'height'

The element emits a `height` event when the `height` attribute changes.

``` javascript
el.addEventListener( 'height', function onEvent( evt ) {
	console.log( this.height );
});
```

##### 'xValue'

The element emits an `xValue` event when the `xValue` attribute changes.

``` javascript
el.addEventListener( 'xValue', function onEvent( evt ) {
	console.log( 'x-value accessor changed.' );
});
```

##### 'yValue'

The element emits an `yValue` event when the `yValue` attribute changes.

``` javascript
el.addEventListener( 'yValue', function onEvent( evt ) {
	console.log( 'y-value accessor changed.' );
});
```

##### 'aValue'

The element emits an `aValue` event when the `aValue` attribute changes.

``` javascript
el.addEventListener( 'aValue', function onEvent( evt ) {
	console.log( 'annotation accessor changed.' );
});
```

##### 'isDefined'

The element emits an `isDefined` event when the `isDefined` attribute changes.

``` javascript
el.addEventListener( 'isDefined', function onEvent( evt ) {
	console.log( 'isDefined accessor changed.' );
});
```

##### 'labels'

The element emits a `labels` event when the `labels` attribute changes.

``` javascript
el.addEventListener( 'labels', function onEvent( evt ) {
	console.log( 'Data labels changed.' );
});
```

##### 'xLabel'

The element emits an `xLabel` event when the `xLabel` attribute changes.

``` javascript
el.addEventListener( 'xLabel', function onEvent( evt ) {
	console.log( this.xLabel );
});
```

##### 'yLabel'

The element emits a `yLabel` event when the `yLabel` attribute changes.

``` javascript
el.addEventListener( 'yLabel', function onEvent( evt ) {
	console.log( this.yLabel );
});
```

##### 'xMin'

The element emits an `xMin` event when the `xMin` attribute changes.

``` javascript
el.addEventListener( 'xMin', function onEvent( evt ) {
	console.log( this.xMin );
});
```

##### 'xMax'

The element emits an `xMax` event when the `xMax` attribute changes.

``` javascript
el.addEventListener( 'xMax', function onEvent( evt ) {
	console.log( this.xMax );
});
```

##### 'yMin'

The element emits a `yMin` event when the `yMin` attribute changes.

``` javascript
el.addEventListener( 'yMin', function onEvent( evt ) {
	console.log( this.yMin );
});
```

##### 'yMax'

The element emits a `yMax` event when the `yMax` attribute changes.

``` javascript
el.addEventListener( 'yMax', function onEvent( evt ) {
	console.log( this.yMax );
});
```

##### 'xNumTicks'

The element emits an `xNumTicks` event when the `xNumTicks` attribute changes.

``` javascript
el.addEventListener( 'xNumTicks', function onEvent( evt ) {
	console.log( this.xNumTicks );
});
```

##### 'yNumTicks'

The element emits a `yNumTicks` event when the `yNumTicks` attribute changes.

``` javascript
el.addEventListener( 'yNumTicks', function onEvent( evt ) {
	console.log( this.yNumTicks );
});
```

##### 'xAxisOrient'

The element emits an `xAxisOrient` event when the `xAxisOrient` attribute changes.

``` javascript
el.addEventListener( 'xAxisOrient', function onEvent( evt ) {
	console.log( this.xAxisOrient );
});
```

##### 'yAxisOrient'

The element emits a `yAxisOrient` event when the `yAxisOrient` attribute changes.

``` javascript
el.addEventListener( 'yAxisOrient', function onEvent( evt ) {
	console.log( this.yAxisOrient );
});
```

##### 'xTickFormat'

The element emits an `xTickFormat` event when the `xTickFormat` attribute changes.

``` javascript
el.addEventListener( 'xTickFormat', function onEvent( evt ) {
	console.log( this.xTickFormat );
});
```

##### 'interpolation'

The element emits an `interpolation` event when the `interpolation` attribute changes.

``` javascript
el.addEventListener( 'interpolation', function onEvent( evt ) {
	console.log( this.interpolation );
});
```

##### 'tension'

The element emits a `tension` event when the `tension` attribute changes.

``` javascript
el.addEventListener( 'tension', function onEvent( evt ) {
	console.log( this.tension );
});
```

##### 'colors'

The element emits a `colors` event when the `colors` attribute changes.

``` javascript
el.addEventListener( 'colors', function onEvent( evt ) {
	console.log( this.colors );
});
```

##### 'paddingLeft'

The element emits a `paddingLeft` event when the `paddingLeft` attribute changes.

``` javascript
el.addEventListener( 'paddingLeft', function onEvent( evt ) {
	console.log( this.paddingLeft );
});
```

##### 'paddingRight'

The element emits a `paddingRight` event when the `paddingRight` attribute changes.

``` javascript
el.addEventListener( 'paddingRight', function onEvent( evt ) {
	console.log( this.paddingRight );
});
```

##### 'paddingBottom'

The element emits a `paddingBottom` event when the `paddingBottom` attribute changes.

``` javascript
el.addEventListener( 'paddingBottom', function onEvent( evt ) {
	console.log( this.paddingBottom );
});
```

##### 'paddingTop'

The element emits a `paddingTop` event when the `paddingTop` attribute changes.

``` javascript
el.addEventListener( 'paddingTop', function onEvent( evt ) {
	console.log( this.paddingTop );
});
```

##### 'isDraggable'

The element emits an `isDraggable` event when the `isDraggable` attribute changes.

``` javascript
el.addEventListener( 'isDraggable', function onEvent( evt ) {
	console.log( this.isDraggable );
});
```

##### 'isDroppable'

The element emits an `isDroppable` event when the `isDroppable` attribute changes.

``` javascript
el.addEventListener( 'isDroppable', function onEvent( evt ) {
	console.log( this.isDroppable );
});
```

##### 'autoResize'

The element emits an `autoResize` event when the `autoResize` attribute changes.

``` javascript
el.addEventListener( 'autoResize', function onEvent( evt ) {
	console.log( this.autoResize );
});
```


#### Interactions

##### 'resized'

The element emits a 'resized' event when the element's resize listener is triggered.

``` javascript
el.addEventListener( 'resized', function onResize( evt ) {
	console.log( 'Chart received a resize event.' );
});
```

##### 'clicked'

The element emits a 'clicked' event when a chart element is clicked.

``` javascript
el.addEventListener( 'clicked', function onResize( evt ) {
	console.log( evt.msg );
});
```

##### 'dragStart'

The element emits a 'dragStart' event when a legend entry is dragged.

``` javascript
el.addEventListener( 'dragStart', function onResize( evt ) {
	console.log( evt );
});
```

##### 'dragEnd'

The element emits a 'dragEnd' event when a legend entry stops being dragged.

``` javascript
el.addEventListener( 'dragEnd', function onResize( evt ) {
	console.log( evt );
});
```

##### 'dragEnter'

The element emits a 'dragEnter' event when a draggable element enters a drop area.

``` javascript
el.addEventListener( 'dragEnter', function onResize( evt ) {
	console.log( evt );
});
```

##### 'dragLeave'

The element emits a 'dragLeave' event when a draggable element leaves a drop area.

``` javascript
el.addEventListener( 'dragLeave', function onResize( evt ) {
	console.log( evt );
});
```

##### 'dropped'

The element emits a 'dropped' event when a draggable element is dropped into a drop area.

``` javascript
el.addEventListener( 'dropped', function onResize( evt ) {
	console.log( evt );
});
```


#### Other

##### 'changed'

The element emits a 'changed' event whenever an attribute changes.

``` javascript
el.addEventListener( 'changed', function onChange( evt ) {
	console.log( evt.attr, evt.oldVal, evt.newVal );	
});
```

##### 'error'

The element emits an 'error' event whenever a error occurs; e.g., improper setting of attributes.

``` javascript
el.addEventListener( 'error', function onError( err ) {
	console.log( err );	
});
```

##### 'cleared'

The element emits a 'cleared' event whenever the chart is cleared.

``` javascript
el.addEventListener( 'cleared', function onChange( evt ) {
	console.log( evt.msg );	
});
```

##### 'stream'

The element emits a 'stream' event whenever a new stream is created.

``` javascript
el.addEventListener( 'stream', function onChange( evt ) {
	console.log( 'Stream created.' );	
});
```


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

