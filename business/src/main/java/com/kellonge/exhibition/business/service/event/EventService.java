package com.kellonge.exhibition.business.service.event;

import java.util.List;
import java.util.Map;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.event.Event;

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

}
