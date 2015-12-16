(function (){
window['CGroupMenu'] = {};
init = function (){
	bindLabel();
	$("#btnSaveGroupMenu").click(saveGroupMenu);
	fillGroups()
};
fillGroups = function(){
	var setting = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: onGroupClick
		}
	};
	var nodes = [];
	var datas = CCore.getAllDicts(CDict.Group);
	$.each(datas, function (i, data) {
		var isOpen = false;
		if(data.code.length<=20){
			isOpen = true;
		}
		var node = {open:true, id: data.ID, pId: data.parentID, name: data.name, open: isOpen };
		nodes.push(node);
	});
	$.fn.zTree.init($("#group"), setting, nodes);

	var nodeGroups = $.fn.zTree.getZTreeObj("group").getNodes();
	if (nodeGroups.length > 0) {
		$.fn.zTree.getZTreeObj("group").selectNode(nodeGroups[0]);
		fillMenus(nodeGroups[0].id);
	}
}
fillMenus = function (groupid) {
	$("#menus").html("");
	var setting = {
		check:{
			enable: true, chkboxType: { "Y": "ps", "N": "s" }
		},
		data: {
			key: { title: "title" }, simpleData: { enable: true }
		},
		view: {showIcon: false},
		callback:{onClick: onMenuClick,onCheck: onMenuCheck}
	};
	var allMenus = CCore.invoke(CCore.servicePath('/service/groupmenu/getallmenus'));
	var param = {};
	param["groupid"] = groupid;
	var groupMenus = CCore.invoke(CCore.servicePath('/service/groupmenu/getgroupmenus'), param);
	var nodes = [];
	for (var i = 0; i < allMenus.length; i++) {
		var checked = false;
		if (CCore.contain(groupMenus, allMenus[i].ID.toString())) {
			checked = true;
		}
		var node = {open: true, id: allMenus[i].ID, pId: allMenus[i].parentID, name: allMenus[i].name, checked: checked, title: allMenus[i].name };
		nodes.push(node);
	}
	$.fn.zTree.init($("#menus"), setting, nodes);
};
bindLabel = function () {
	$("#lblGroup").html(CCore.getValue("Member_Group"));
	$("#lblFunction").html(CCore.getValue("Common_Function"));
	$("#btnSaveGroupMenu").html(CCore.getValue("Button_Submit"));
};
saveGroupMenu = function () {
	var menus = "";
	$.each($.fn.zTree.getZTreeObj("menus").getCheckedNodes(true), function (i, menu) {
		menus += menu.id + ",";
	});
	if (menus.endWith(",")) {
		menus = menus.substring(0, menus.length - 1);
	}
	var param = {};
	param["groupid"] = $.fn.zTree.getZTreeObj("group").getSelectedNodes()[0].id;
	param["menus"] = menus;
	CCore.invoke(CCore.servicePath('/service/groupmenu/savegroupmenu'), param);
	//CCore.alert(CCore.getValue("Common_SaveSuccess"));
};
onMenuClick = function (event, treeId, treeNode, clickFlag) {
	$.fn.zTree.getZTreeObj("menus").expandNode(treeNode);
};
onGroupClick = function (e, treeId, treeNode) {
	$.fn.zTree.getZTreeObj("group").checkNode(treeNode, !treeNode.checked, null, true);
	fillMenus(treeNode.id);
};
onMenuCheck = function (event, treeId, treeNode, clickFlag) {
	saveGroupMenu();
};
window['CGroupMenu']['init']=init;
})();
