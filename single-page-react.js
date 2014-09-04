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
			React.Router.Route()
		}
		return reactClass
	}

	React.Router.Route = function() {
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

		var reactClass = React.Router.routes[route]
		if( reactClass ) {
			React.renderComponent(reactClass(props), document.body)
		} else {
			throw "No route found for '"+route+"'"
		}
	}

	window.onhashchange = function(event) {
		React.Router.Route();
	}

	return React
}));