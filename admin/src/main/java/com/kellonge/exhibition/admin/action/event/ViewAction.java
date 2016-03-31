package com.kellonge.exhibition.admin.action.event;

import javax.annotation.Resource;

import com.kellonge.exhibition.admin.action.base.BaseAction;
import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.common.convert.ConvertUtil;

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
