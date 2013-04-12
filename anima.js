var
scrollAmount,
We,
elms = [
	{
		oname	: ".item-a",
		oprops	: {
		
			sx : 365,
			sy : 99,
			ex : 891,
			ey : 37,
			sr : 0,
			er : -180 
		}
	},
	{
		oname: ".item-b",
		oprops: {

			sx : 68,
			sy : 55,
			ex : -500,
			ey : 55,
			sr : 0,
			er : 0
		}
	}
];

function getDelta(a,b)
{					
	if (a > b)
	{
		return (a - b) * -1;
	}
	else
	{
		return (b - a);
	}
}

function setPositions()	//	on window resize
{
	We = ($(window).width() - $("#container").width()) / 2;
	wW = $(window).width();

	$(".hero-unit").css({"width": wW});
	
	for (var p=0;p < elms.length; p++)
	{
		$(elms[p].oname).css({'left': We + elms[p].oprops.sx + 'px','top': elms[p].oprops.sy + 'px'})
	}
}


$(document).ready(function(){

    $(".item-a").click(function(){
    	location.href = "www.tonyhaddon.com";
	});

    //	add delta info to each object
	for (var p=0;p < elms.length; p++)
	{
		elms[p].oprops.xd = getDelta(elms[p].oprops.sx,elms[p].oprops.ex);
		elms[p].oprops.yd = getDelta(elms[p].oprops.sy,elms[p].oprops.ey);
		elms[p].oprops.rd = getDelta(elms[p].oprops.sr,elms[p].oprops.er);
	}
    				

	setPositions();
	
	$(window).resize(setPositions);

	maxScroll = $(".hero-unit").height() + 91;

	$(window).scroll(function() {

	        scrollAmount = $(window).scrollTop();
			if (scrollAmount < maxScroll)
			{                             	
				scrollPercentage = scrollAmount / maxScroll;   //	Between 0 and 1 

				for (var p=0;p < elms.length; p++) 
				{
					
					$(elms[p].oname).css({'top': elms[p].oprops.sy + (elms[p].oprops.yd*scrollPercentage)});
					$(elms[p].oname).css({'left': We + elms[p].oprops.sx + (elms[p].oprops.xd*scrollPercentage)});
					var tsr = elms[p].oprops.sr + (elms[p].oprops.rd*scrollPercentage);
  					$(elms[p].oname).css({
  						'-webkit-transform': 'rotate(' + tsr + 'deg)',
                        '-moz-transform': 'rotate(' + tsr + 'deg)',
                        '-ms-transform': 'rotate(' + tsr + 'deg)',
                        '-o-transform': 'rotate(' + tsr + 'deg)',
                        'transform': 'rotate(' + tsr + 'deg)',
                        'zoom': 1});

				}
			}
	});
});