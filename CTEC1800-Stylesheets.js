	
/* CTEC1800-Stylesheets.js */

/* JavaScript code written by Martin Stacey, provided for the CTEC 1800 Assignment.
Its purpose is to enable and disable stylesheets, either when the user moves the mouse
over or clicks on an element, uses a dropdown menu, or resizes the page.
*/

/* A copy of this file should be saved in the same folder as the web pages that it swaps stylesheets for.
It should be included in the web page with the following script element in the head of the page

<script type="text/javascript" src="CTEC1800-Stylesheets.js"></script>

NOTE THAT
<script type="text/javascript" src="CTEC1800-Stylesheets.js" />
DOES NOT WORK on all browsers
*/

/* This file provides TWO different ways to change stylesheets. METHOD ONE enables and disables
alternative stylesheets, using all the power of the HTML standards. METHOD TWO is much simpler
and cruder. It simply changes the value of the href attribute of one link element, to change the
stylesheet it points to.

Three practical differences: (1) With method one, the stylesheets are preloaded, so changing
stylesheets will happen extremely quickly. With method two, the stylesheets need to be retrieved
from the server and loaded, which may be unacceptably slow on a busy network. (2) If you use method one, 
the CSS validator will validate all the alternate stylesheets at once, instead of just the currently 
active one.(3) If you use method two, you could, if you really wanted to, do two or more entirely 
separate stylesheet-swaps, by changing the href values for different link elements, possibly to 
handle font-sizes and scale issues separately from overall appearance and layout.
*/




/* METHOD ONE */

		/* 
		Link elements for permanent stylesheets, that are active all the time, DON'T have title attributes.
		Link elements for preferred stylesheets, which are active when you start, but which you can turn
		OFF (and back on), have rel="stylesheet", and a title attribute.
		Alternative stylesheets, which start disabled, but which you can turn on,
		have rel="alternate styleheet", and a title attribute.
		
		Here is an example of a group of link elements for loading alternative stylesheets.
		
		<link rel="stylesheet" type="text/css" href="permanentCSS.css" />
		<link rel="stylesheet" type="text/css" href="alternativeCSS1.css" title="bigsheet"/>
		<link rel="alternate stylesheet" type="text/css" href="alternativeCSS2.css" title="mediumsheet"/>
		<link rel="alternate stylesheet" type="text/css" href="alternativeCSS3.css" title="smallsheet"/>
		<link rel="alternate stylesheet" type="text/css" href="alternativeCSS4.css" title="specialsheet"/>

		You turn stylesheets on and off by setting the attribute disabled to
		"false" or "true".
		*/

		/*
		The function setActiveStyle() is called to change the stylesheet.
		Its one argument is a string that is the title of the stylesheet to be activated;
		it iterates through a list of all the link elements, and enables the link element loading a
		stylesheet (if any) with a title that matches the argument, and disables all other link elements 
		with titles that load stylesheets.
		
		This is how it gets used with event attributes such as onclick and onmouseover.
		The value of an event attribute is a string that contains a piece of JavaScript code that is executed
		when the event happens.
		
		<p onmouseover="setActiveStyle('secondstyle')">Moving the mouse over this element
		activates a link element whose title is <i>secondstyle</i></p>
		
		I like auxiliary functions to make things clearer. isOptionalStyleSheet() takes one argument,
		a link element, and returns a boolean - it is true if the link loads a stylesheet and that 
		stylesheet can be enabled or disabled. activateWhenMatching() takes a link element and a
		string as arguments, and if the value of the link's title attribute matches the string,
		enables the stylesheet, and otherwise disables it.
		[indexOf looks for positions of substrings within strings.]
		*/
		
		function setActiveStyle (styletitle) {
			var stylelist = document.getElementsByTagName("link");
			for (i = 0; i < stylelist.length; i++) {
				if (isOptionalStylesheet(stylelist[i])) {
					activateWhenMatching(stylelist[i], styletitle);
				}
			}
		}
		
		function isOptionalStylesheet(thislink) {
			return (thislink.getAttribute("rel").indexOf("style") != -1) && thislink.getAttribute("title")
			}
			
		function activateWhenMatching(thislink, styletitle) {
			if (thislink.getAttribute("title") == styletitle) {
				thislink.disabled = false;
			}
			else {
				thislink.disabled = true;
			}
		}
			
		/* The function chooseStyleBySize selects the name of the stylesheet to be used according
		to the size of the browser window, and calls setActiveStyle() to activate the right stylesheet.
		It needs to be edited to fit the needs of your page. The version shown here works for the
		teaching example page 'alternative-stylesheets-method1.html'
		
		The if-statement selects the title of the link element for the stylesheet to be activated.
		The function needs to be edited according to what the titles of the link elements for the
		possible stylesheets are, and what window widths they suit. 

		The function needs to get called when the page is loaded and resized, via the onload 
		and onresize events affecting the body elements, thus:

		<body onload="chooseStyleBySize()" onresize="chooseStyleBySize()">....</body>
		*/

		/* You may get validator errors because onresize isn't recognised. Don't worry about this. */

		/* 
		document.documentElement holds the attributes of the whole page
		(which is bigger than the body).
		document.documentElement.clientWidth is the inner width of the browser window.
		document.documentElement.clientHeight is the inner height of the window.
		*/
				
		function chooseStyleBySize() {
			var theWidth = document.documentElement.clientWidth;
			if (theWidth < 800) {
				theSheet = "smallsheet";
			}
			else if (theWidth < 900) {
				theSheet = "mediumsheet";
			}
			else {
				theSheet = "bigsheet";
			}
			setActiveStyle(theSheet);
		}
		




/* METHOD TWO */

		/* The function setStyleSource() sets the href attribute of a link element to
		a new value. The function takes two strings as arguments: the value of the ID attribute 
		of the link element, and the name (or path plus name, or URL) of the CSS file.
		
		This is how it gets used to change the stylesheet to one called 'second.css':
		
		<p onclick="setStyleSource('changeable', 'second.css')">Clicking on this element
		sets the href of the link element to be <i>second.css</i></p>

		The link element needs to have an id attribute, like so:
		<link rel="stylesheet" type="text/css" href="firstStyle.css" id="changeable" />
		
		document.getElementById(theID) is the standard method in JavaScript for finding
		individual elements so that JavaScript code can do things to them.
		*/

		function setStyleSource (linkID, sourceLoc) {
			var theLink = document.getElementById(linkID);
			theLink.href = sourceLoc;
		}


		/* In order to use method two to change the stylesheet when the page is resized,
		we need the function chooseSourceBySize(), which needs to be edited to fit the
		needs of your page.
		
		The call to setStyleSource() that actually changes the stylesheet needs to include
		a hard-coded value for the ID attribute of the link element. The if-statement selects 
		the actual filename or URL of the alternative CSS files. The version supplied here 
		works for the teaching example page 'alternative-stylesheets-method2.html'
		
		The function chooseSourceBySize() needs to be called when the page is loaded and
		when the browser window is resized.
		
		<body onload="chooseSourceBySize()" onresize="chooseSourceBySize()">....</body>
		
		*/

		function chooseSourceBySize() {
			var theWidth = document.documentElement.clientWidth;
			if (theWidth < 800) {
				theSheet = "alternativeCSS3.css";
			}
			else if (theWidth < 900) {
				theSheet = "alternativeCSS2.css";
			}
			else {
				theSheet = "alternativeCSS1.css";
			}
			setStyleSource('changeSheet', theSheet);
		}
	