package com.kellonge.exhibition.business.service.system;

import java.util.List;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.system.SysDict;

public interface DictService extends BaseService<SysDict> {

	/**
	 * 获取字典列表，根据编号，获取其子节点的列表。
	 * @param code
	 * @return
	 */
	public List<SysDict> getListByParentCode(String code);

	public SysDict getDictByCode(String code);
	
	public String getDictNameByID(int id);
}
