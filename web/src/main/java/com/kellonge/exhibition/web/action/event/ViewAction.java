package com.kellonge.exhibition.web.action.event;

import javax.annotation.Resource;

import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.web.action.base.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

public class ViewAction extends BaseAction {

	@Resource
	EventService eventService;

	@Override
	public String execute() throws Exception {
		Integer eventID = ConvertUtil.toInt(request.getParameter("eventID"));
		pageData.put("event", eventService.getEventDetail(eventID));
		return SUCCESS;
	}

}
