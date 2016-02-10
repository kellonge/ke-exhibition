package com.kellonge.exhibition.business.service.event.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.business.service.util.UtilService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.constant.SysConstant;
import com.kellonge.exhibition.model.entity.event.Event;

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
		sql.append(" SELECT e.`eventID`,e.`eventImg`,e.`eventName`,e.`startTime`,e.`endTime`,e.`price`,e.`address`,ev.`latitude`,ev.`longitude`,e.`eventDesc`");
		sql.append(" FROM event e");
		sql.append(" INNER JOIN event_venue ev ON ev.`venueID`=e.`venueID`");
		sql.append(" WHERE e.isDel=0 AND e.`releaseStatus`=1 AND e.`eventID`=?");
		Map<String, Object> data = getMap(sql.toString(), eventID);
		data.put("eventImg", utilService.handleImgHost(ConvertUtil.toString(data.get("eventImg")), -1));
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

}
