package com.kellonge.exhibition.business.service.system;

import java.util.List;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.system.SysDict;

public interface DictService extends BaseService<SysDict> {

	/**
	 * 获取字典列表，根据编号，获取其子节点的列表。
	 * 
	 * @param code
	 * @return
	 */
	public List<SysDict> getListByParentCode(String code);

	/**
	 * 获取字典，根据编号
	 * 
	 * @param code
	 * @return
	 */
	public SysDict getByCode(String code);

	/**
	 * 获取字典名称，根据ID
	 * 
	 * @param id
	 * @return
	 */
	public String getDictNameByID(int id);

	/**
	 * 获取字典名称，根据编号
	 * 
	 * @param code
	 * @return
	 */
	public String getDictNameByCode(String code);
}
