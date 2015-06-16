'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// OBSERVER //

/**
* FUNCTION: titleChanged( newVal, oldVal )
*	Event handler invoked when the `title` property changes.
*
* @param {String} newVal - new value
* @param {String} oldVal - old value
*/
function titleChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var err;
	if ( !isString( newVal ) ) {
		err = new TypeError( 'title::invalid assignment. Must be a string primitive. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.title = oldVal;
		return;
	}
	if ( this.autoUpdate ) {
		this.$.title.text( newVal );
	}
	this.fire( 'changed', {
		'attr': 'title',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION titleChanged()


// EXPORTS //

module.exports = titleChanged;
