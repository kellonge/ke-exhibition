String.prototype.endWith = function(s) {
	if (s == null || s == '' || this.length == 0 || s.length > this.length) {
		return false;
	}
	;
	if (this.substring(this.length - s.length) == s) {
		return true;
	} else {
		return false;
	}
	;
	return true;
};

String.format = function() {
	if (arguments.length == 0)
		return null;
	var str = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};
String.prototype.firstToUpper = function() {
	try {
		var len = this.length;
		var str = "";
		str = this.substring(0, 1).toUpperCase() + this.substring(1, len);
	} catch (err) {
		return "";
	}
	return str;
};
String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length) {
		return false;
	}
	if (this.substr(0, s.length) == s) {
		return true;
	} else {
		return false;
	}
	return true;
};

String.prototype.toValidJson = function() {
	var v = this;
	if (v != undefined && v != null && v != "") {
		v = escape(v);
		v = v.replace(/\+/g, "%2B");
	}
	return v;
};

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")),
				replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};

String.prototype.padLeft = function(totalWidth, paddingChar) {
	if (paddingChar != null) {
		return this.padHelper(totalWidth, paddingChar, false);
	} else {
		return this.padHelper(totalWidth, ' ', false);
	}
};

String.prototype.padRight = function(totalWidth, paddingChar) {
	if (paddingChar != null) {
		return this.padHelper(totalWidth, paddingChar, true);
	} else {
		return this.padHelper(totalWidth, ' ', true);
	}
};

String.prototype.padHelper = function(totalWidth, paddingChar, isRightPadded) {
	if (this.length < totalWidth) {
		var paddingString = new String();
		for (i = 1; i <= (totalWidth - this.length); i++) {
			paddingString += paddingChar;
		}
		if (isRightPadded) {
			return (this + paddingString);
		} else {
			return (paddingString + this);
		}
	} else {
		return this;
	}
};

Array.prototype.contain = function(_val) {
	if (this.length <= 0)
		return false;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == _val)
			return true;
	}
	return false;
};

// 清空数组
Array.prototype.clear = function() {
	this.splice(0, this.length);
};

(function() {
	window['CStore'] = {};
	get = function(name) {
		return $.jStorage.get(name);
	};
	set = function(name, value) {
		$.jStorage.set(name, value);
	};
	window['CStore']['get'] = get;
	window['CStore']['set'] = set;
})();

(function() {
	window['CKey'] = {};
	PageIndex = "pageindex";
	PageSize = "pagesize";
	RouteNull = "_n_u_l_l_";
	LocalVersion = "localversion";
	window['CKey']['PageIndex'] = PageIndex;
	window['CKey']['PageSize'] = PageSize;
	window['CKey']['RouteNull'] = RouteNull;
	window['CKey']['LocalVersion'] = LocalVersion;
})();

(function() {
	window['CCore'] = {};
	function alert(msg) {
		hint = getValue("Common_Prompt");
		$.weeboxs.open(msg, {
			title : hint,
			type : 'alert',
			okBtnName : getValue("Button_OK")
		});
	}
	;
	fillBool = function(controlID, v, callback) {
		if (CValidator.isNull(v)) {
			v = CDict.Yes
		}
		CDictPick.init(controlID, CDict.Bool, false, v, callback);
	};
	fillGender = function(controlID) {
		CDictPick.init(controlID, CDict.Gender, false, CDict.Male);
	};
	fillChecks = function(divContainer, datas, fieldName, fieldValue,
			fieldText, initValue) {
		try {
			initValue = initValue == null ? "" : initValue.toLowerCase();
		} catch (err) {
		}
		initValue = "," + initValue + ",";
		var div = $('#' + divContainer);
		div.empty();
		$
				.each(
						datas,
						function(i, data) {
							var value = eval("data." + fieldValue);
							var tempValue = "," + value + ",";
							tempValue = tempValue.toLowerCase();
							var checked = "";
							if (initValue != null && initValue != ""
									&& initValue.indexOf(tempValue) >= 0) {
								checked = "checked='true'";
							}
							var inputCheck = "<label style='width:auto;margin:0px;padding:0px;text-align:left;overflow:hidden;margin-right:10px;'><input style='width:18px;' "
									+ checked
									+ " type='checkbox' name='"
									+ fieldName + "' value='" + value + "'>";
							inputCheck = inputCheck + eval("data." + fieldText)
									+ "</label>";
							div.append(inputCheck);
						});
	};
	fillOptions = function(select, datas, fieldValue, fieldText, firstHint) {
		var s = $('#' + select).empty();
		if (!CValidator.isNull(firstHint)) {
			var optionFirst = "<option value='-1'>" + firstHint + "</option>";
			s.append(optionFirst);
		}
		;
		$.each(datas, function(i, data) {
			var option = "<option value='" + data[fieldValue] + "'>"
					+ data[fieldText] + "</option>";
			s.append(option);
		});
		s.hide().show();
	};
	servicePath = function(servicePath) {
		if (servicePath.startWith(SERVICE_ROOT)) {
			return servicePath;
		}
		return SERVICE_ROOT + servicePath;
	};
	label = function(container) {
		var not = ".list_result,.header,.check,.list_search,.next,.current,.prev,.pagination";
		$("#" + container + " [class]:not(" + not + ")").each(function() {
			var cls = $(this).attr("class");
			var splits = cls.split(' ');
			for (var i = 0; i < splits.length; i++) {
				if (!isNull(splits[i]) && !isNull(getValue(splits[i]))) {
					$("." + splits[i]).html(getValue(splits[i]));
				}
			}
		});
		$(".form_template table td:even").addClass("label");
		$('#' + container + " input,#" + container + " textarea").each(
				function() {
					if ($(this).attr("required") == "required") {
						$(this).parent().prev().addClass("star");
					}
				});
		enterNext();
	};
	function close() {
		$.weeboxs.close();
	}
	;
	delayClose = function() {
		setTimeout("$.weeboxs.close()", 4000);
	};
	delayShow = function(id) {
		$('#' + id).show();
		setTimeout("$('#" + id + "').hide()", 4000);
	};
	function confirm(callback, msg) {
		if (CValidator.isNull(msg)) {
			msg = getValue("Common_RemoveConfirm");
		}
		$.weeboxs.open(msg, {
			title : getValue("Common_Prompt"),
			okBtnName : getValue("Button_OK"),
			cancelBtnName : getValue("Button_Cancel"),
			type : 'dialog',
			onok : function() {
				callback();
				close();
			},
			oncancel : function() {
				close();
			}
		});
	}
	;
	contain = function(a, b) {
		a = "," + a + ",";
		b = "," + b + ",";
		if (a.indexOf(b) > -1) {
			return true;
		}
		return false;
	};
	checkOnce = function(current) {
		var checked = current.checked;
		$("input[name='" + current.name + "']").attr("checked", false);
		current.checked = checked;
	};
	checkAll = function(chkRow, chked) {
		$('[name=' + chkRow + ']').prop("checked", chked);
	};
	getVideo = function(src, width, height) {
		if (CValidator.isNull(width)) {
			width = 320;
			height = 240;
		}
		var template = "<object type='application/x-shockwave-flash' data='/scripts/player/player.swf' width='{1}' height='{2}'><param name='movie' value='/scripts/player/player.swf' /><param name='FlashVars' value='flv={0}&width={1}&height={2}&playercolor={3}'/></object>";
		return String.format(template, src, width, height, "085c68");
	};
	getCheckedValue = function(chkRow) {
		var index = 0;
		var values = new Array();
		$('[name=' + chkRow + ']').each(function() {
			if (this.checked == true) {
				values[index] = this.value;
				index++;
			}
		});
		return values;
	};
	getCheckedText = function(chkRow) {
		var index = 0;
		var values = new Array();
		$('[name=' + chkRow + ']').each(function() {
			if (this.checked == true) {
				values[index] = $(this).parent().next().text();
				index++;
			}
		});
		return values;
	};
	datePicker = function(id, defaultDate) {
		var language = getLangByID();
		if (CValidator.isNull(defaultDate)) {
			defaultDate = $("#" + id).val();
		}
		// defaultDate = CValidator.isNull(defaultDate) ? getNow() :
		// defaultDate;
		$('#' + id).click(function() {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd',
				lang : language.language
			});
		}).val(defaultDate).css("width", "85").css("text-align", "left").css(
				"cursor", "pointer").addClass("Wdate").parent().css("width",
				"85");
	};
	formatDate = function(d) {
		if (!CValidator.isNull(d)) {
			var newDate = new Date(d);
			return $.format.date(newDate, "yyyy-MM-dd ");
		}
		return d;
	};
	formatDateTime = function(date) {
		if (CValidator.isNull(date))
			return "";
		var beginIndex = date.indexOf("(") + 1;
		var endIndex = date.indexOf(")");
		var dateNum = date.substring(beginIndex, endIndex);
		var newDate = new Date(parseInt(dateNum, 10));
		return $.format.date(newDate, "yyyy-MM-dd hh:mm:ss");
	};
	formatUTCDateTime = function(date) {
		if (CValidator.isNull(date))
			return "";
		var beginIndex = date.indexOf("(") + 1;
		var endIndex = date.indexOf(")");
		var dateNum = date.substring(beginIndex, endIndex);
		var newDate = new Date(parseInt(dateNum, 10));
		return $.format.date(newDate, "yyyy-MM-dd ");
	};
	fillOptions = function(select, datas, fieldValue, fieldText, firstHint) {
		var s = $('#' + select);
		s.empty();
		if (!CValidator.isNull(firstHint)) {
			var optionFirst = "<option value='-1'>" + firstHint + "</option>";
			s.append(optionFirst);
		}
		;
		$.each(datas, function(i, data) {

			var option = "<option value='" + data[fieldValue] + "'>"
					+ data[fieldText] + "</option>";
			s.append(option);
		});
		// s.hide().show();
	};

	getLastYear = function() {
		var date = new Date();
		year = date.getFullYear() - 1;
		month = date.getMonth() + 1;
		day = date.getDate();
		return $.format.date(year + "-" + month.toString().padLeft(2, '0')
				+ "-" + day.toString().padLeft(2, '0'), "yyyy-MM-dd");
	};
	getNextYear = function() {
		var date = new Date();
		year = date.getFullYear() + 1;
		month = date.getMonth() + 1;
		day = date.getDate();
		return $.format.date(year + "-" + month.toString().padLeft(2, '0')
				+ "-" + day.toString().padLeft(2, '0'), "yyyy-MM-dd");
	};
	getDateStr = function(days) {
		var dd = new Date();
		var y = dd.getFullYear();
		dd.setDate(dd.getDate() + days);
		var m = dd.getMonth() + 1; // 获取当前月份的日期
		var d = dd.getDate();
		return y + "-" + m + "-" + d;
	};
	stringToDate = function(string) {
		var f = string.split(' ', 2);
		var d = (f[0] ? f[0] : '').split('-', 3);
		var t = (f[1] ? f[1] : '').split(':', 3);
		return (new Date(parseInt(d[0], 10) || null,
				(parseInt(d[1], 10) || 1) - 1, parseInt(d[2], 10) || null,
				parseInt(t[0], 10) || null, parseInt(t[1], 10) || null,
				parseInt(t[2], 10) || null)).getTime();
	};
	dateDiff = function(date1, date2) {
		var type1 = typeof date1, type2 = typeof date2;
		if (type1 == 'string')
			date1 = stringToDate(date1);
		else if (date1.getTime)
			date1 = date1.getTime();
		if (type2 == 'string')
			date2 = stringToDate(date2);
		else if (date2.getTime)
			date2 = date2.getTime();
		return (date2 - date1) / (1000 * 60 * 60 * 24) + 1; // 结果是秒
	};

	getNow = function() {
		return $.format.date(new Date(), "yyyy-MM-dd");
	};
	getMemberByID = function(id) {
		var param = {};
		param["id"] = id;
		return invoke(servicePath('/service/member/getmemberbyid'), param);
	};
	getMemberByUsername = function(username) {
		var param = {};
		param["username"] = username;
		return invoke(servicePath('/service/member/getmemberbyusername'), param);
	};
	getNew = function() {
		return invoke(servicePath('/service/core/getnew'));
	};
	updateOnlineStatus = function() {
		return invoke('/service/member/updateonlinestatus');
	};
	getControlNameByID = function(controlID) {
		var controlName = "";
		if (controlID.endWith('IDs')) {
			controlName = controlID.substring(0, controlID.length - 3)
					+ "Names";
		} else if (controlID.endWith('ID')) {
			controlName = controlID.substring(0, controlID.length - 2) + "Name";
		} else {
			controlName = controlID + "Name";
		}
		return controlName;
	};
	isIDControl = function(controlID) {
		if (controlID.endWith("ID") || controlID.endWith("IDs")) {
			return true;
		}
		return false;
	};
	disable = function(controlID) {
		if (!CValidator.isNull(controlID)) {
			$("#" + controlID).attr('readonly', true);
			$("#" + controlID).attr('disabled', true);
			if (isIDControl(controlID)) {
				var controlName = getControlNameByID(controlID);
				$("#" + controlName).attr('readonly', true);
				$("#" + controlName).attr('disabled', true);
			}
		}
	};
	hideControl = function(controlID) {
		if (!CValidator.isNull(controlID)) {
			$("#" + controlID).hide();

			if (isIDControl(controlID)) {
				var controlName = getControlNameByID(controlID);
				$("#" + controlName).hide();
			}
			var pre = $("#" + controlID).prev();
			if (pre.is("span")) {
				pre.hide();
			}
		}
	};
	enterNext = function() {
		var inps = $("input:text:not([class='pick'])");
		inps.bind('keydown', function(e) {
			var key = e.which;
			if (key == 13) {
				e.preventDefault();
				var idx = inps.index(this) + 1;
				$(":input:text:not([class='pick']):eq(" + idx + ")").focus();
			}
		});
	};
	enterSubmit = function(pressedId, buttonId) {
		$("#" + pressedId).keydown(function(e) {
			if (e.keyCode == 13) {
				$('#' + buttonId).trigger('click');
			}
		});
	};
	getAllDicts = function(parentID) {
		var param = {};
		param["parentid"] = parentID;
		return invoke(servicePath('/service/dict/getalldicts'), param);
	};
	getCurrentMember = function() {
		return invoke(servicePath('/service/member/getcurrentmember'));
	};
	setCurrentMemberMenus = function(menuIDs) {
		CStore.set("current_member_menuids", menuIDs);
	};
	getCurrentMemberMenus = function() {
		return CStore.get("current_member_menuids");
	};
	setCurrentMemberID = function(memberID) {
		CStore.set("current_member_id", memberID);
	};
	getCurrentMemberID = function() {
		return CStore.get("current_member_id");
	};
	setCurrentMemberName = function(memberName) {
		CStore.set("current_member_name", memberName);
	};
	getCurrentMemberName = function() {
		return CStore.get("current_member_name");
	};
	getDictByID = function(dictID) {
		var param = {};
		param["id"] = dictID;
		return invoke(servicePath('/service/dict/getdictbyid'), param);
	};
	getFormData = function(containerID) {
		var result = {};
		var elements = "";
		elements += '#' + containerID + ' textarea,';
		elements += '#' + containerID + ' select,';
		elements += '#' + containerID + ' input';
		$(elements).each(
				function() {
					if ($(this).attr('type') == 'radio'
							|| $(this).attr('type') == 'checkbox') {
						if ($(this).attr('checked') == 'checked'
								|| $(this).attr('checked') == 'true'
								|| $(this).attr('checked') == true) {
							appendElement(this, result);
						}
					} else {
						appendElement(this, result);
					}
				});
		return result;
	};
	appendElement = function(element, result) {
		var name = $(element).attr('name');
		if (CValidator.isNull(name)) {
			name = $(element).attr('id');
		}
		if (!CValidator.isNull(name)) {
			var val = $(element).val();
			if (!CValidator.isNull(val)) {
				val = val.toValidJson();
			}
			if (CValidator.isNull(result[name])) {
				result[name] = val;
			} else {
				result[name] += "," + val;
			}

		}
	};
	appendKeyValue = function(json, key, value) {
		if (CValidator.isNull(key)) {
			alert("key is reqiured");
			return false;
		}
		var base = json;
		if (CValidator.isNull(base)) {
			base = "{'" + key + "':'" + value + "'}";
		} else {
			if (base.startWith("{") && base.endWith("}")) {
				base = base.replaceAll("}", "", true);
				base = base + ",'" + key + "':'" + value + "'}";
			} else {
				alert("json param is error;");
			}
		}
		return base;
	};
	mapToJson = function(map) {
		var result = "";
		for ( var k in map) {
			result = appendKeyValue(result, k, map[k]);
		}
		return result;
	};
	getMyPlatform = function() {
		return invoke(servicePath('/service/member/getmyplatform'));
	};
	getSignOutPlatform = function() {
		return invoke(servicePath('/service/member/getsignoutplatform'));
	};
	getNextDicts = function(parentID) {
		var param = {};
		param["parentid"] = parentID;
		return invoke(servicePath('/service/dict/getnextdicts'), param);
	};
	getResources = function() {
		return invoke(servicePath('/service/core/getresources'));
	};
	getServerVersion = function() {
		return invoke(servicePath('/service/core/getserverversion'), "");
	};
	getMacAddress = function() {
		return invoke('/service/core/getmacaddress');
	};
	getValue = function(name1, name2) {
		if (CValidator.isNull(name1)) {
			alert("param is required");
			return false;
		}
		var versionid = getCurrentLang();
		var value1 = CStore.get('v_' + versionid + '_' + name1);
		var value2 = "";
		if (!CValidator.isNull(name2)) {
			value2 = CStore.get('v_' + versionid + '_' + name2);
			if (!CValidator.isNull(value1)) {
				value1 = value1.replaceAll("%s", value2);
			}
		}
		return value1;
	};
	getLangs = function() {
		return invoke(servicePath('/service/core/getlangs'));
	};
	getCurrentLang = function() {
		if (CValidator.isNull(CStore.get("currentlangid"))) {
			setCurrentLang(invoke(servicePath('/service/core/getcurrentlang')));
		}
		return CStore.get("currentlangid");
	};
	setCurrentLang = function(langID) {
		CStore.set("currentlangid", langID);
	};
	getLangByID = function() {
		var langs = getLangs();
		for (var i = 0; i < langs.length; i++) {
			if (getCurrentLang() == langs[i].ID) {
				return langs[i];
			}
		}
	};
	changeLang = function(langID) {
		var datas = invoke(servicePath('/service/core/changelang'), {
			langid : langID
		});
		setCurrentLang(langID);
		if (datas == "OK") {
			window.location.reload();
		}
	};
	singleCheck = function(value) {
		var radio = $("input[value='" + value + "']");
		if (radio.length > 0) {
			radio.prop("checked", "checked");
		} else {
			var option = $("option[value='" + value + "']");
			if (option.length > 0) {
				setTimeout(function() {
					$("option[value='" + value + "']").attr("selected", true);
				}, 1);
			}
		}
	};
	invoke = function(url, formData, callback) {
		var isAsync = true;
		if (CValidator.isNull(callback)) {
			isAsync = false;
		}
		url = servicePath(url);
		var d = "";
		if (CValidator.isNull(formData)) {
			formData = {};
		}
		var param = {
			formData : JSON.stringify(formData)
		};
		$.ajax({
			url : url,
			data : param,
			type : "post",
			dataType : "json",
			async : isAsync,
			success : function(data, textStatus, jqXHR) {
				d = data;
				if (isAsync) {
					callback(getInvokeData(d));
				}
			},
			error : function(xhr) {
				d = {};
				d.data="";
				d.status = "Fail";
				d.msg = xhr.responseText;
			}
		});

		return getInvokeData(d);
	};
	getInvokeData = function(d) {
		if (d.status == "Fail") {
			window.alert(d.msg);
		}
		if (d.status == "NoLogin") {
			window.location.href = SERVICE_ROOT + "/pages/common/login.htm";
		}
		return d.data;
	};
	isInRole = function(id) {
		var menus = getCurrentMemberMenus();
		if (contain(menus, id)) {
			return true;
		}
		return false;
		// return invoke(servicePath('/service/groupmenu/isinrole'), {id:id});
	};
	isAdmin = function(username) {
		return invoke(servicePath('/service/core/isadmin'), {
			"username" : username
		});
	};
	initPagination = function(container, nCount, getPagingData, pageSize) {
		if (isNull($("#" + container + "Pagination").html())) {
			$('#' + container).after(
					"<div id='" + container + "Pagination'></div>");
			var prev_text = CCore.getValue('Common_Prev');
			var next_text = CCore.getValue('Common_Next');
			var total = CCore.getValue("Common_Total");
			var item_unit = CCore.getValue("Common_ItemUnit");
			var item_per_page = CCore.getValue("Common_ItemPerPage");
			if (isNull(pageSize)) {
				pageSize = CDict.PageSize;
			}
			$("#" + container + "Pagination").pagination(nCount, {
				callback : getPagingData,
				items_per_page : pageSize,
				prev_text : prev_text,
				next_text : next_text
			});
		}
	};
	processList = function(container, containerTemplate, data, getPagingData,
			pageSize) {
		template.helper('CCore', CCore);
		template.helper('CDict', CDict);
		template.helper('CValidator', CValidator);
		template.isEscape = false;
		if (isNull(data.data)) {
			$('#' + container).html(template.render(containerTemplate, {
				data : data
			}));
		} else {
			$('#' + container).html(template.render(containerTemplate, data));
		}
		var result = $('#' + container).html().replaceAll("null", "", true)
				.replaceAll("00:00:00.0", "", true).replaceAll(" 0:00:00", "",
						true);

		$('#' + container).html(result);
		if ($("#" + container).data("count") != data.count) {
			$("#" + container).data("count", data.count);
			$("#" + container + "Pagination").html('');
		}
		if (!isNull(getPagingData)) {
			initPagination(container, data.count, getPagingData, pageSize);
		}
		label(container);
		styleList();
		CCore.label("main");

		var currentRowID = CStore.get("current_row_id");
		if (!isNull(currentRowID)) {
			$("#" + currentRowID).css("background", "#4aa9d8");
		}
	};
	playVideo = function(url) {
		$("#" + url).css("display", "block").css("width", "320px").css(
				"height", "240px");
		flowplayer(url, "/scripts/player/flowplayer-3.2.16.swf");
	};
	playAudio = function(url, div) {
		var player = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='1' height='1'><param name='movie' value='/scripts/audio/player.swf?file="
				+ url
				+ "&autoStart=true&repeatPlay=false&songVolume=3' /><embed wmode='transparent' width='1' height='1' src='/scripts/audio/player.swf?file="
				+ url
				+ "&autoStart=true&repeatPlay=false&songVolume=3' type='application/x-shockwave-flash'/></object>";
		$("#" + div).html(player);
	};
	showImg = function(divid, attachmentID, width, height) {
		var dom = "<img src='../../img/" + attachmentID;
		if (width > 0) {
			dom += "/" + width;
		}
		if (height > 0) {
			dom += "/" + height;
		}
		dom += "'/>";
		$("#" + divid).html(dom);
	};
	styleList = function() {
		$(".list_result tr").click(function() {
			$(".list_result tr").css("background", "");
			$(this).css("background", "#4aa9d8");
			CStore.set("current_row_id", $(this).attr("id"));
		})
	};
	login = function(divId, checkCaptcha, callback, currentContainerId) {
		if (CValidator.isNull($('#username').val())) {
			alert(getValue('Common_Required', 'Member_Username'));
			return false;
		}
		if (CValidator.isNull($('#password').val())) {
			alert(getValue('Common_Required', 'Member_Password'));
			return false;
		}
		var url = servicePath('/service/member/login');
		if (postData(url, divId)) {
			CStore.set("username", $("#username").val());
			var member = getCurrentMember();
			setCurrentMemberID(member.ID);
			setCurrentMemberName(member.name);
			var datas = invoke(servicePath('/service/groupmenu/getgroupmenus'),
					{
						"groupid" : member.groupID
					});
			CCore.setCurrentMemberMenus(datas);
			if (!CValidator.isNull(currentContainerId)) {
				$("#" + currentContainerId).val(member.ID);
			}
			if (!CValidator.isNull(callback)) {
				callback();
				CCore.close();
			} else {
				document.location.href = getMyPlatform();
			}
		}
	};
	loadPage = function(container, url, init) {
		$('#' + container).html('');
		$('#' + container).load(url, init);
	};
	loadModal = function(src, width, height, initEvent) {
		if (width <= 0 || height <= 0 || width == undefined
				|| height == undefined) {
			width = 750;
			height = 415;
		}
		if (src.endWith(".htm") || src.endWith(".html")) {
			if (CValidator.isNull(initEvent)) {
				$.weeboxs.open(src, {
					contentType : 'ajax',
					width : width,
					height : height,
					showButton : false
				});
			} else {
				$.weeboxs.open(src, {
					contentType : 'ajax',
					onopen : initEvent,
					width : width,
					height : height,
					showButton : false
				});
			}
		} else {
			$.weeboxs.open("#" + src, {
				width : width,
				height : height,
				showButton : false
			});
		}
	};
	loadEditor = function(container, isSimple) {
		var height = 180;
		var language = getLangByID();
		var toolbars = [ [ "undo", "redo", 'Bold', 'underline', 'ForeColor',
				'backcolor', 'InsertUnorderedList', 'FontSize', 'InsertTable' ] ];
		if (isSimple == false) {
			height = 515;
			toolbars[0].push('upload');
			toolbars[0].push('link');
			toolbars[0].push('unlink');
			toolbars[0].push('justifyleft');
			toolbars[0].push('justifycenter');
			toolbars[0].push('justifyright');
			toolbars[0].push('imageleft');
			toolbars[0].push('imagecenter');
			toolbars[0].push('imageright');
			toolbars[0].push('source');
		}
		var editor = new UE.ui.Editor({
			toolbars : toolbars,
			lang : language.language,
			initialFrameWidth : '100%',
			initialFrameHeight : height,
			autoClearinitialContent : false
		});
		editor.render(container);
	};
	postData = function(url, form) {
		var flag = false;
		var formData = getFormData(form);
		var data = invoke(url, formData);
		if (!CValidator.isNull(data)) {
			if (data.toUpperCase() == "OK") {
				flag = true;
			} else {
				alert(data);
			}
		} else {
			alert(data);
		}
		return flag;
	};

	postRow = function(url, tableID) {
		var flag = false;
		var formData = getFormData(tableID + " #last");
		var data = invoke(url, formData);
		if (!CValidator.isNull(data)) {
			if (data.length == 32) {
				var tr = $("#" + tableID + " table tr:last").eq(0).clone()
						.attr("id", data);
				tr.find("td:last").html(
						"<a class='Button_Remove'>"
								+ CCore.getValue("Button_Remove") + "</a>");
				tr.insertBefore("#" + tableID + " table tr:last");
				$("#" + data + " input").each(function(i, val) {
					val.id = val.id + "_" + data;
				});

				$("#" + tableID + " table tr:last input").val("");
				$("#" + tableID + " table tr:last input:first").focus();
				CCore.enterNext();
			} else {
				alert(data);
			}
		}
		return flag;
	};
	paramPageIndex = function(pageIndex, param) {
		if (CValidator.isNull(pageIndex)) {
			pageIndex = CStore.get(CKey.PageIndex);
		}
		if (CValidator.isNull(param)) {
			param = {};
		}
		param[CKey.PageIndex] = pageIndex;
		CStore.set(CKey.PageIndex, pageIndex);
		return param;
	};
	removeData = function(url, removedIDs, callback) {
		if (CValidator.isNull(removedIDs)) {
			alert(getValue('Common_PleaseSelect', 'Common_ForRemoved'));
			return false;
		}
		confirm(function() {
			removeRemote(url, removedIDs, callback);
		});
	};
	hide = function(cls) {
		$("." + cls).hide();
		$("." + cls).parent().each(function() {
			if ($(this).get(0).tagName.toUpperCase() == "TD") {
				$(this).hide();
			}
		});
	};
	removeRemote = function(url, removedIDs, callback) {
		var param = {};
		param["removedIDs"] = removedIDs;
		var data = invoke(url, param);
		if (data == "OK") {
			if (!CValidator.isNull(callback)) {
				callback(removedIDs);
			} else {
				for (var i = 0; i < removedIDs.length; i++) {
					$('#row' + removedIDs[i]).remove();
					$('#' + removedIDs[i]).remove();
				}
			}
		} else {
			CCore.close();
			window.alert(data);
		}
	};

	signOut = function() {
		confirm(signOutRemote, getValue('Common_ExitConfirm'));
	};

	signOutRemote = function() {
		var data = invoke(servicePath('/service/member/signout'));
		if (!CValidator.isNull(data)) {
			if (data.toUpperCase() == "OK") {
				document.location.href = getSignOutPlatform();// "../common/login.htm";
			}
		}
	};

	setLocalResource = function() {
		var serverVersion = getServerVersion();
		var localVersion = CStore.get(CKey.LocalVersion);
		if (CValidator.isNull(localVersion) || localVersion < serverVersion) {
			var keyValues = getResources();
			for (var i = 0; i < keyValues.length; i++) {
				CStore.set(keyValues[i].Key, keyValues[i].Value);
			}
			CStore.set(CKey.LocalVersion, serverVersion);
		}
	};
	clearLocalResource = function() {
		CStore.set(CKey.LocalVersion, "");
	};
	updateForm = function(data, c) {
		if (CValidator.isNull(data)) {
			return;
		}
		$.each(data, function(fieldName, fieldValue) {
			fieldValue = convertDateValue(fieldValue);
			if (!CValidator.isNull(fieldValue)) {
				fieldValue = unescape(fieldValue);
			} else {
				fieldValue = "";
			}

			var $field = $('#' + fieldName);
			if (!CValidator.isNull(c)) {
				$field = $('#' + c + " #" + fieldName);
			}
			if ($field.length < 1) {
				$field = $('input,select,textarea').filter(
						'[name="' + fieldName + '"]');
			}
			if ($field.eq(0).is('input')) {
				var type = $field.attr('type');
				switch (type) {
				case 'checkbox':
					if ($field.length > 1) {
						$field.each(function() {
							var value = $(this).val();
							try {
								if ($.inArray(value, fieldValue) != -1) {
									$(this).attr('checked', 'true');
								} else {
									$(this).attr('checked', '');
								}
							} catch (e) {
							}
						});
					} else {
						if ($field.val() == fieldValue) {
							$field.attr('checked', 'true');
						} else {
							$field.attr('checked', '');
						}
					}
					break;
				case 'radio':
					$field.each(function() {
						var value = $(this).val();
						if (value == fieldValue) {
							$(this).attr('checked', 'true');
						} else {
							// $(this).attr('checked','');
						}
					});
					break;
				default:
					$field.val(fieldValue);
					break;
				}
			} else if ($field.is('select')) {
				var $options = $('option', $field);
				var multiple = $field.attr('multiple');
				$options.each(function() {
					var value = $(this).val() || $(this).html();
					switch (multiple) {
					case true:
						if ($.inArray(value, fieldValue) != -1) {

							$(this).attr('selected', 'true');
						} else {
							$(this).attr('selected', '');
						}
						break;
					default:
						if (value == fieldValue) {
							try {
								$(this).attr('selected', 'true');
							} catch (e) {
							}
						} else {
							// $(this).attr('selected','');
						}
						break;
					}
				});
			} else {
				$field.text(fieldValue);
			}
		});
	};

	utf8ToGb2312 = function(str1) {
		str1 = unescape(str1.replace(/\\u/g, '%u').replace(/;/g, ''));
		return str1;
	};

	getViewElements = function(viewID) {
		return $("#" + viewID + " [id]");
	};
	view = function(viewID, obj) {
		var elements = getViewElements(viewID);
		$.each(obj, function(name, value) {
			if ($.inArray($("#" + name)[0], elements) >= 0) {

				if (!CValidator.isNull(value)) {
					value = convertDateValue(value);
					$("#" + name).html(unescape(value));
				}
			}
		});
		CCore.label(viewID);
		var parts = viewID.split('_');
		if (parts.length > 1) {
			var tableName = parts[1];
			if (!CValidator.isNull(tableName)) {
				var first = tableName.substr(0, 1);
				var end = "";
				if (tableName.length > 1) {
					end = tableName.substr(1, tableName.length - 1);
				}
				first = first.toUpperCase();
				tableName = first + end;
				$("#" + viewID + " h1").html(
						CCore.getValue("Common_View", tableName + "_Moduler"));
			}
		}
		$("#" + viewID + " .Button_Close").click(CCore.close);
	};
	convertDateValue = function(value) {
		try {
			if (value != null && value.toString().length == 13 && !isNaN(value)) {
				value = formatDate(value);
			}
			if (value != null
					&& value.toString().toLowerCase().substring(0, 6) == "/date(") {
				value = formatDate(value);
			}
		} catch (err) {
		}
		return value;
	};
	queryString = function(val) {
		var uri = window.location.search;
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1))
				: null);
	};
	zoomImg = function(maxWidth, maxHeight, containerID) {
		var img = "img";
		if (!CValidator.isNull(containerID)) {
			img = "#" + containerID + " img";
		}
		$(img).each(function() {
			var img = new Image();
			img.src = $(this).attr("src");
			var image = $(this);
			img.onload = function() {
				var ratio = 0;
				var width = img.width;
				var height = img.height;
				if (width > maxWidth) {
					ratio = maxWidth / width;
					image.css("width", maxWidth);
					height = height * ratio;
					image.css("height", height);
				}
				if (height > maxHeight) {
					ratio = maxHeight / height;
					image.css("height", maxHeight);
					width = width * ratio;
					image.css("width", width);
				}
			}
		});
	};
	window['CCore']['alert'] = alert;
	window['CCore']['confirm'] = confirm;
	window['CCore']['contain'] = contain;
	window['CCore']['checkOnce'] = checkOnce;
	window['CCore']['checkAll'] = checkAll;
	window['CCore']['close'] = close;
	window['CCore']['delayClose'] = delayClose;
	window['CCore']['delayShow'] = delayShow;
	window['CCore']['changeLang'] = changeLang;
	window['CCore']['datePicker'] = datePicker;
	window['CCore']['dateDiff'] = dateDiff;
	window['CCore']['disable'] = disable;
	window['CCore']['hideControl'] = hideControl;
	window['CCore']['enterNext'] = enterNext;
	window['CCore']['enterSubmit'] = enterSubmit;
	window['CCore']['fillBool'] = fillBool;
	window['CCore']['fillGender'] = fillGender;
	window['CCore']['fillChecks'] = fillChecks;
	window['CCore']['formatDate'] = formatDate;
	window['CCore']['formatDateTime'] = formatDateTime;
	window['CCore']['fillOptions'] = fillOptions;
	window['CCore']['getValue'] = getValue;
	window['CCore']['getLangs'] = getLangs;
	window['CCore']['getCurrentLang'] = getCurrentLang;
	window['CCore']['setCurrentLang'] = setCurrentLang;
	window['CCore']['getNow'] = getNow;
	window['CCore']['getNextYear'] = getNextYear;
	window['CCore']['getDictByID'] = getDictByID;
	window['CCore']['getFormData'] = getFormData;
	window['CCore']['getCurrentMember'] = getCurrentMember;
	window['CCore']['getCheckedValue'] = getCheckedValue;
	window['CCore']['getCheckedText'] = getCheckedText;
	window['CCore']['getLastYear'] = getLastYear;
	window['CCore']['getMacAddress'] = getMacAddress;
	window['CCore']['getAllDicts'] = getAllDicts;
	window['CCore']['getNextDicts'] = getNextDicts;
	window['CCore']['getMemberByID'] = getMemberByID;
	window['CCore']['getMemberByUsername'] = getMemberByUsername;
	window['CCore']['getCurrentMemberID'] = getCurrentMemberID;
	window['CCore']['getCurrentMemberName'] = getCurrentMemberName;
	window['CCore']['getCurrentMemberMenus'] = getCurrentMemberMenus;
	window['CCore']['getControlNameByID'] = getControlNameByID;
	window['CCore']['getLangByID'] = getLangByID;
	window['CCore']['getNew'] = getNew;
	window['CCore']['hide'] = hide;
	window['CCore']['updateOnlineStatus'] = updateOnlineStatus;
	window['CCore']['isIDControl'] = isIDControl;
	window['CCore']['invoke'] = invoke;
	window['CCore']['isInRole'] = isInRole;
	window['CCore']['isAdmin'] = isAdmin;
	window['CCore']['label'] = label;
	window['CCore']['loadPage'] = loadPage;
	window['CCore']['loadModal'] = loadModal;
	window['CCore']['loadEditor'] = loadEditor;
	window['CCore']['login'] = login;
	window['CCore']['getMyPlatform'] = getMyPlatform;

	window['CCore']['processList'] = processList;
	window['CCore']['postData'] = postData;
	window['CCore']['postRow'] = postRow;
	window['CCore']['paramPageIndex'] = paramPageIndex;
	window['CCore']['playVideo'] = playVideo;
	window['CCore']['playAudio'] = playAudio;
	window['CCore']['removeData'] = removeData;
	window['CCore']['queryString'] = queryString;
	window['CCore']['signOut'] = signOut;
	window['CCore']['setLocalResource'] = setLocalResource;
	window['CCore']['clearLocalResource'] = clearLocalResource;
	window['CCore']['servicePath'] = servicePath;
	window['CCore']['setCurrentMemberID'] = setCurrentMemberID;
	window['CCore']['setCurrentMemberName'] = setCurrentMemberName;

	window['CCore']['setCurrentMemberMenus'] = setCurrentMemberMenus;

	window['CCore']['styleList'] = styleList;
	window['CCore']['singleCheck'] = singleCheck;
	window['CCore']['showImg'] = showImg;

	window['CCore']['updateForm'] = updateForm;

	window['CCore']['view'] = view;
	window['CCore']['zoomImg'] = zoomImg;

})();

(function() {
	window['CValidator'] = {};
	isNull = function(val) {
		if (!isNaN(val)) {
			if (val == "0") {
				return false;
			}
		}
		if (val == undefined || val == null || val == "" || val == ''
				|| val == "undefined" || val == "null" || val == "NULL"
				|| val == CKey.RouteNull) {
			return true;
		}
		return false;
	};
	checkInvalid = function(container) {
		if (checkNull(container)) {
			return true;
		}
		if (checkNumber(container)) {
			return true;
		}
		if (checkMin(container)) {
			return true;
		}
		if (checkMax(container)) {
			return true;
		}
		if (checkEmail(container)) {
			return true;
		}
		return false;
	};
	checkReceiverNull = function() {
		if (!CValidator.isNull($("#nextFlowNodeID").val())) {
			var receivers = CCore.getCheckedValue("nextMemberIDs");
			if (CValidator.isNull(receivers) || receivers.length <= 0) {
				CCore.alert("请选择适合的接收人，若接收人不存在，请联系管理员设置权限");
				return true;
			}
		}
		return false;
	};
	checkNull = function(container) {
		var bFlag = false;
		$('#' + container + " input,#" + container + " textarea").each(
				function() {
					if (!isNull($(this).attr("required"))) {
						var controlID = $(this).attr("id");
						var controlName = CCore.getControlNameByID(controlID);
						if (CCore.isIDControl(controlID)) {
							$("#" + controlName).removeClass("invalid")
									.removeClass("pick");
						} else {
							$(this).removeClass("invalid");
						}
						var value = $(this).val();
						if (isNull(value)) {
							bFlag = true;
							if (CCore.isIDControl(controlID)) {
								$("#" + controlName).addClass("invalid").blur(
										function() {
											$(this).removeClass("invalid")
													.addClass("pick");
										});
							} else {
								$(this).addClass("invalid").blur(function() {
									$(this).removeClass("invalid");
								});
							}
						}
					}
				});
		if (bFlag == true) {
			CCore.alert(CCore.getValue("Common_Required", "Common_Red"));
		}
		return bFlag;
	};
	checkMin = function(container) {
		var bFlag = false;
		$('#' + container + " input").each(function() {
			$(this).removeClass("invalid");
			var value = $(this).val();
			var min = $(this).attr("min");
			if (!isNull(value) && !isNull(min)) {
				if (isNaN(value) || parseFloat(value) < parseFloat(min)) {
					bFlag = true;
					$(this).addClass("invalid").blur(function() {
						$(this).removeClass("invalid");
					});
				}
			}
		});
		if (bFlag == true) {
			CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
		}
		return bFlag;
	};
	checkMax = function(container) {
		var bFlag = false;
		$('#' + container + " input").each(function() {
			$(this).removeClass("invalid");
			var value = $(this).val();
			var max = $(this).attr("max");
			if (!isNull(value) && !isNull(max)) {
				if (isNaN(value) || parseFloat(value) > parseFloat(max)) {
					bFlag = true;
					$(this).addClass("invalid").blur(function() {
						$(this).removeClass("invalid");
					});
				}
			}
		});
		if (bFlag == true) {
			CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
		}
		return bFlag;
	};
	checkEmail = function(container) {
		var bFlag = false;
		$('#' + container + " input").each(function() {
			$(this).removeClass("invalid");
			var value = $(this).val();
			var rule = $(this).attr("email");
			if (!isNull(value) && !isNull(rule)) {
				var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if (!reg.test(value)) {
					bFlag = true;
					$(this).addClass("invalid").blur(function() {
						$(this).removeClass("invalid");
					});
				}
			}
		});
		if (bFlag == true) {
			CCore.alert(CCore.getValue("Common_Invalid", "Common_Email"));
		}
		return bFlag;
	};
	checkNumber = function(container) {
		var bFlag = false;
		$('#' + container + " input").each(function() {
			$(this).removeClass("invalid");
			var value = $(this).val();
			var rule = $(this).attr("number");
			if (!isNull(value) && !isNull(rule)) {
				if (isNaN(value)) {
					bFlag = true;
					$(this).addClass("invalid").blur(function() {
						$(this).removeClass("invalid");
					});
				}
			}
		});
		if (bFlag == true) {
			CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
		}
		return bFlag;
	};
	window['CValidator']['isNull'] = isNull;
	window['CValidator']['checkInvalid'] = checkInvalid;
	window['CValidator']['checkReceiverNull'] = checkReceiverNull;
})();

(function() {
	window['CUpload'] = {};
	init = function(controlID, types, isOutResult, callback) {
		var dom = ""
				+ "<span class='fileinput-button'>"
				+ "<span>上传</span>"
				+ "<input id='fileupload"
				+ controlID
				+ "' type='file' name='files[]' multiple title='请选择上传的文件' style='border:solid 1px red;' >"
				+ "</span>" + "<div id='uploading" + controlID
				+ "' class='bar hide'></div>";
		if (!isOutResult) {
			dom += "<ul id='files" + controlID + "' class='files'></ul>";
		}
		$("#" + controlID).after(dom);
		// $("#fileupload" + controlID).data("controlID",controlID);
		var attachmentIDs = $("#" + controlID).val();
		if (!CValidator.isNull(attachmentIDs)) {
			if (!isOutResult) {
				var attachments = getAttachmentByIDs(attachmentIDs);
				if (!CValidator.isNull(attachments)) {
					$.each(attachments, function(i, attachment) {
						if (isOutResult) {

						} else {
							createFileName(attachment, controlID);
						}
					});
				}
			}

		}
		;
		var url = CCore.servicePath("/pages/common/upload.ashx");
		$('#fileupload' + controlID).fileupload({
			url : url,
			dataType : 'json',
			done : function(e, data) {
				var attachment = data.result;
				appendFileID(attachment, controlID);
				if (isOutResult) {
					createFileCount(controlID, callback);
				} else {
					createFileName(attachment, controlID, callback);
				}
				$("#uploading" + controlID).hide();
			},
			formData : {
				"id" : $("#" + controlID).val()
			},
			add : function(e, data) {
				var ext = getExtName(data.files[0].name);
				if (CCore.contain(types, ext)) {
					$("#uploading" + controlID).html("正在上传...");
					$("#uploading" + controlID).show();
					data.submit();
				} else {
					$("#uploading" + controlID).html("不允许上传" + ext + "文件");
					$("#uploading" + controlID).show();
				}
			}
		});
	};
	isVideo = function(fileName) {
		var ext = getExtName(fileName);
		if (ext == "flv") {
			return true;
		}
		return false;
	};
	isImage = function(fileName) {
		var ext = getExtName(fileName);
		if (CCore.contain("gif,bmp,jpg,jpeg,png", ext)) {
			return true;
		}
		return false;
	};
	isAttachment = function(fileName) {
		if (!isVideo(fileName) && !isImage(fileName)) {
			return true;
		}
		return false;
	};
	getExtName = function(fileName) {
		return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
	};
	createFileName = function(attachment, controlID, callback) {
		var url = CCore.servicePath("/upload/" + attachment.fileNameInDisk);
		$("#files" + controlID)
				.append(
						"<li><a href='"
								+ url
								+ "' target='_blank'>"
								+ attachment.fileName
								+ "</a></li><li class='remove-file' onclick=\"CUpload.removeFile('"
								+ attachment.ID + "','"
								+ attachment.fileNameInDisk + "','" + controlID
								+ "',this)\"></li>");
		if (!CValidator.isNull(callback)) {
			callback(controlID);
		}
	};
	createFileCount = function(controlID, callback) {
		// var controlCount = controlID.replaceAll("_id_","_count_",true);
		// var values = $("#" + controlID).val();
		// var count = values.split(',');
		// $("#" + controlCount).html(count.length + " 份");
		callback(controlID);
	};
	appendFileID = function(attachment, controlID) {
		if (!CValidator.isNull($("#" + controlID).val())) {
			$("#" + controlID).val(
					$("#" + controlID).val() + "," + attachment.ID);
		} else {
			$("#" + controlID).val(attachment.ID);
		}
	};
	getAttachmentByIDs = function(IDs) {
		return CCore.invoke(CCore
				.servicePath('/service/file/getattachmentbyids'), {
			IDs : IDs
		});
	};
	getAttachmentUrl = function(attachment) {
		return "/upload/" + attachment.fileNameInDisk;
	};
	removeFile = function(attachmentID, file, controlID, current) {
		CCore.invoke(CCore.servicePath('/service/file/deletefile'), {
			ID : attachmentID,
			File : file
		});
		$(current).prev().remove();
		$(current).remove();
		var attachmentIDs = $("#" + controlID).val().split(',');
		attachmentIDs.remove(attachmentID);
		$("#" + controlID).val(attachmentIDs.toString());
	};
	window['CUpload']['init'] = init;
	window['CUpload']['removeFile'] = removeFile;
	window['CUpload']['getAttachmentByIDs'] = getAttachmentByIDs;
	window['CUpload']['getAttachmentUrl'] = getAttachmentUrl;
	window['CUpload']['isAttachment'] = isAttachment;
	window['CUpload']['isImage'] = isImage;
	window['CUpload']['isVideo'] = isVideo;
	window['CUpload']['getVideo'] = getVideo;
})();

(function() {
	window['CDictPick'] = {};
	gControlID = null;
	gTree = null;
	init = function(controlID, parentID, isMulti, initDictID, callback,
			isOnlyNextLevel) {
		var controlName = CCore.getControlNameByID(controlID);
		var strName = "";
		if (!CValidator.isNull(initDictID)) {
			var dict = CCore.getDictByID(initDictID);
			if (!CValidator.isNull(dict)) {
				strName = dict.name;
				$("#" + controlID).val(dict.ID);
			}
		}

		$("#" + controlID).after(
				"<input readonly='readonly' class='pick' id='" + controlName
						+ "' type='text' value='" + strName + "'/>");
		$("#" + controlID).data("parentid", parentID);
		$("#" + controlID).data("ismulti", isMulti);
		$("#" + controlID).data("controlid", controlID);
		$("#" + controlID).data("controlname", controlName);
		$("#" + controlID).data("callback", callback);
		$("#" + controlID).data("isonlynextlevel", isOnlyNextLevel);
		$("#" + controlName).click(function() {
			showMenu(controlID);
		});

		var maxLength = 6;
		var dicts;
		if (isOnlyNextLevel) {
			dicts = CCore.getNextDicts(parentID);
		} else {
			dicts = CCore.getAllDicts(parentID);
		}
		var maxWord = 10;
		$.each(dicts, function(i, dict) {
			var len = dict.name.length;
			if (len > maxWord) {
				maxWord = len;
			}
		});
		if (maxWord > 15) {
			maxWord++;
		}
		// $("#" +controlName).css("width",maxWord*13);
		// $("#" +controlName).parent().css("width",maxWord*13);
		// console.log(maxWord);
	};
	showMenu = function(controlID) {
		gControlID = controlID;
		var parentValue = $("#" + controlID).attr("parentValue");
		if (!CValidator.isNull(parentValue)) {
			if (CValidator.isNull($("#" + parentValue).val())) {
				var cls = $("#" + parentValue).parent().prev().attr("class");
				if (CValidator.isNull(cls)) {
					cls = $("#" + parentValue).prev().attr("class");
				}
				cls = cls.replaceAll("label", "");
				cls = cls.replaceAll("star", "");
				cls = cls.trim();
				CCore.alert(CCore.getValue("Common_PleaseSelect", cls));
				return false;
			}
		}
		var parentField = $("#" + controlID).attr("parentField");
		if (CValidator.isNull(parentField)) {
			parentField = "memo";
		}

		$("#" + controlID).after(
				"<ul id='dict_pick_" + controlID
						+ "' class='ztree dict_pick'></ul>");
		var isMulti = $("#" + controlID).data("ismulti");
		var check = {
			enable : true,
			chkStyle : "radio",
			radioType : "all"
		};
		if (isMulti == true) {
			check = {
				enable : true,
				chkboxType : {
					"Y" : "",
					"N" : ""
				}
			};
		}
		var setting = {
			check : check,
			view : {
				dblClickExpand : false,
				showIcon : false
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				onClick : onClick,
				onCheck : onCheck
			}
		};
		var parentID = $("#" + controlID).data("parentid");
		var isOnlyNext = $("#" + controlID).data("isonlynextlevel");
		var dicts;
		if (isOnlyNext) {
			dicts = CCore.getNextDicts(parentID);
		} else {
			dicts = CCore.getAllDicts(parentID);
		}
		var nodes = [];
		$.each(dicts, function(i, dict) {
			var checked = false;
			if (CCore.contain($("#" + controlID).val(), dict.ID)) {
				checked = true;
			}
			var nocheck = false;
			if (isParent(dicts, dict) && parentID != CDict.Group) {
				nocheck = true;
			}
			if (parentID == CDict.Group) {
				if (dict.statusID == CDict.OrganizationTypeDepartment) {
					nocheck = true;
				}
			}

			var node = {
				id : dict.ID,
				pId : dict.parentID,
				code : dict.code,
				name : dict.name,
				open : true,
				checked : checked,
				nocheck : nocheck
			};
			if (!CValidator.isNull(parentValue)) {
				if (dict[parentField] == $("#" + parentValue).val()) {
					nodes.push(node);
				}
			} else {
				nodes.push(node);
			}
		});

		$.fn.zTree.init($("#dict_pick_" + controlID), setting, nodes);
		var rows = 20;
		if (!CValidator.isNull(nodes) && nodes.length > 0 && nodes.length < 20) {
			rows = nodes.length;
		}
		gTree = $.fn.zTree.getZTreeObj("dict_pick_" + controlID);
		var controlName = $("#" + controlID).data("controlname");
		var position = $("#" + controlName).position();
		$("#dict_pick_" + controlID).css("height", 24 * rows);
		if (nodes.length > 20) {
			$(".dict_pick").css("overflow-x", "hidden");
			$(".dict_pick").css("overflow-y", "auto");
			$(".dict_pick li").css("color", "#4d6878");
		}

		$("#dict_pick_" + controlID).css(
				{
					'left' : position.left + "px",
					'top' : position.top + 2
							+ $("#" + controlName).outerHeight() + "px"
				}).slideDown("slow");

		$("body").bind("mousedown", onMouseDown);
	};
	isParent = function(dicts, c) {
		for (var i = 0; i < dicts.length; i++) {
			if (dicts[i].parentID == c.ID) {
				return true;
			}
		}
		return false;
	};
	onMouseDown = function(evt) {
		evt = evt ? evt : (window.event ? window.event : null);
		var target = (typeof evt.target == 'undefined' ? evt.srcElement
				: evt.target);
		if (!($(target).parents("#dict_pick_" + gControlID).length > 0
				|| target.id == gControlID || target.id == "dict_pick_"
				+ gControlID)) {
			hideMenu();
		}
	};
	hideMenu = function() {
		$("#dict_pick_" + gControlID).fadeOut("fast");
		$("#dict_pick_" + gControlID).remove();
		$("body").unbind("mousedown", onMouseDown);
	};
	onClick = function(e, treeId, treeNode) {
		gTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
	};
	onCheck = function(e, treeId, treeNode) {
		var names = "";
		var ids = "";
		var nodes = gTree.getCheckedNodes(true);
		for (var i = 0; i < nodes.length; i++) {
			names += nodes[i].name + ",";
			ids += nodes[i].id + ",";
		}
		if (names.length > 0)
			names = names.substring(0, names.length - 1);
		if (ids.length > 0)
			ids = ids.substring(0, ids.length - 1);
		var controlName = $("#" + gControlID).data("controlname");
		$("#" + controlName).val(names);
		$("#" + gControlID).val(ids);
		var callback = $("#" + gControlID).data("callback");
		if (!CValidator.isNull(callback)) {
			eval(callback);
		}
	};
	window['CDictPick']['init'] = init;
})();

(function() {
	window['CMemberPick'] = {};
	controlID = "";
	controlName = "";
	groupID = -1;
	isMultiple = true;
	init = function(ctlID, isMulti, grpID, isNeedContact) {
		// controlID = ctlID;
		// groupID = grpID;
		if (isMulti != false) {
			isMulti = true;
		}
		var ctlName = CCore.getControlNameByID(ctlID);
		$("#" + ctlName).remove();
		$("#" + ctlID).after(
				"<input readonly='readonly' class='pick' id='" + ctlName
						+ "' type='text' />");
		$("#" + ctlID).data("groupid", grpID);
		$("#" + ctlID).data("ismulti", isMulti);
		$("#" + ctlID).data("controlid", ctlID);
		$("#" + ctlID).data("controlname", ctlName);
		$("#" + ctlID).data("isNeedContact", isNeedContact);
		$("#" + ctlName).unbind("click");
		$("#" + ctlName).click(function() {
			loadModal('../member/pick.htm', 600, 450, function() {
				load(ctlID);
			});
		});
	};
	load = function(ctlID) {
		controlID = ctlID;
		isMultiple = $("#" + controlID).data("ismulti");
		groupID = $("#" + controlID).data("groupid");
		controlName = $("#" + controlID).data("controlname");
		isNeedContact = $("#" + controlID).data("isNeedContact");
		CMemberCommon.fillGroup("searchGroupID");
		if (!CValidator.isNull(groupID)) {
			$("#searchGroupID").hide();
			$("#searchGroupID").val(groupID);
		}
		var selectValues = $("#" + controlID).val();
		var selectTexts = $("#" + controlName).val();
		if (!CValidator.isNull(selectValues)) {
			Values = selectValues.split(',');
			Texts = selectTexts.split(',');
			var domOption = "";
			for (var i = 0; i < Values.length; i++) {
				domOption += "<option value='" + Values[i] + "'>" + Texts[i]
						+ "</option>"
			}
			$("#select_right").append(domOption);
		}
		if (isMultiple) {
			$("#select_left").attr("multiple", "multiple");
			$("#select_right").attr("multiple", "multiple");
		} else {
			$("#options_right_all,#options_left_all").hide();
		}
		listData(controlID, isNeedContact);

		$("#btnMemberPickSearch").click(listData);
		$("#btnPickMember").click(picks);
		$("#btnCancelPickMember").click(CCore.close);

		var options = {
			button_select : "#options_right",
			button_deselect : "#options_left",
			button_select_all : "#options_right_all",
			button_deselect_all : "#options_left_all",
			beforeMove : beforeMove
		};
		$("#select_left").multiSelect("#select_right", options);
		CCore.enterSubmit('searchKeyword', 'btnMemberPickSearch');
		$("#btnMemberPickSearch").html(CCore.getValue("Button_Search"));
		$("#btnPickMember").html(CCore.getValue("Button_OK"));
		$("#btnCancelPickMember").html(CCore.getValue("Button_Cancel"));
		CCore.label("MemberPickSearch");
	};
	listData = function(controlID, isNeedContact) {
		var param = CCore.getFormData('MemberPickSearch');
		param["isNeedContact"] = isNeedContact;
		var url = CCore.servicePath("/service/member/getpickmembers");
		var data = CCore.invoke(url, param);
		CCore.fillOptions('select_left', data, "ID", "username");
		var selectValues = $("#" + controlID).val();
		if (!CValidator.isNull(selectValues)) {
			var Values = selectValues.split(',');
			$.each(Values, function(i, value) {
				$("#select_left option[value='" + value + "']").remove();
			});
		}
	};
	picks = function() {
		var values = "";
		var texts = "";
		var options = $("#select_right").find("option");
		$.each(options, function(i, option) {
			values += option.value + ",";
			texts += option.text + ",";
		});
		if (values.endWith(",")) {
			values = values.substring(0, values.length - 1);
		}
		if (texts.endWith(",")) {
			texts = texts.substring(0, texts.length - 1);
		}
		$("#" + controlID).val(values);
		$("#" + controlName).val(texts);
		CCore.close();
	};
	beforeMove = function() {
		if (isMultiple) {
			var selectLeft = $("#select_left").find("option:selected");
			$.each(selectLeft, function(i, item) {
				$("#select_right option[value='" + item.value + "']").remove();
			});
		} else {
			var selectLeft = $("#select_left").find("option:selected");
			var selectRight = $("#select_right").find("option");
			$.each(selectRight, function(i, item) {
				$("#select_left").append(
						"<option value='" + item.value + "'>" + item.text
								+ "</option>");
				$("#select_right option[value='" + item.value + "']").remove();
			});
		}
		return true;
	};
	window['CMemberPick']['init'] = init;
})();

(function() {
	window['CFlow'] = {};
	var nextNodes = null;
	var itemID = null;
	selectNextNodeMember = function(container, fromNodeID, formItemID) {
		itemID = formItemID;
		nextNodes = CCore.invoke(CCore
				.servicePath("/service/flow/getnextnodes"), {
			"fromNodeID" : fromNodeID,
			"formItemID" : formItemID
		});// 必须多人全部审核才能通过的，还有未审核的，反回null
		if (!CValidator.isNull(nextNodes)) {
			var dom = "<label class='Common_Receivers'></label><select id='nextFlowNodeID' onchange='CFlow.getNextMembers()'></select><div id='nextMembers'></div>";
			$("#" + container).html(dom);
			CCore.fillOptions('nextFlowNodeID', nextNodes, "ID", "name", "");
			getNextMembers();
			if (nextNodes.length == 1) {
				$("#nextFlowNodeID").hide();
			}
		}
	};
	getNodeByID = function(nodeID) {
		for (var i = 0; i < nextNodes.length; i++) {
			if (nextNodes[i].ID == nodeID) {
				return nextNodes[i];
			}
		}
	};
	getNextMembers = function() {
		var nodeID = $("#nextFlowNodeID").val();
		var node = getNodeByID(nodeID);
		var nextMembers = CCore.invoke(CCore
				.servicePath("/service/flow/getnextmembers"), {
			"nodeID" : nodeID,
			"itemID" : itemID
		});
		CCore.fillChecks('nextMembers', nextMembers, "nextMemberIDs", "ID",
				"username");

		if (node.automationID == CDict.FlowNodeAutomationAuto) {
			$("#nextMembers input").attr("disabled", "true");
			$("#nextMembers input").attr("checked", "true");
		}
		if (!CValidator.isNull(nextMembers) && nextMembers.length == 1) {
			$("#nextMembers input").attr("disabled", "true");
			$("#nextMembers input").attr("checked", "true");
		}
		if (!CValidator.isNull(nextMembers)
				&& node.isCheckReceiver == CDict.Yes) {
			$("#nextMembers input").attr("checked", "true");
		}
	};

	getFlowTraceByID = function(id) {
		return CCore.invoke(
				CCore.servicePath('/service/flow/getflowtracebyid'), {
					"id" : id
				});
	};

	getCurrentFlowTrace = function(formItemID) {
		return CCore.invoke(CCore
				.servicePath('/service/flow/getcurrentflowtrace'), {
			"formItemID" : formItemID
		});
	};

	getFormNameByFormItemID = function(formItemID) {
		return CCore.invoke(CCore
				.servicePath('/service/flow/getformnamebyformitemid'), {
			"formItemID" : formItemID
		});
	};

	getFlowTracesByFormItemID = function(formItemID) {
		return CCore.invoke(CCore
				.servicePath('/service/flow/getflowtracesbyformitemid'), {
			"formItemID" : formItemID
		});
	};

	window['CFlow']['selectNextNodeMember'] = selectNextNodeMember;
	window['CFlow']['getNextMembers'] = getNextMembers;
	window['CFlow']['getFlowTraceByID'] = getFlowTraceByID;
	window['CFlow']['getCurrentFlowTrace'] = getCurrentFlowTrace;
	window['CFlow']['getFlowTracesByFormItemID'] = getFlowTracesByFormItemID;
	window['CFlow']['getFormNameByFormItemID'] = getFormNameByFormItemID;
})();

(function($) {
	var daysInWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
			"Friday", "Saturday" ];
	var shortMonthsInYear = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct", "Nov", "Dec" ];
	var longMonthsInYear = [ "January", "February", "March", "April", "May",
			"June", "July", "August", "September", "October", "November",
			"December" ];
	var shortMonthsToNumber = [];
	shortMonthsToNumber["Jan"] = "01";
	shortMonthsToNumber["Feb"] = "02";
	shortMonthsToNumber["Mar"] = "03";
	shortMonthsToNumber["Apr"] = "04";
	shortMonthsToNumber["May"] = "05";
	shortMonthsToNumber["Jun"] = "06";
	shortMonthsToNumber["Jul"] = "07";
	shortMonthsToNumber["Aug"] = "08";
	shortMonthsToNumber["Sep"] = "09";
	shortMonthsToNumber["Oct"] = "10";
	shortMonthsToNumber["Nov"] = "11";
	shortMonthsToNumber["Dec"] = "12";

	$.format = (function() {
		function strDay(value) {
			return daysInWeek[parseInt(value, 10)] || value;
		}
		;

		function strMonth(value) {
			var monthArrayIndex = parseInt(value, 10) - 1;
			return shortMonthsInYear[monthArrayIndex] || value;
		}
		;

		function strLongMonth(value) {
			var monthArrayIndex = parseInt(value, 10) - 1;
			return longMonthsInYear[monthArrayIndex] || value;
		}
		;

		var parseMonth = function(value) {
			return shortMonthsToNumber[value] || value;
		};

		var parseTime = function(value) {
			var retValue = value;
			var millis = "";
			if (retValue.indexOf(".") !== -1) {
				var delimited = retValue.split('.');
				retValue = delimited[0];
				millis = delimited[1];
			}
			;

			var values3 = retValue.split(":");

			if (values3.length === 3) {
				hour = values3[0];
				minute = values3[1];
				second = values3[2];

				return {
					time : retValue,
					hour : hour,
					minute : minute,
					second : second,
					millis : millis
				};
			} else {
				return {
					time : "",
					hour : "",
					minute : "",
					second : "",
					millis : ""
				};
			}
			;
		};

		return {
			date : function(value, format) {
				try {
					var date = null;
					var year = null;
					var month = null;
					var dayOfMonth = null;
					var dayOfWeek = null;
					var time = null;
					if (typeof value.getFullYear === "function") {
						year = value.getFullYear();
						month = value.getMonth() + 1;
						dayOfMonth = value.getDate();
						dayOfWeek = value.getDay();
						time = parseTime(value.toTimeString());
					} else if (value
							.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/) != -1) { /* 2009-04-19T16:11:05+02:00 */
						var values = value.split(/[T\+-]/);
						year = values[0];
						month = values[1];
						dayOfMonth = values[2];
						time = parseTime(values[3].split(".")[0]);
						date = new Date(year, month - 1, dayOfMonth);
						dayOfWeek = date.getDay();
					} else {
						var values = value.split(" ");
						switch (values.length) {
						case 6:
							/* Wed Jan 13 10:43:41 CET 2010 */
							year = values[5];
							month = parseMonth(values[1]);
							dayOfMonth = values[2];
							time = parseTime(values[3]);
							date = new Date(year, month - 1, dayOfMonth);
							dayOfWeek = date.getDay();
							break;
						case 2:
							/* 2009-12-18 10:54:50.546 */
							var values2 = values[0].split("-");
							year = values2[0];
							month = values2[1];
							dayOfMonth = values2[2];
							time = parseTime(values[1]);
							date = new Date(year, month - 1, dayOfMonth);
							dayOfWeek = date.getDay();
							break;
						case 7:
							/* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
						case 9:
							/*
							 * added by Larry, for Fri Apr 08 2011 00:00:00
							 * GMT+0800 (China Standard Time)
							 */
						case 10:
							/*
							 * added by Larry, for Fri Apr 08 2011 00:00:00
							 * GMT+0200 (W. Europe Daylight Time)
							 */
							year = values[3];
							month = parseMonth(values[1]);
							dayOfMonth = values[2];
							time = parseTime(values[4]);
							date = new Date(year, month - 1, dayOfMonth);
							dayOfWeek = date.getDay();
							break;
						default:
							return value;
						}
						;
					}
					;

					var pattern = "";
					var retValue = "";
					/*
					 * Issue 1 - variable scope issue in format.date Thanks
					 * jakemonO
					 */
					for (var i = 0; i < format.length; i++) {
						var currentPattern = format.charAt(i);
						pattern += currentPattern;
						switch (pattern) {
						case "ddd":
							retValue += strDay(dayOfWeek);
							pattern = "";
							break;
						case "dd":
							if (format.charAt(i + 1) == "d") {
								break;
							}
							if (String(dayOfMonth).length === 1) {
								dayOfMonth = '0' + dayOfMonth;
							}
							retValue += dayOfMonth;
							pattern = "";
							break;
						case "MMMM":
							retValue += strLongMonth(month);
							pattern = "";
							break;
						case "MMM":
							if (format.charAt(i + 1) === "M") {
								break;
							}
							retValue += strMonth(month);
							pattern = "";
							break;
						case "MM":
							if (format.charAt(i + 1) == "M") {
								break;
							}
							if (String(month).length === 1) {
								month = '0' + month;
							}
							retValue += month;
							pattern = "";
							break;
						case "yyyy":
							retValue += year;
							pattern = "";
							break;
						case "yy":
							if (format.charAt(i + 1) == "y"
									&& format.charAt(i + 2) == "y") {
								break;
							}
							retValue += String(year).slice(-2);
							pattern = "";
							break;
						case "HH":
							retValue += time.hour;
							pattern = "";
							break;
						case "hh":
							/*
							 * time.hour is "00" as string == is used instead of
							 * ===
							 */
							var hour = (time.hour == 0 ? 12
									: time.hour < 13 ? time.hour
											: time.hour - 12);
							hour = String(hour).length == 1 ? '0' + hour : hour;
							retValue += hour;
							pattern = "";
							break;
						case "h":
							if (format.charAt(i + 1) == "h") {
								break;
							}
							;
							var hour = (time.hour == 0 ? 12
									: time.hour < 13 ? time.hour
											: time.hour - 12);
							retValue += hour;
							pattern = "";
							break;
						case "mm":
							retValue += time.minute;
							pattern = "";
							break;
						case "ss":
							/*
							 * ensure only seconds are added to the return
							 * string
							 */
							retValue += time.second.substring(0, 2);
							pattern = "";
							break;
						case "SSS":
							retValue += time.millis.substring(0, 3);
							pattern = "";
							break;
						case "a":
							retValue += time.hour >= 12 ? "PM" : "AM";
							pattern = "";
							break;
						case " ":
							retValue += currentPattern;
							pattern = "";
							break;
						case "/":
							retValue += currentPattern;
							pattern = "";
							break;
						case ":":
							retValue += currentPattern;
							pattern = "";
							break;
						default:
							if (pattern.length === 2
									&& pattern.indexOf("y") !== 0
									&& pattern != "SS") {
								retValue += pattern.substring(0, 1);
								pattern = pattern.substring(1, 2);
							} else if ((pattern.length === 3 && pattern
									.indexOf("yyy") === -1)) {
								pattern = "";
							}
							;
						}
						;
					}
					;
					return retValue;
				} catch (e) {
					return value;
				}
				;
			}
		};
	}());
}(jQuery));