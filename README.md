Timeseries Chart
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> UI element for displaying timeseries graphs in a chart.


## Install

``` bash
$ bower install figure-io/polymer-chart-timeseries
```


## Usage

To use the component,

``` html
<!DOCTYPE html>
<html>
	<head>
		<script src="../../webcomponentsjs/webcomponents.min.js"></script>
		<link rel="import" href="path/to/chart-timeseries">
	</head>
	<body>
		<polymer-chart-timeseries id="chart"></polymer-chart-timeseries>
	</body>
</html>
```

and

``` javascript
var el = document.querySelector( '#chart' );
```

The component has the following public attributes and methods...



## Examples

To run the example code, navigate to the parent directory and start a [simple python server](https://docs.python.org/2/library/simplehttpserver.html),

``` bash
$ cd ..
$ python -m SimpleHTTPServer 9090
```

and open the following URL in your browser

```
http://127.0.0.1:9090/chart-timeseries/examples
```


## Development

To install development dependencies,

``` bash
$ make install
```

which installs [node modules](https://www.npmjs.org/) and [bower components](http://bower.io/).

> WARNING: bower components are installed in the parent directory, __not__ the component directory.

By installing components in the parent directory, we mimic a production environment, in which bower components are siblings (needed for correct relative paths). Beware, however, that this may result in conflicts with existing components. Or worse, for existing sibling components which are being developed (git repositories), completely overwriting siblings.

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

[travis-image]: http://img.shields.io/travis/figure-io/polymer-chart-timeseries/master.svg
[travis-url]: https://travis-ci.org/figure-io/polymer-chart-timeseries

[coveralls-image]: https://img.shields.io/coveralls/figure-io/polymer-chart-timeseries/master.svg
[coveralls-url]: https://coveralls.io/r/figure-io/polymer-chart-timeseries?branch=master

[dependencies-image]: http://img.shields.io/david/figure-io/polymer-chart-timeseries.svg
[dependencies-url]: https://david-dm.org/figure-io/polymer-chart-timeseries

[dev-dependencies-image]: http://img.shields.io/david/dev/figure-io/polymer-chart-timeseries.svg
[dev-dependencies-url]: https://david-dm.org/dev/figure-io/polymer-chart-timeseries

[github-issues-image]: http://img.shields.io/github/issues/figure-io/polymer-chart-timeseries.svg
[github-issues-url]: https://github.com/figure-io/polymer-chart-timeseries/issues

