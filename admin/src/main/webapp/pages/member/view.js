(function (){
	window['CMemberView'] = {};
	init = function (id){
		var member = CCore.getMemberByID(id);
		CCore.view('form_member_view', member);
	};
	window['CMemberView']['init']=init;
})();