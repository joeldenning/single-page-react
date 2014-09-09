single-page-react
=================

A lightweight, straightforward plugin for creating single page apps with [ReactJS](http://facebook.github.io/react/).

##Concept

Making a single page app built with React doesn't need to be complicated. There's no need to bring in Backbone if you don't want to. Single-page-react provides you a straightforward way to route URLs to specific React components.

##What single-page-react does

Single-page-react chooses one of your React components and inserts it into the DOM.

#####Which React component is inserted into the DOM?

The one whose <code>route</code> attribute matches the current URL hash.

#####Where in the DOM will my React component be inserted?

Into the element whose id is stored in the <code>React.Router.routedElement</code> variable. By default, this is <code>document.body</code>.

#####What happens when I change the page's hash?

Single-page-react will replace the React component inside of routedElement with the React component whose <code>route</code> attribute matches the hash. Take advantage of React virtual DOM diffing by reusing components; this way re-routing can be almost instantaneous!

#####Can I pass variables to my <code>routedElement</code>?

Yes. The key-value pairs in the URL query are given to your React component via the <code>this.props</code> variable. 

##Example

home.jsx
    
    /** @jsx React.DOM */

    var Home = React.createClass({
    	render: function() {
    		return (
    			<div>
    				{this.props.prop1}
    			</div>
    		);
    	},
    
        //When the URL hash is '#home', mount this component into the routedElement.
    	route: 'home' 
    });
    
index.html

    <html>
    	<head>
    		
    		<!-- Bring in React and single-page-react dependencies as globals -->
    		<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.11.1/react.js"></script>
    		<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.11.1/JSXTransformer.js"></script>
    		<script src="single-page-react.js"></script>
    	  
    		<!-- Set which DOM element to insert React components into -->
    		<script>
      			React.Router.routedElement = document.body //or whatever element you prefer
            </script>  
    
  	        <!-- Bring in the home react component -->
    	    <script src="home.jsx" type="text/jsx"></script>
    		
    	</head>
    
    	<body>
    		This text is replaced by routed React components. For example, when the url 
    		ends with #home?prop1=customValue, this text will be replaced by a div whose
    		content is 'customValue'
    	</body>
    </html>
