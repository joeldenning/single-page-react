(function(root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('react'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['react'], factory);
    } else {
        // Browser globals
        factory(root.React);
    }
}(this, function(React) {

	'use strict';

	React.Router = {}
	React.Router.routes = {}
	var reactCreateClass = React.createClass
	var mountedRoute

	React.Router.DomReady = function() {
		React.Router.routedElement = document.body
		React.Router.DomReady = true
		React.Router.route()
	}

	/**
	* Override React.createClass to intercept any routing information. Then proceed to call the standard 
	* React createClass function.
	*/
	React.createClass = function(classDefn) {
		if( typeof classDefn !== "object" )
			throw "In order to create a class, you must provide a class definition"
		var reactClass = reactCreateClass(classDefn)
		if( classDefn.route ) {
			React.Router.routes[classDefn.route] = reactClass
			React.Router.route()
		}
		return reactClass
	}

	React.Router.route = function() {
		if( React.Router.DomReady !== true )
			return
		var route, props
		if( window.location.hash.indexOf('?') >= 0 ) {
			route =  window.location.hash.substr(1, window.location.hash.indexOf('?')-1)
			var pairs = window.location.hash.substr(window.location.hash.indexOf('?')+1).split('&')
			props = {}
			for( var i=0; i<pairs.length; i++ ) {
				var pair = pairs[i]
				var equalsIndex = pair.indexOf('=')
				if( equalsIndex < 0 )
					props[pair] = true
				else
					props[pair.substr(0, equalsIndex)] = pair.substr(equalsIndex+1)
			}
		} else {
			route = window.location.hash.substr(1)
			props = null
		}

		if( route === mountedRoute )
			return
		var reactClass = React.Router.routes[route]
		if( reactClass ) {
			React.renderComponent(reactClass(props), React.Router.routedElement)
			mountedRoute = route
		}
	}

	//routing functions
	window.onhashchange = function(event) {
		if( React.Router.DomReady === true )
			React.Router.route()
	}

	/*!
	 * contentloaded.js
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 *
	 */

	// @win window reference
	// @fn function reference
	(function contentLoaded(win, fn) {

		var done = false, top = true,

		doc = win.document,
		root = doc.documentElement,
		modern = doc.addEventListener,

		add = modern ? 'addEventListener' : 'attachEvent',
		rem = modern ? 'removeEventListener' : 'detachEvent',
		pre = modern ? '' : 'on',

		init = function(e) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},

		poll = function() {
			try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

		if (doc.readyState == 'complete') fn.call(win, 'lazy');
		else {
			if (!modern && root.doScroll) {
				try { top = !win.frameElement; } catch(e) { }
				if (top) poll();
			}
			doc[add](pre + 'DOMContentLoaded', init, false);
			doc[add](pre + 'readystatechange', init, false);
			win[add](pre + 'load', init, false);
		}

	}(window, React.Router.DomReady));

	return React
}));