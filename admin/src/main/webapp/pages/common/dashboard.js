(function() {
	window['CDashboard'] = {};
	var curMenu = null;
	var Menus = null;
	init = function(page) {
		CCore.setLocalResource();
		Menus = CCore.invoke(CCore.servicePath('/service/groupmenu/getauthoritymenus'));
		var systemName = CCore.getValue("Common_SystemName");
		$("#system_name").html(systemName);
		page.title = systemName;
		var currentMember = CCore.getCurrentMember();
		$("#user").html(CCore.getValue("Common_SystemWelcome") + ",<br/>" + currentMember.username);

		$("#setting_menu,#user").click(function() {
			$("#lang_down").hide();
			$("#setting_down").slideToggle("fast");
		});
		$("#setting_down").mouseleave(function() {
			$(this).slideUp(50);
		});

		$("#lang_menu").click(function() {
			$("#setting_down").hide();
			$("#lang_down").slideToggle("fast");
		});
		$("#lang_down").mouseleave(function() {
			$(this).slideUp(50);
		});

		$("#signOut").html(CCore.getValue("Button_Exit")).click(CCore.signOut);
		$("#changepassword").html(CCore.getValue("Button_ChangePassword")).click(loadChangePassword);
		$("#profile").click(function() {
			openMemberView(currentMember.ID)
		});
		$("#help").click(loadHelp);

		loadFirstLevelMenu();

		loadDesktop();
		loadLangs();
		// loadCurrentMember();
		$(window).resize(calHeight);
		calHeight();
		$("#dashboard_menu_1_a").css("background", "#f9f9f9");
		$("#awoke_desktop").click(loadDesktop).attr("title", "我的桌面");
		$("#awoke_work").click(openAwokeWork).attr("title", "待办工作");
		$("#awoke_message").click(openAwokeMessage).attr("title", "未读消息");
		$("#awoke_online").click(openAwokeOnline).attr("title", "在线用户");
		$("#awoke_chat").click(openAwokeChat).attr("title", "即时通");
	};
	onToolbarClick = function() {
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
		var id = $(this).attr("id");
		loadMenu(id);
	}
	getTreeIDByMenuID = function(menuID) {
		for (var i = 0; i < Menus.length; i++) {
			if (Menus[i].ID == menuID) {
				var j = i + 1;
				return "dashboard_menu_" + j + "_a";
			}
		}
		return "";
	};
	openSerial = function() {
		CCore.loadModal("../serial/post.htm", 640, 240, function() {
			CSerialPost.init();
		});
	};
	openAwokeMessage = function() {
		$("#" + getTreeIDByMenuID(CDict.MenuMessage)).click();
		$("#" + getTreeIDByMenuID(CDict.MenuMessageReceive)).click();
	};
	openAwokeWork = function() {
		$("#" + getTreeIDByMenuID(CDict.MenuDesktop)).click();
	};
	openAwokeOnline = function() {
		$("#path").html("导航>在线用户");
		CCore.loadPage('main', '../member/online.htm', function() {
			COnline.init();
		});
	};
	openAwokeChat = function() {
		$("#path").html("导航>即时通");
		CCore.loadPage('main', '../chat/list.htm', function() {
			CChatList.init(true);
		});
	};
	awoke = function() {
		var members = CCore.updateOnlineStatus();
		var r = CCore.getNew();
		var awokes = r.split(',');
		if (awokes[0] > 0 && ($.trim($("#awoke_work").text()) == "0" || $.trim($("#awoke_work").text()) == "")) {
			CCore.playAudio("/scripts/audio/1.mp3", "player");
		}
		if (awokes[1] > 0 && ($.trim($("#awoke_message").text()) == "0" || $.trim($("#awoke_message").text()) == "")) {
			CCore.playAudio("/scripts/audio/2.mp3", "player");
		}
		if (awokes[2] > 0 && ($.trim($("#awoke_chat").text()) == "0" || $.trim($("#awoke_chat").text()) == "")) {
			CCore.playAudio("/scripts/audio/2.mp3", "player");
		}
		if (CValidator.isNull(awokes[0])) {
			awokes[0] = 0;
		}
		if (CValidator.isNull(awokes[1])) {
			awokes[1] = 0;
		}
		if (CValidator.isNull(awokes[2])) {
			awokes[2] = 0;
		}
		$("#awoke_work").html(awokes[0]);
		$("#awoke_message").html(awokes[1]);
		$("#awoke_online").html(members.length);
		$("#awoke_chat").html(awokes[2]);
		return awokes;
	};
	calHeight = function() {
		var height = $(window).height();
		$("#left,#right").height(height - 87);
	};
	openMemberView = function(id) {
		CCore.loadModal('../member/view.htm', 939, 480, function() {
			CMemberView.init(id);
		});
	};
	loadCurrentMember = function() {
		var member = CCore.getCurrentMember();
		CCore.setCurrentMemberID(member.ID);
		CCore.setCurrentMemberName(member.name);
		var datas = CCore.invoke(CCore.servicePath('/service/groupmenu/getgroupmenus'), {
			"groupid" : member.groupID
		});
		CCore.setCurrentMemberMenus(datas);
	};
	loadChangePassword = function() {
		CCore.loadModal("../common/changepassword.htm", 500, 240, function() {
			CChangePassword.init();
		});
	};
	loadDesktop = function() {
		CCore.loadPage('main', '../common/desktop.htm', function() {
			CDesktop.init();
		});
	};
	loadHelp = function() {
		CCore.loadModal('../common/help.htm', 500, 240, function() {
			CHelp.init();
		});
	};
	beforeClick = function(treeId, node) {
		zTree_Menu = $.fn.zTree.getZTreeObj("dashboard_menu");
		if (node.isParent) {
			if (node.level === 0) {

				var pNode = curMenu;
				while (pNode && pNode.level !== 0) {
					pNode = pNode.getParentNode();
				}
				if (node.open) {
					zTree_Menu.expandNode(node, false);
					return;
				}
				if (pNode && pNode !== node) {
					var a = $("#" + pNode.tId + "_a");
					a.removeClass("cur");
					zTree_Menu.expandNode(pNode, false);
				}
				a = $("#" + node.tId + "_a");
				a.addClass("cur");

				var isOpen = false;
				for (var i = 0, l = node.children.length; i < l; i++) {
					if (node.children[i].open) {
						isOpen = true;
						break;
					}
				}
				if (isOpen) {
					zTree_Menu.expandNode(node, true);
					curMenu = node;
				} else {
					zTree_Menu.expandNode(node.children[0].isParent ? node.children[0] : node, true);
					curMenu = node.children[0];
				}
			} else {
				zTree_Menu.expandNode(node);
			}
		}

		return !node.isParent;
	};

	loadMenu = function(pID) {
		var setting = {
			check : {
				enable : false
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				beforeClick : beforeClick
			},
			view : {
				showIcon : false,
				showLine : false,
				dblClickExpand : false
			}
		};
		var nodes = [];
		var menus = getMenusByParentID(pID);
		$.each(menus, function(i, data) {
			var memo = data.memo;
			if (CValidator.isNull(data.memo)) {
				memo = "''";
			}
			var node = {
				id : data.ID,
				pId : data.parentID,
				name : data.name
			};
			if (!CValidator.isNull(data.memo)) {
				node["click"] = "$('#path').empty();CDashboard.loadPath(" + data.ID + ");CCore.loadPage('main','" + data.extension + "',function(){" + memo + "})";
			}
			nodes.push(node);
		});
		$.fn.zTree.init($("#dashboard_menu"), setting, nodes);

		for (var i = 0; i < menus.length; i++) {
			if (menus[i].parentID == pID) {
				var f = i + 1;
				$("#dashboard_menu_" + f + "_span").attr("style", "background:url('" + SERVICE_ROOT + "/themes/default/images/menudot.gif') no-repeat 4px 12px;padding-left:26px;");
				if (isExistNext(menus[i].ID)) {
					$("#dashboard_menu_" + f + "_a").addClass("down");
				}
			}
		}
	};
	getFirstLevelMenus = function() {
		var firstMenus = [];
		for (var i = 0; i < Menus.length; i++) {
			if (Menus[i].parentID == CDict.BackendMenu) {
				firstMenus.push(Menus[i]);
			}
		}
		return firstMenus;
	};
	getMenuByID = function(menuID) {
		for (var i = 0; i < Menus.length; i++) {
			if (Menus[i].ID == menuID) {
				return Menus[i];
			}
		}
	};
	isExistNext = function(pID) {
		for (var i = 0; i < Menus.length; i++) {
			if (Menus[i].parentID == pID) {
				return true;
			}
		}
		return false;
	};
	getMenusByParentID = function(pID) {
		var menus = [];
		var p = getMenuByID(pID);
		for (var i = 0; i < Menus.length; i++) {
			if (Menus[i].code.startWith(p.code) && Menus[i].ID != pID) {
				menus.push(Menus[i]);
			}
		}
		return menus;
	};
	loadFirstLevelMenu = function() {
		var firstMenus = getFirstLevelMenus();
		var dom = "";
		for (var i = 0; i < firstMenus.length; i++) {
			dom += "<a class='m" + firstMenus[i].ID + "'  id='" + firstMenus[i].ID + "'>" + firstMenus[i].name + "</a>";
		}
		$("#toolbar_menu").html(dom);
		$("#toolbar_menu a").click(onToolbarClick);
		$("#toolbar_menu a").first().addClass("current");
		if (firstMenus.length > 0) {
			loadMenu(firstMenus[0].ID);
		}

	};
	loadPath = function(id) {
		var dict = CCore.getDictByID(id);
		if (CValidator.isNull($("#path").html())) {
			$("#path").html(dict.name);
		} else {
			$("#path").html(dict.name + " > " + $("#path").html());
		}
		if (dict.parentID != "0") {
			loadPath(dict.parentID);
		}
	};

	loadLangs = function() {
		var langs = CCore.getLangs();
		var dom = "";
		for (var i = 0; i < langs.length; i++) {
			dom += "<li data='" + langs[i].ID + "'>" + langs[i].name + "</li>";
		}
		var currentLang = CCore.getLangByID();
		$("#lang_menu").html(currentLang.name);
		$("#lang_down").html(dom);
		$("#lang_down li").click(function() {
			CCore.changeLang($(this).attr("data"));
			$("#lang_menu").html($(this).html());
		});
	};
	getDepartments = function() {
		var depts = CCore.getAllDicts(CDict.Group);
		var fliteredDept = [];
		for (var i = 0; i < depts.length; i++) {
			if (depts[i].statusID == CDict.OrganizationTypeDepartment) {
				fliteredDept.push(depts[i]);
			}
		}
		return fliteredDept;
	};
	getCompanys = function() {
		return CCore.getNextDicts(CDict.Group);
	};
	loadDepartments = function(controlID, callback) {
		CDictPick.init(controlID, CDict.Group, false, -1, callback, true);
	};
	window['CDashboard']['init'] = init;
	window['CDashboard']['loadPath'] = loadPath;
	window['CDashboard']['loadMenu'] = loadMenu;
	window['CDashboard']['getDepartments'] = getDepartments;
	window['CDashboard']['getCompanys'] = getCompanys;
	window['CDashboard']['loadDepartments'] = loadDepartments;
})();

$(function() {
	CDashboard.init(this);
});