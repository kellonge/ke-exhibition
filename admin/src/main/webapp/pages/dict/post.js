(function (){
isAdd = true;
sequenceNo = 0;
window['CDictPost'] = {};
init = function (id, add){
	CCore.label("form_dict");
	isAdd = add;
	$("#btnSaveDict").click(save);
	var dict = CCore.getDictByID(id);
	if (id != "0") {
		$("#parentName").val(dict.name);
	} else {
		hideParent();
		$("#parentID").val("0");
	}
	if (isAdd) {
		$("#form_dict h1").html(CCore.getValue("Common_Add", "Common_DictModuler"));
		$("#parentID").val(id);
		if(id==0){
			$("#extension").val(2);
		}
		var param = {};
		param["parentID"] = id;
		var sequence = CCore.invoke(CCore.servicePath('/service/dict/getmaxsequence'), param);
		$("#sequenceNo").val(sequence); 
	} else {
		$("#form_dict h1").html(CCore.getValue("Common_Edit", "Common_DictModuler"));
		CCore.updateForm(dict);
		sequenceNo = dict.sequenceNo;
		if($("#statusName").length>0){
			var status = CCore.getDictByID(dict.statusID);
			if(!CValidator.isNull(status)){
				$("#statusName").val(status.name);
			}
			var ext = CCore.getDictByID(dict.extension);
			if(!CValidator.isNull(ext)){
				$("#extensionName").val(ext.name);
			}
		}
		if (dict.parentID == 0) {
			$("#parentName").val(CCore.getValue('Common_DictTop'));
			hideParent();
		}
	}
	
};
hideParent=function(){
	$("#parentName").hide();
	$("#parentName").parent().hide();
	$("#parentName").parent().prev().hide();
};
save = function () {
	var name = $("#name").val();
	var newSequenceNo = $("#sequenceNo").val();
	if (validate()) {
		if (CCore.postData(CCore.servicePath('/service/dict/savedict'), 'form_dict')) {
			if (isAdd) {
				var parent = CDictList.getTreeDict().getSelectedNodes()[0];
				var url = CCore.servicePath('/service/dict/getnewdict');
				var newDict = CCore.invoke(url);
				var newNode = { id: newDict.ID, name: name, pId: newDict.parentID, code: newDict.code };
				CDictList.getTreeDict().addNodes(parent, newNode);
			} else {
				var node = CDictList.getTreeDict().getSelectedNodes()[0];
				if(newSequenceNo == sequenceNo){
					node.name = name;
					CDictList.getTreeDict().updateNode(node);
				}else{
					CDictList.list();
					CDictList.getTreeDict().selectNode(node,false);
				}
			}
			$("#dict_post").html('');
		}
	}
};
validate = function () {
	if($("#parentID").val() == "0" && isAdd == true){
		if($("#extension").val()<2){
			CCore.alert(CCore.getValue("Common_DictTotalLevelHint"));
			return false;
		}
	}
	if (CValidator.checkInvalid("form_dict")) {
		return false;
	}
	return true;
};
window['CDictPost']['init']=init;

})();