(function (){
window['CChangePassword'] = {};
init = function (){
	CCore.label('form_changepassword');
	bindEvent();
};
bindEvent = function () {
	$("#btnChangePassword").click(change);
	$("#btnCancelPassword").click(CCore.close);
};
validate = function () {
	if (CValidator.checkInvalid('form_changepassword')) {
		return false;
	}
	if ($("#newPassword").val() != $("#verfyNewPassword").val()) {
		CCore.alert(CCore.getValue("Member_PasswordNotMatch"));
		return false;
	}
	return true;
};
change = function () {
	if (validate()) {
		if (CCore.postData(CCore.servicePath('/service/member/changepassword'), 'form_changepassword')) {
			CCore.close();
			CCore.alert(CCore.getValue("Member_PasswordModefySuccess"));
		}
	}
};
window['CChangePassword']['init']=init;
})();