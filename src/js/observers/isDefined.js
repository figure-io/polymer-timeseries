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
	var err;
	if ( oldVal === void 0 ) {
		return;
	}
	if ( typeof newVal !== 'function' ) {
		err = new TypeError( 'isDefined::invalid assignment. Must be a function. Value: `' + newVal + '`.' );
		this.fire( 'err', err );
		this.isDefined = oldVal;
		return;
	}
	this._line.defined( newVal );
	if ( this.autoUpdate ) {
		this.$.paths.attr( 'd', this._line );
	}
	this.fire( 'changed', {
		'attr': 'isDefined',
		'prev': oldVal,
		'curr': newVal
	});
} // end FUNCTION isDefinedChanged()


// EXPORTS //

module.exports = isDefinedChanged;
