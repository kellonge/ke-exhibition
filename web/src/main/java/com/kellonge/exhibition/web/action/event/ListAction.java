package com.kellonge.exhibition.web.action.event;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.web.action.base.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

public class ListAction extends BaseAction {

	@Resource
	EventService eventService;

	@Override
	public String execute() throws Exception {
		Integer cityID = ConvertUtil.toInt(request.getParameter("cityID"));
		Integer page = ConvertUtil.toInt(request.getParameter("page"));
		if (page == -1) {
			page = 0;
		}
		if (cityID == -1) {
			cityID = 864;
		}
		pageData.put("list", eventService.getEventList(cityID, page));
		return SUCCESS;

	}

}
