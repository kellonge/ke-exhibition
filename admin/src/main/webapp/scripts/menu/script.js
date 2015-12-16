var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

function cssmenu_open(){	
	cssmenu_canceltimer();
	cssmenu_close();
	ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
}
function cssmenu_close(){
	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}
function cssmenu_timer(){
	closetimer = window.setTimeout(cssmenu_close, timeout);
}
function cssmenu_canceltimer(){	
	if(closetimer){
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}
$(document).ready(function () {
    $('#cssmenu > li').bind('mouseover', cssmenu_open);
    $('#cssmenu > li').bind('mouseout', cssmenu_timer);
});
document.onclick = cssmenu_close;
