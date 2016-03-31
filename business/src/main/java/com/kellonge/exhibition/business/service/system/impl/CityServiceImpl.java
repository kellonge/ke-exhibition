package com.kellonge.exhibition.business.service.system.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.system.CityService;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.model.entity.system.SysDict;
import com.kellonge.exhibition.model.vo.city.CityItem;

@Repository("cityService")
public class CityServiceImpl extends BaseServiceImpl<SysDict> implements CityService {

	@Resource
	DictService dictService;

	public List<CityItem> getList() {
		List<SysDict> cityRawList = dictService.getListByParentCode("004");
		List<CityItem> cityList = new ArrayList<CityItem>();
		for (SysDict cityRaw : cityRawList) {
			if (cityRaw.getCode().length() == 6) {
				CityItem cityItem = new CityItem(); 
				BeanUtils.copyProperties(cityRaw, cityItem);
				cityList.add(cityItem);
			}
		}
		return cityList;
	} 

}
