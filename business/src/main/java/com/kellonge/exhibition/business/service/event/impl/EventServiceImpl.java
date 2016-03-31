package com.kellonge.exhibition.business.service.event.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.business.service.util.UtilService;
import com.kellonge.exhibition.common.config.ConfigUtil;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.constant.SysConstant;
import com.kellonge.exhibition.model.entity.event.Event;
import com.kellonge.exhibition.model.vo.system.PageData;

@Repository("eventService")
public class EventServiceImpl extends BaseServiceImpl<Event> implements EventService {

	@Resource
	UtilService utilService;
	@Resource
	DictService dictService;

	public List<Map<String, Object>> getEventList(Integer cityID, Integer page) {
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT  e.`eventID`,e.`listImg`,e.`eventName`,ev.`venueID`,ev.`venueName`,e.`eventType`,e.`startTime`,e.`endTime`,e.`price`,");
		sql.append(" ( SELECT COUNT(1) FROM event_user_follow euf WHERE euf.`eventID`=e.`eventID`) AS likeCnt");
		sql.append(" FROM event e");
		sql.append(" INNER JOIN event_venue ev ON ev.`venueID`=e.`venueID`");
		sql.append(" WHERE e.isDel=0 AND e.`releaseStatus`=1  AND e.`cityID`=?");
		sql.append(" ORDER BY e.`eventID` DESC");
		sql.append(" LIMIT ?,?");
		List<Map<String, Object>> list = getMapList(sql.toString(), cityID, page * SysConstant.WEB_PAGE_SIZE, SysConstant.WEB_PAGE_SIZE);
		for (Map<String, Object> item : list) {
			Integer likeCnt = ConvertUtil.toInt(item.get("likeCnt"));
			if (likeCnt <= 0) {
				item.put("likeCnt", likeCnt);
			}
			item.put("eventTypeName", dictService.getDictNameByID(ConvertUtil.toInt(item.get("eventType"))));
			item.put("listImg", utilService.handleImgHost(ConvertUtil.toString(item.get("listImg")), -1));
		}
		return list;
	}

	@SuppressWarnings({ "unchecked" })
	public Map<String, Object> getEventDetail(Integer eventID) {
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT e.`eventID`,e.`eventImg`,e.`eventName`,e.`startTime`,e.`endTime`,e.`price`,e.`address`,ev.`latitude`,ev.`longitude`,ev.venueName,e.`eventDesc`");
		sql.append(" FROM event e");
		sql.append(" INNER JOIN event_venue ev ON ev.`venueID`=e.`venueID`");
		sql.append(" WHERE e.isDel=0 AND e.`releaseStatus`=1 AND e.`eventID`=?");
		Map<String, Object> data = getMap(sql.toString(), eventID);
		String addressUrl = ConfigUtil.getProperties("map.url");
		addressUrl = addressUrl.replace("{lat}", ConvertUtil.toString(data.get("latitude")));
		addressUrl = addressUrl.replace("{lng}", ConvertUtil.toString(data.get("longitude")));
		addressUrl = addressUrl.replace("{title}", ConvertUtil.toString(data.get("venueName")));
		addressUrl = addressUrl.replace("{addr}", ConvertUtil.toString(data.get("address")));
		data.put("eventImg", utilService.handleImgHost(ConvertUtil.toString(data.get("eventImg")), -1));
		data.put("addressUrl", addressUrl);
		sql = new StringBuffer();
		sql.append(" SELECT psd.`name` AS pname,sd.`name`,ea.`content` ");
		sql.append(" FROM event_attr ea ");
		sql.append(" INNER JOIN sys_dict sd ON sd.`id`=ea.`dictID`");
		sql.append(" INNER JOIN sys_dict psd ON sd.`parentID`=psd.`id`");
		sql.append(" WHERE ea.`eventID`=? ");
		sql.append(" ORDER BY psd.`viewOrder`,sd.`viewOrder`");
		List<Map<String, Object>> list = getMapList(sql.toString(), eventID);
		String attrItemName = "";
		List<Map<String, Object>> attrList = new ArrayList<Map<String, Object>>();// [{name:'',list:[{name:'',content:''}]}]
		Map<String, Object> attrListItem = null;
		for (Map<String, Object> rawAttr : list) {
			String currentAttrItemName = ConvertUtil.toString(rawAttr.get("pname"));
			if (currentAttrItemName.equals(attrItemName)) {
				List<Map<String, Object>> attrListItemChildList = (List<Map<String, Object>>) attrListItem.get("list");
				Map<String, Object> attrListItemChildListItem = new HashMap<String, Object>();
				attrListItemChildListItem.put("name", rawAttr.get("name"));
				attrListItemChildListItem.put("content", rawAttr.get("content"));
				attrListItemChildList.add(attrListItemChildListItem);
			} else {
				attrItemName = currentAttrItemName;
				attrListItem = new HashMap<String, Object>();
				attrListItem.put("name", currentAttrItemName);
				attrList.add(attrListItem);
				List<Map<String, Object>> attrListItemChildList = new ArrayList<Map<String, Object>>();
				Map<String, Object> attrListItemChildListItem = new HashMap<String, Object>();
				attrListItemChildListItem.put("name", rawAttr.get("name"));
				attrListItemChildListItem.put("content", rawAttr.get("content"));
				attrListItemChildList.add(attrListItemChildListItem);
				attrListItem.put("list", attrListItemChildList);
			}
		}
		data.put("attr", attrList);
		return data;
	}

	public PageData getAdminEventList(Integer page, Integer pageSize, Date bdate, Date edate, String keyword, Integer cityID, Integer releaseStatus) {
		PageData pageData = new PageData();
		StringBuffer sqlFrom = new StringBuffer();
		StringBuffer sqlSelect = new StringBuffer();
		List<Object> params = new ArrayList<Object>();
		sqlSelect.append(" SELECT e.* ");
		sqlFrom.append(" FROM event e WHERE e.isDel=0 ");
		if (cityID != null) {
			sqlFrom.append(" AND e.cityID =? ");
			params.add(cityID);
		}
		if (releaseStatus != null) {
			sqlFrom.append(" AND e.releaseStatus =? ");
			params.add(releaseStatus);
		}
		if (bdate != null && edate != null) {
			sqlFrom.append(" AND ( e.startTime>=? AND e.startTime<=? ) ");
			params.add(bdate);
			params.add(edate);
		}
		if (StringUtils.isNotEmpty(keyword)) {
			sqlFrom.append(" AND ( e.eventName LIKE ? OR e.address LIKE ? ) ");
			params.add("%" + keyword + "%");
			params.add("%" + keyword + "%");
		}
		pageData.setCount(ConvertUtil.toInt(getCount(" select count(1) " + sqlFrom.toString(), params.toArray())));
		params.add(page * pageSize);
		params.add(pageSize);
		pageData.setRow(getMapList(sqlSelect.toString() + sqlFrom.toString() + " ORDER BY eventID DESC LIMIT ?,? ", params.toArray()));
		return pageData;
	}

	public Map<String, Object> getAdminEventDetail(Integer eventID) {
		return getMap(" SELECT * FROM event WHERE isDel=0 AND eventID=? ", eventID);
	}

}
