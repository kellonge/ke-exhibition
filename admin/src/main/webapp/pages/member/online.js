(function (){
window['COnline'] = {};
init = function (){
	list();
};
openView=function (id) {
	CCore.loadModal('../member/view.htm', 939, 480, function () { CMemberView.init(id); });
};
list=function () {
	var members = CCore.updateOnlineStatus();
	CCore.processList("OnlineResult","OnlineResultTemplate", members);
};

window['COnline']['init'] = init;
window['COnline']['openView'] = openView;
})();