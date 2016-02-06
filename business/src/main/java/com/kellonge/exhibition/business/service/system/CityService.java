package com.kellonge.exhibition.business.service.system;

import java.util.List;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.system.SysDict;
import com.kellonge.exhibition.model.vo.system.city.CityItem;

public interface CityService extends BaseService<SysDict> {

	/**
	 * 获取所有城市列表
	 * 
	 * @param code
	 * @return
	 */
	public List<CityItem> getList();
}
