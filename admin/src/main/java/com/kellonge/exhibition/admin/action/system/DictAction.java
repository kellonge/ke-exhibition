package com.kellonge.exhibition.admin.action.system;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import com.kellonge.exhibition.admin.action.base.BaseServiceAction;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.context.AppContext;
import com.kellonge.exhibition.model.entity.Dict;

public class DictAction extends BaseServiceAction {

	@Resource
	DictService dictService;

	@Action(value = "/service/dict/list", results = { @Result(type = "json", name = SUCCESS, params = { "root", "resultVo" }) })
	public String list() {
		List<Dict> list = dictService.getList();
		resultVo.setSuccess(list, null);
		return SUCCESS;
	}

}
