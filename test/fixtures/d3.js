/**
*
*	FIXTURE: d3
*
*
*	DESCRIPTION:
*		- Stubs d3.
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

'use strict';

// D3 //

/**
* FUNCTION: D3()
*	D3 constructor.
*
* @constructor
* @returns {D3} D3 instance
*/
function D3() {
	this._select = null;
	this._selectAll = null;
	this._append = null;
	this._attr = {};
	this._data = null;
	this._html = null;
	this._text = null;
	this._call = null;
	this._range = null;
	this._listeners = {};
	this._classed = {};
	return this;
} // end FUNCTION D3()

/**
* METHOD: select()
*	Stubs select.
*/
D3.prototype.select = function( selection ) {
	this._select = selection;
	return this;
}; // end METHOD select()

/**
* METHOD: selectAll()
*	Stubs selectAll.
*/
D3.prototype.selectAll = function( selection ) {
	this._selectAll = selection;
	return this;
}; // end METHOD selectAll()

/**
* METHOD: append()
*	Stubs append.
*/
D3.prototype.append = function( str ) {
	if ( !arguments.length ) {
		return this._append;
	}
	this._append = str;
	return this;
}; // end METHOD append()

/**
* METHOD: attr( prop[, value] )
*	Stubs attr.
*/
D3.prototype.attr = function( prop, value ) {
	if ( arguments.length < 2 ) {
		return this._attr[ prop ];
	}
	this._attr[ prop ] = value;
	return this;
}; // end METHOD attr()

/**
* METHOD: classed( name[, value] )
*	Stubs classed.
*/
D3.prototype.classed = function( name, value ) {
	if ( arguments.length < 2 ) {
		return this._classed[ name ];
	}
	this._classed[ name ] = value;
	return this;
}; // end METHOD classed()

/**
* METHOD: data()
*	Stubs data.
*/
D3.prototype.data = function( data ) {
	if ( !arguments.length ) {
		return this._data;
	}
	this._data = data;
	return this;
}; // end METHOD data()

/**
* METHOD: text()
*	Stubs text.
*/
D3.prototype.text = function( text ) {
	if ( !arguments.length ) {
		return this._text;
	}
	this._text = text;
	return this;
}; // end METHOD text()

/**
* METHOD: html()
*	Stubs html.
*/
D3.prototype.html = function( html ) {
	if ( !arguments.length ) {
		return this._html;
	}
	this._html = html;
	return this;
}; // end METHOD html()

/**
* METHOD: enter()
*	Stubs enter.
*/
D3.prototype.enter = function() {
	return this;
}; // end METHOD enter()

/**
* METHOD: exit()
*	Stubs exit.
*/
D3.prototype.exit = function() {
	return this;
}; // end METHOD exit()

/**
* METHOD: remove()
*	Stubs remove.
*/
D3.prototype.remove = function() {
	return this;
}; // end METHOD remove()

/**
* METHOD: call()
*	Stubs call.
*/
D3.prototype.call = function( fcn ) {
	if ( !arguments.length ) {
		return this._call;
	}
	this._call = fcn;
	return this;
}; // end METHOD call()

/**
* METHOD: range( len )
*	Stubs range.
*/
D3.prototype.range = function( len ) {
	if ( !arguments.length ) {
		return this._range;
	}
	this._range = len;
	return [0,1,2];
}; // end METHOD range()

/**
* METHOD: on( name, clbk )
*	Stubs on.
*/
D3.prototype.on = function( name, clbk ) {
	if ( arguments.length < 2 ) {
		return this._listeners[ name ];
	}
	this._listeners[ name ] = clbk;
	return this;
}; // end METHOD on()

/**
* FUNCTION: time()
*
*/
function Time() {
	if ( !(this instanceof Time) ) {
		return new Time();
	}
	this._format = null;
	this._domain = null;
	this._range = null;
	return this;
}

Time.prototype.scale = function() {
	return this;
};

Time.prototype.format = function( fmt ) {
	if ( !arguments.length ) {
		return this._format;
	}
	this._format = fmt;
	return this;
};

Time.prototype.domain = function( domain ) {
	if ( !arguments.length ) {
		return this._domain;
	}
	this._domain = domain;
	return this;
};

Time.prototype.range = function( range ) {
	if ( !arguments.length ) {
		return this._range;
	}
	this._range = range;
	return this;
};

/**
* METHOD: time
*	Stubs time.
*/
D3.prototype.time = new Time();

/**
* FUNCTION: scale()
*
*/
function Scale() {
	if ( !(this instanceof Scale ) ) {
		return new Scale();
	}
	this._domain = null;
	this._range = null;
	return this;
}

Scale.prototype.linear = function() {
	return this;
};

Scale.prototype.domain = function( domain ) {
	if ( !arguments.length ) {
		return this._domain;
	}
	this._domain = domain;
	return this;
};

Scale.prototype.range = function( range ) {
	if ( !arguments.length ) {
		return this._range;
	}
	this._range = range;
	return this;
};


/**
* METHOD: scale
*	Stubs scale.
*/
D3.prototype.scale = new Scale();

/**
* FUNCTION: SVG()
*
*/
function SVG() {
	if ( !(this instanceof SVG) ) {
		return new SVG();
	}
	this._scale = null;
	this._orient = null;
	this._tickFormat = null;
	this._ticks = null;
	this._x = null;
	this._y = null;
	this._defined = null;
	this._interpolate = null;
	this._tension = null;
}

SVG.prototype.axis = function() {
	return this;
};

SVG.prototype.line = function() {
	return this;
};

SVG.prototype.scale = function( scale ) {
	if ( !arguments.length ) {
		return this._scale;
	}
	this._scale = scale;
	return this;
};

SVG.prototype.orient = function( orient ) {
	if ( !arguments.length ) {
		return this._orient;
	}
	this._orient = orient;
	return this;
};

SVG.prototype.tickFormat = function( fmt ) {
	if ( !arguments.length ) {
		return this._tickFormat;
	}
	this._tickFormat = fmt;
	return this;
};

SVG.prototype.ticks = function( ticks ) {
	if ( !arguments.length ) {
		return this._ticks;
	}
	this._ticks = ticks;
	return this;
};

SVG.prototype.x = function( foo ) {
	if ( !arguments.length ) {
		return this._x;
	}
	this._x = foo;
	return this;
};

SVG.prototype.y = function( foo ) {
	if ( !arguments.length ) {
		return this._y;
	}
	this._y = foo;
	return this;
};

SVG.prototype.defined = function( foo ) {
	if ( !arguments.length ) {
		return this._defined;
	}
	this._defined = foo;
	return this;
};

SVG.prototype.interpolate = function( opt ) {
	if ( !arguments.length ) {
		return this._interpolate;
	}
	this._interpolate = opt;
	return this;
};

SVG.prototype.tension = function( opt ) {
	if ( !arguments.length ) {
		return this._tension;
	}
	this._tension = opt;
	return this;
};

/**
* METHOD: svg
*	Stubs svg.
*/
D3.prototype.svg = new SVG();


// EXPORTS //

module.exports = function createD3() {
	return new D3();
};
