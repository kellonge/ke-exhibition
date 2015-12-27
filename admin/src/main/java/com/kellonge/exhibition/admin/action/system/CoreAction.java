package com.kellonge.exhibition.admin.action.system;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.kellonge.exhibition.admin.action.base.BaseServiceAction;
import com.kellonge.exhibition.business.service.user.UserService;
import com.kellonge.exhibition.common.config.ConfigUtil;
import com.kellonge.exhibition.common.context.HttpContext;
import com.kellonge.exhibition.common.lang.CLang;
import com.kellonge.exhibition.common.lang.ResourceUtil;

public class CoreAction extends BaseServiceAction {
	
	@Resource
	UserService userService;

	@Action(value = "/service/core/getserverversion", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String getserverversion() {
		resultVo.setSuccess(ConfigUtil.getProperties("sys.version"), null);
		return SUCCESS;
	}

	@Action(value = "/service/core/getlangs", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String getlangs() {
		resultVo.setSuccess(CLang.getLangs(), null);
		return SUCCESS;
	}

	@Action(value = "/service/core/getcurrentlang", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String getcurrentlang() {
		HttpServletRequest request = (HttpServletRequest) HttpContext.CurrentRequest.get();
		resultVo.setSuccess(CLang.getCurrentLangID(), null);
		return SUCCESS;
	}

	@Action(value = "/service/core/getresources", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String getresources() {
		Map<String, String> resourcesMap = ResourceUtil.getAllResources();
		List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
		if (resourcesMap != null && !resourcesMap.isEmpty()) {
			Set<String> keyList = resourcesMap.keySet();
			for (String key : keyList) {
				String value = resourcesMap.get(key);
				Map<String, String> map = new HashMap<String, String>();
				map.put("Key", key);
				map.put("Value", value);
				mapList.add(map);
			}
		}
		resultVo.setSuccess(mapList, null);
		return SUCCESS;
	}

	@Action(value = "/service/core/islogin", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String islogin() {
		resultVo.setSuccess(userService.checkAccess(), null);
		return SUCCESS;
	}

	@Action(value = "/service/core/isadmin", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String isadmin() {
		resultVo.setSuccess(userService.IsAdmin(getParameter("username")), null);
		return SUCCESS;
	}
}
