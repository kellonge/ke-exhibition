package com.kellonge.exhibition.business.service.system;

import java.util.List;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.system.Dict;

public interface DictService  extends BaseService<Dict>{

	public String getDictNamesByIDs(String strDictIDs);

	public String getDictNameByID(Integer nDictID);

	public void dictToResource(Dict dict);

	// / <summary>
	// / 清除内存中的字典档
	// / </summary>
	public void clear();

	public boolean haveChildDict(int nDictID);

	// / <summary>
	// / 根据分类取得字典列表
	// / </summary>
	// / <param name="dictCategory"></param>
	// / <returns></returns>
	public List<Dict> getNextDicts(Integer nParentID);

	public List<Dict> getAllDicts(int nParentID);

	// / <summary>
	// / 根据ID取得一个字典档
	// / </summary>
	// / <param name="strDictID"></param>
	// / <returns></returns>
	public Dict getDictByID(Integer nDictID);

	// / <summary>
	// / 从数据库中取得一个对象:管理用
	// / </summary>
	// / <param name="?"></param>
	// / <returns></returns>
	public Dict getDictFromDB(int nDictID);

	// / <summary>
	// / 根据ID删除一个字典档
	// / </summary>
	// / <param name="nDictID"></param>
	public void deleteDictFromDB(int nDictID);

	// / <summary>
	// / 保存一个字典当
	// / </summary>
	// / <param name="dict"></param>
	public void saveDict(Dict dict);

	public void dictRemoveFromResource(int nID);

	public int getMaxSequence(int nParentID);

	public Dict getNewDict();

}
