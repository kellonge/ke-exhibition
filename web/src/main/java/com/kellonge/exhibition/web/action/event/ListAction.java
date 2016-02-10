package com.kellonge.exhibition.web.action.event;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.business.service.system.CityService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.entity.system.SysDict;
import com.kellonge.exhibition.web.action.base.BaseAction;
import com.opensymphony.xwork2.ActionSupport;

public class ListAction extends BaseAction {

	@Resource
	CityService cityService;
	@Resource
	EventService eventService;

	private Integer page = 0;
	private Integer cityID = 864;
	private String cityName = "";

	@Override
	public String execute() throws Exception {
		pageData.put("city", cityService.getList());
		pageData.put("event", eventService.getEventList(cityID, page));
		SysDict sysDict = cityService.getByID(SysDict.class, cityID);
		if (sysDict != null) {
			setCityName(sysDict.getName());
		}
		return SUCCESS;

	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getCityID() {
		return cityID;
	}

	public void setCityID(Integer cityID) {
		this.cityID = cityID;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

}
