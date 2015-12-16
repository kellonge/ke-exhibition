(function (){
window['CMemberPost'] = {};
init = function (id){
	$("#form_member_post .Button_Submit").click(save);
	$("#form_member_post .Button_Cancel").click(CCore.close);
	$("#username").blur(checkUser);
	CMemberCommon.fillGroup("groupID");
	CMemberCommon.fillStatus("statusID");

	if (CValidator.isNull(id)) {
		$("#form_member_post h1").html(CCore.getValue("Common_Add", "Member_Moduler"));
	} else {
		$("#form_member_post h1").html(CCore.getValue("Common_Edit", "Member_Moduler"));
		var member = CCore.getMemberByID(id);
		CCore.updateForm(member);
		$("#verifyPassword").val(member.password);

		CCore.disable("username");
		if(CCore.isAdmin(member.username)){
			CCore.disable("groupName");
		}
	}
	CCore.label("form_member_post");
};
save = function () {
	if (validate()) {
		if (CCore.postData(CCore.servicePath('/service/member/savemember'), 'form_member_post')) {
			CMemberList.list(0);
			CCore.close();
		}
	}
};
validate = function () {
	if (CValidator.checkInvalid('form_member_post')) {
		return false;
	}
	if ($("#password").val() != $("#verifyPassword").val()) {
		CCore.alert(CCore.getValue("Member_PasswordNotMatch"));
		return false;
	}
	if (checkUser()) {
		return false;
	}
	return true;
};
checkUser = function () {
	if (CValidator.isNull($("#ID").val())) {
		var param = {};
		param["username"] = $("#username").val();
		var member = CCore.invoke(CCore.servicePath('/service/member/getmemberbyusername'), param);
		if (!CValidator.isNull(member)) {
			$("#message").html(CCore.getValue("Member_UsernameNotUnique"));
			setTimeout(function () { $("#message").empty(); }, 3000);
			return true;
		}
		return false;
	}
};
window['CMemberPost']['init']=init;
})();