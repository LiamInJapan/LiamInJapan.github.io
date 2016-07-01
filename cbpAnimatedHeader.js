/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

var cbpAnimatedHeader = {
	docElem: document.documentElement,
	header: document.querySelector( '.navbar-fixed-top' ),
	didScroll: false,
	changeHeaderOn: 200,

	listener: function( event ) {
		if( !cbpAnimatedHeader.didScroll ) {
			cbpAnimatedHeader.didScroll = true;
			setTimeout( cbpAnimatedHeader.scrollPage, 250 );
		}
	},

	scrollPage: function() {
		var sy = cbpAnimatedHeader.scrollY();
		header = document.querySelector( '.navbar-fixed-top' );
		if ( sy >= cbpAnimatedHeader.changeHeaderOn ) {
			classie.remove( header, 'navbar-expanded' );
		}
		else {
			classie.add( header, 'navbar-expanded' );
		}
		cbpAnimatedHeader.didScroll = false;
	},

	scrollY: function() {
		return window.pageYOffset || cbpAnimatedHeader.docElem.scrollTop;
	},


	init: function() {
		window.addEventListener( 'scroll', cbpAnimatedHeader.listener , false );
	},

	remove: function() {
		window.removeEventListener( 'scroll', cbpAnimatedHeader.listener , false );
	}
}

cbpAnimatedHeader.init();