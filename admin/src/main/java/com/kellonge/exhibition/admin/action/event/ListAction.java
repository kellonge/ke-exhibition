package com.kellonge.exhibition.admin.action.event;

import java.util.Date;

import javax.annotation.Resource;

import com.kellonge.exhibition.admin.action.base.BaseAction;
import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.business.service.system.CityService;
import com.kellonge.exhibition.model.constant.SysConstant;

public class ListAction extends BaseAction {

	@Resource
	CityService cityService;
	@Resource
	EventService eventService;

	private Integer page = 0;
	private Integer cityID = 864;// 默认上海
	private Date bdate;
	private Date edate;
	private String keyword;
	private Integer releaseStatus;

	@Override
	public String execute() throws Exception {
		pageData.put("citys", cityService.getList());
		pageData.put("events", eventService.getAdminEventList(page, SysConstant.ADMIN_PAGE_SIZE, bdate, edate, keyword, cityID, releaseStatus));
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

	public Date getBdate() {
		return bdate;
	}

	public void setBdate(Date bdate) {
		this.bdate = bdate;
	}

	public Date getEdate() {
		return edate;
	}

	public void setEdate(Date edate) {
		this.edate = edate;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Integer getReleaseStatus() {
		return releaseStatus;
	}

	public void setReleaseStatus(Integer releaseStatus) {
		this.releaseStatus = releaseStatus;
	}

}
