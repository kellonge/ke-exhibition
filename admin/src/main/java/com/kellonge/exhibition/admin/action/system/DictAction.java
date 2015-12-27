package com.kellonge.exhibition.admin.action.system;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.kellonge.exhibition.admin.action.base.BaseServiceAction;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.entity.system.Dict;

public class DictAction extends BaseServiceAction {

	@Resource
	DictService dictService;

	@Action(value = "/service/dict/getalldicts", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String list() {
		List<Dict> list =dictService.getAllDicts(ConvertUtil.toInt(getParameter("parentid")));
		resultVo.setSuccess(list, null);
		return SUCCESS;
	}

}
