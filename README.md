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

The component emits events during both chart configuration and interaction.

The following events are emitted... 


#### 'error'

The element emits an `error` event whenever a error occurs; e.g., improper setting of attributes.

``` javascript
el.addEventListener( 'error', function onError( err ) {
	console.log( err );	
});
```


#### 'changed'

The element emits a `changed` event whenever an attribute changes.

``` javascript
el.addEventListener( 'changed', function onChange( evt ) {
	console.log( evt.attr, evt.oldVal, evt.newVal );	
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
el.addEventListener( 'clicked', function onResize( evt ) {
	console.log( evt );
});
```

#### 'dragStart'

The element emits a `dragStart` event when a legend entry is dragged.

``` javascript
el.addEventListener( 'dragStart', function onResize( evt ) {
	console.log( evt );
});
```

#### 'dragEnd'

The element emits a `dragEnd` event when a legend entry stops being dragged.

``` javascript
el.addEventListener( 'dragEnd', function onResize( evt ) {
	console.log( evt );
});
```

#### 'dragEnter'

The element emits a `dragEnter` event when a draggable element enters the chart area.

``` javascript
el.addEventListener( 'dragEnter', function onResize( evt ) {
	console.log( evt );
});
```

#### 'dragLeave'

The element emits a `dragLeave` event when a draggable element leaves the chart area.

``` javascript
el.addEventListener( 'dragLeave', function onResize( evt ) {
	console.log( evt );
});
```

#### 'dropped'

The element emits a `dropped` event when a draggable element is dropped into the chart area.

``` javascript
el.addEventListener( 'dropped', function onResize( evt ) {
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

