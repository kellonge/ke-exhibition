package com.kellonge.exhibition.business.service.event;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.event.Event;
import com.kellonge.exhibition.model.vo.system.PageData;

public interface EventService extends BaseService<Event> {

	/**
	 * 获取所有活动列表
	 * 
	 * @param cityID
	 * @param page
	 * @return
	 */
	public List<Map<String, Object>> getEventList(Integer cityID, Integer page);

	/**
	 * 获取活动详请
	 * 
	 * @param eventID
	 * @return
	 */
	public Map<String, Object> getEventDetail(Integer eventID);

	/**
	 * 后台系统，查询列表
	 * 
	 * @param page
	 * @param pageSize
	 * @param bdate
	 * @param edate
	 * @param keyword
	 * @param cityID
	 * @param releaseStatus
	 * @return
	 */
	public PageData getAdminEventList(Integer page, Integer pageSize, Date bdate, Date edate, String keyword, Integer cityID, Integer releaseStatus);
	
	
	/**
	 * 后台系统，活动详情
	 * @param eventID
	 * @return
	 */
	public Map<String, Object> getAdminEventDetail(Integer eventID);

}
