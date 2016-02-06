package com.kellonge.exhibition.business.service.system.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.model.entity.system.SysDict;

@Repository("dictService")
public class DictServiceImpl extends BaseServiceImpl<SysDict> implements DictService {

	public List<SysDict> getListByParentCode(String code) {
		return getList(" SELECT * FROM sys_dict WHERE isDel=0 AND CODE LIKE ? AND CODE !=?  ", SysDict.class, code + "%", code);
	}

	public SysDict getByCode(String code) {
		return getBySql(" select * from sys_dict where isDel=0 and code=? ", SysDict.class, code);
	}

	public String getDictNameByID(int id) {
		SysDict sysDict = getByID(SysDict.class, id);
		if (sysDict == null) {
			return "";
		}
		return sysDict.getName();
	}

	public String getDictNameByCode(String code) {
		SysDict sysDict = getByCode(code);
		if (sysDict == null) {
			return "";
		}
		return sysDict.getName();
	}

}
