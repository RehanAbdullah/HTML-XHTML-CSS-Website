/* THE JAVASCRIPT NEEDED TO MAKE A WEB PAGE RESIZE ITSELF TO FIT THE BROWSER WINDOW

	Written by Martin Stacey of De Montfort University, for his students
*/

/* Read these before trying to build fully scalable layouts in ems
	http://filamentgroup.com/lab/how_we_learned_to_leave_body_font_size_alone/
	http://pitchandtone.co.nz/post/3147999436/so-that-bug
*/

/* CREATING A SCALABLE LAYOUT */

/* The accessibility advocates are telling us that it's important to design pages that
can be resized to fit user needs. Sizes expressed in ems or rems can be altered to
make the page bigger or smaller, while sizes in pixels are fixed. So (in theory) if
you express all your sizes in your CSS in ems or rems, your page can be resized.

This is becoming increasingly important (1) because more and more web usage is done
with mobile devices with small screens; and (2) because these devices have wildly
different dot pitches, so that you can't safely map pixel-size to centimetres-size;
and (3) there is a quite rapid change, at least for smartphones and tablets, towards
screens with much higher dot pitches, so that scalability is important for future
proofing your pages.

However, scaling is liable to be glitchy, because font sizes don't change smoothly;
so you need to test to make sure that your screen designs actually work for all the
plausible font sizes, for all the likely browsers and operating systems.
*/

/*	EM or REM for SIZES?

	Should you use rem units instead of em units ?
	Sizes in rems [e.g. p {font-size: 1.3rem}] are relative to the font-size for the
	HTML element and not to the font-size for the surrounding block. This makes figuring
	how big your sizes should be, as you don't need to care what's nested in what.
	However rems are only supported by relatively recent browsers (IE9 onwards for MS)
	See
	http://snook.ca/archives/html_and_css/font-size-with-rem
	http://caniuse.com/rem
	http://filamentgroup.com/lab/on_ems_and_rems/
	*/

/* SMOOTH OR STEPWISE SCALING */

	/* This code can be used to resize HTML pages either smoothly, so that the page width
	exactly matches the window width, or in steps, so that the page width corresponds to
	the largest base font size in integer numbers of pixels that will fit within the
	window. The stepwise scaling works on the assumption that used to be correct that real
	font sizes are integer numbers of pixels (IE11 and FF26 on Windows 7 do not behave like 
	IE9 and FF15 on Windows XP - non-integer pixel size changes are approximated pretty well).
	The trouble with smooth scaling is that font sizes get
	approximated, and this has the consequence that the layout of the text varies (and 
	so does anything that depends on the layout of the text). This is much less dramatic
	on W7, but the problem has not disappered altogether. Scaling so that the base
	font-size for the HTML element corresponds to an integer number of pixels has the
	advantage that the page size only changes when the standard size 1.0 text font changes,
	and all other font-sizes only change when the size 1.0 text font changes.
	The disadvantage of course is that a fixed width content block can't always occupy the
	whole of the screen, so you get some margins unless you use percentage sizes which 
	seem to give rounding error problems in IE. Unfortunately, even though the code here
	works fine, the different real fonts used to approximate different size choices for the
	same requested font differ in aspect ratios, so the layout of text changes a bit for
	different sizes, so we don't get perfect scaling whatever we do. (Again, much less of
		a problem in W7 but scaling isn't flawless.)
	*/
	
	/* My current advice is to use smooth scaling, as the jerkiness and dramatic changes
	 * I saw with IE9 and FF15 under Windows XP aren't really there any more in my tests 
	 * with IE11 and FF26 under w7. However you should test for the
	 * likely range of hardware, operating systems and window sizes to check that the 
	 * small layout changes you'll still get don't have really bad effects.
	 */

/* THE CODE AND HOW IT WORKS

			If we've designed a scalable layout, we've done all our arithmetic in ems. 
			The essential decision is how wide a layout we want when we have a standard
			16px font. 1em is 16 pixels when the body font-size property is 1.0em, 
			so 50 corresponds to 800 pixels at the default font-size. 
			We then change the font-size property of body to grow everything by an 
			appropriate scale factor. We can set a minimum size parameter for the smallest
			body font-size, hence smallest width in pixels, the page is allowed to have
			before it stops shrinking and starts requiring horizontal scrolling.
			*/
			

			/* 	The idea is that the following three parameter values are the only values
			that get altered when editing this code for a new application. Alternatively,
			the onload and onresize event properties could just call computeResize() with
			appropriate parameter values.
			
			blockwidth is the width in ems of the content block we need to accommodate.
			(The example page I've produced to demonstrate scalable layouts has a div around 
			everything with a width of 50ems, hence blockwidth = 50)

			minmargin is the size of the margin at the sides of the content block.
			minmargin = 0 seems to work fine when we're not trying to do any clever
			rounding of the requested font-size. It should be zero if the blockwidth value 
			corresponds to the width of the entire page.
			
			The wide parameter value in computeResize() is blockwidth + ( 2 * minmargin).
			
			minsize is the smallest value for body font-size that the page is allowed to have, 
			in pixels. 8 is really pushing it; 10 is probably wiser. minsize uses pixels rather
			than ems because pixels are easier to think about as integers rather than
			ems as fractions of 16, when real font sizes are integer numbers of pixels.
			*/

/*	HOW TO CALL THE CODE

	The code needs to be triggered by the onload event and the onresize event;
	onresize isn't considered valid XHTML Strict, but don't worry about that.

	(1) Include the following line in the head of your HTML document
			<script type="text/javascript" src="CTEC1412-Resize.js"></script>

	(2) Either 
	
		(A) Edit the parameters in the smoothresize function in this file, and call
			smoothresize() from your html without parameters; 
			
			<body onload="smoothresize()" onresize="smoothresize()">
			
		(B) Edit the parameters in the stepresize function in this file, and call
			stepresize() from your html without parameters; 
			
			<body onload="stepresize()" onresize="stepresize()">
			
		(C) Call computeResize() from your html code with three parameters:
			(1) the width in ems you've designed your page to have
			(2) the minimum base font-size in pixels you're prepared to accept before 
			the page refuses to get any smaller and starts scrolling horizontally.
			(A minimum font size of 8 is the smallest sane value.)
			(3) boolean true for stepwise resizing, false for smooth resizing.
			<body onload="computeResize(50, 8, true)" onresize="computeResize(50, 8, true)">
*/


/* FUNCTIONS FOR PARAMETER-FREE CALLS */

/* 			Use these and set the variable values to whatever is needed 
			when you don't want to put your parameter values into the HTML code;
			this would be sensible when you want to control the parameter values once for
			several/many pages. These functions set values for blockwidth, minmargin, and
			minsize, and then call computeResize() with appropriate values.
			*/

			/* For smooth resizing, with consequent variable font layouts */

			
			function smoothresize() {
				blockwidth = 50;
				minmargin = 0;
				minsize = 12;
				emwidth = (minmargin * 2) + blockwidth;
				computeResize(emwidth, minsize, false)
			}

			/* For resizing by scale factors corresponding to real font sizes that
			are an integer number of pixels */

			function stepresize() {
				blockwidth = 50;
				minmargin = 3;
				minsize = 8;
				emwidth = (minmargin * 2) + blockwidth;
				computeResize(emwidth, minsize, true)
			}
			
/* THE FUNCTIONS THAT DO THE WORK */

			/*
			computeResize() takes three arguments 
			(1) wide - the width it's scaling for, in ems, 
			(2) minsize - the minimum permitted font-size, in pixels,
			(3) jerk - a boolean for whether nor not resizing should be done stepwise 
			(true) or smoothly (false).
			It sets the base font-size value for the html page.
			*/
						
			/* Looks up the width of the window in pixels. Computes the size in pixels that 
			the font ought to be, given the ratio of the desired width in ems to the actual
			width in pixels. Calls calculateEmsize to get the actual fontsize in ems.
			Sets the font-size property of the html element to be this value; setting the
			value for the html element means that this value acts as the base for scaling all 
			sizes in rems.
			getElementsByTagName returns a list of all the elements of a particular type; 
			there's just one html element, at index zero.
			*/
			
			function computeResize(wide, minsize, jerk) {
				windowpixels = document.documentElement.clientWidth;
				pixelsize = windowpixels / wide;
				emsize = calculateEmsize(pixelsize, minsize, jerk);
				b = document.getElementsByTagName('html')[0];
				b.style.fontSize = emsize + "em";
			}
			
			/* calculateEmsize takes as arguments 
			(1) psize - the desired scaling ratio of pixels to ems,
			(2) minsize - the smallest permissible font-size in pixels, 
			(3) jerk - a boolean determining whether the scaling should be stepwise (true) or
			smooth (false)
			It returns the required font-size scaling factor.
			
			Parameter value raw is the ratio of the window width in pixels to the intended 
			page width in ems. A value of 16 for r would correspond to page width and window
			width matching perfectly at the default font-size.
			
			The result is the desired scale factor in ems. 
			If jerk is false, this is computed by just dividing r by 16.
			If jerk is true, this is computed by rounding r down to the nearest lower
			integer, so that the scaling factor matches the real font size that will be used
			on the page.
			
			/*One thing we can do is enforce a minimum size to stop the text getting 
			impossibly small, so this function needs a second parameter: 
			minsize is the minimum permitted font-size value in pixels. 
			The function calculateEmsize uses whichever is the larger of psize and minsize.
			 */
			
			function calculateEmsize(psize, minsize, jerk) {
				if (psize > minsize) {
					raw = psize;
				}
				else {
					raw = minsize;
				}
				if (jerk) {
					result = ((Math.floor(raw)) / 16);
				}
				else {
					result = raw / 16;
				}
				return result
			}


