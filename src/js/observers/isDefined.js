'use strict';

/**
* FUNCTION: isDefinedChanged( newVal, oldVal )
*	Event handler invoked when the `isDefined` attribute changes.
*
* @param {Function} newVal - new value
* @param {Function} oldVal - old value
*/
function isDefinedChanged( newVal, oldVal ) {
	/* jshint validthis:true */
	var selection = this.$.paths,
		line = this._line,
		err;
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'isDefined::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.isDefined = oldVal;
		return;
	}
	line.defined( newVal );

	if ( this.autoUpdate ) {
		selection.attr( 'd', line );
	}
	this.fire( 'changed', {
		'attr': 'isDefined',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION isDefinedChanged()


// EXPORTS //

module.exports = isDefinedChanged;
