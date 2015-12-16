(function () {
    window['CLogin'] = {};
    init = function (page) {
        CCore.setLocalResource();
        CCore.enterNext();
        CCore.enterSubmit('password', 'Button_SignIn');
        $("#signin .Button_SignIn").click(login);
        if (!CValidator.isNull(CStore.get("username"))) {
            $("#username").val(CStore.get("username"));
        }
        if (!CValidator.isNull(CStore.get("password"))) {
            $("#password").val(CStore.get("password"));
            $("#rememberme").attr("checked","true");
        }
        if (CValidator.isNull($("#username").val())) {
            $("#username").focus();
        } else if(CValidator.isNull($("#password").val())){
            $("#password").focus();
        }
        CCore.label("login");
        page.title = CCore.getValue("Common_SystemName")
    };
    login = function () {
        CStore.set("username", $("#username").val());
        if($("#rememberme").attr("checked")){
        	CStore.set("password", $("#password").val());
	    }else{
	    	CStore.set("password", '');
	    }
        CCore.login('login');
    };
    
    window['CLogin']['init'] = init;
})();

$(function(){
	CLogin.init(this);
});