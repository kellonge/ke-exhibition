package com.kellonge.exhibition.business.service.system.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.common.lang.CLang;
import com.kellonge.exhibition.common.lang.ResourceUtil;
import com.kellonge.exhibition.model.entity.system.Dict;

@Repository("dictService")
public class DictServiceImpl extends BaseServiceImpl<Dict> implements DictService {

	Logger logger = Logger.getLogger(DictServiceImpl.class);
	private List<Dict> allDicts = null;
	private List<Dict> allDictsSortByID = null;
	private ArrayList<Integer> allDictIDs = null;
	private String LangCodeSequenceNo = "";
	private String LangCodeSequenceID = "";
 
	public String getDictNamesByIDs(String strDictIDs) {
		String strNames = "";
		if (strDictIDs != null && !"".equals(strDictIDs)) {
			String[] strIDs = StringUtils.split(strDictIDs, ",");
			for (String strID : strIDs) {
				if (!"".equals(strNames)) {
					strNames += ",";
				}
				strNames += getDictNameByID(ConvertUtil.toInt(strID));
			}
		}
		return strNames;
	}

	public String getDictNameByID(Integer nDictID) {
		if (nDictID != null) {
			String name = ResourceUtil.getValue("Dict_" + nDictID);
			if (StringUtils.isEmpty(name)) {
				Dict d = getDictFromDB(nDictID);
				name = d.getName();
			}
			return name;
		}
		return "";
	}

	// / <summary>
	// / 取得所有字典对象
	// / </summary>
	// / <returns></returns>
	private List<Dict> getAllDicts() {
		if (allDicts == null) {
			allDicts = (List<Dict>) getList(" select * from dict order by sequenceNo ", Dict.class);
		}
		String v = ConvertUtil.toString(CLang.getCurrentLangID());
		if (!LangCodeSequenceNo.equals(v)) {
			for (Dict dict : allDicts) {
				String strName = getDictNameByID(dict.getId());
				if (StringUtils.isNotEmpty(strName)) {
					dict.setName(strName);
				}
			}
			LangCodeSequenceNo = v;
		}
		return allDicts;
	}

	// / <summary>
	// / 取得所有字典对象
	// / </summary>
	// / <returns></returns>
	
	private List<Dict> getAllDictsSortByID() {
		if (allDictsSortByID == null) {
			allDictsSortByID = (List<Dict>) getList(" select * from dict order by id ", Dict.class);
		}

		String v = ConvertUtil.toString(CLang.getCurrentLangID());
		if (!LangCodeSequenceID.equals(v)) {
			for (Dict dict : allDictsSortByID) {
				String strName = getDictNameByID(dict.getId());
				if (StringUtils.isNotEmpty(strName)) {
					dict.setName(strName);
				}
			}
			LangCodeSequenceID = v;
		}
		return allDictsSortByID;
	}

	
	private ArrayList<Integer> getAllDictIDs() {
		if (allDictIDs == null) {
			allDictIDs = new ArrayList<Integer>();
			List<Dict> allDictsSortByIDs = getAllDictsSortByID();
			for (Dict dict : allDictsSortByIDs) {
				allDictIDs.add(dict.getId());
			}
			// Collections.sort(allDictIDs);
		}
		return allDictIDs;
	}

	public void dictToResource(Dict dict) {
		try {
			String strKey = "Dict_" + dict.getId();
			Map<String, String> resources = ResourceUtil.getCurrentResources();

			resources.put(strKey, dict.getName());
			ResourceUtil.exportResources(resources);

		} catch (Exception e) {
			logger.info("生成XML文件出错：" + e.getMessage());
		}
	}

	// / <summary>
	// / 清除内存中的字典档
	// / </summary>
	public void clear() {
		allDicts = null;
		allDictIDs = null;
		allDictsSortByID = null;
	}

	public boolean haveChildDict(int nDictID) {
		List<Dict> all = getAllDicts();
		for (Dict dict : all) {
			if (dict.getParentID() == nDictID) {
				return true;
			}
		}
		return false;
	}

	// / <summary>
	// / 根据分类取得字典列表
	// / </summary>
	// / <param name="dictCategory"></param>
	// / <returns></returns>
	public List<Dict> getNextDicts(Integer nParentID) {
		List<Dict> dicts = new ArrayList<Dict>();
		for (Dict dict : getAllDicts()) {
			if (dict.getParentID().equals(nParentID)) {
				dicts.add((Dict) dict.clone());
			}
		}
		return dicts;
	}

	public List<Dict> getAllDicts(int nParentID) {
		List<Dict> dicts = new ArrayList<Dict>();
		List<Dict> all = getAllDicts();
		if (nParentID == 0) {
			for (Dict dict : all) {
				dicts.add((Dict) dict.clone());
			}
		} else {
			Dict parent = getDictByID(nParentID);
			if (parent != null) {
				for (Dict dict : all) {
					if (dict.getCode().startsWith(parent.getCode()) && !dict.getCode().equals(parent.getCode())) {
						dicts.add((Dict) dict.clone());
					}
				}
			}
		}
		return dicts;
	}

	// / <summary>
	// / 根据ID取得一个字典档
	// / </summary>
	// / <param name="strDictID"></param>
	// / <returns></returns>	
	@SuppressWarnings("unchecked")
	public Dict getDictByID(Integer nDictID) {
		Dict dict = null;
		if (nDictID <= 0) {
			return null;
		}
		try {
			int nIndex = Collections.binarySearch(getAllDictIDs(), nDictID);
			dict = getAllDictsSortByID().get(nIndex);
			dict.setParentName(getDictNameByID(dict.getParentID()));
		} catch (Exception e) {

		}
		if (dict != null) {
			return (Dict) dict.clone();
		} else {
			return null;
		}
	}

	// / <summary>
	// / 从数据库中取得一个对象:管理用
	// / </summary>
	// / <param name="?"></param>
	// / <returns></returns>
	public Dict getDictFromDB(int nDictID) {
		return (Dict) getById(Dict.class, nDictID);
	}

	// / <summary>
	// / 根据ID删除一个字典档
	// / </summary>
	// / <param name="nDictID"></param>
	public void deleteDictFromDB(int nDictID) {
		execSql(" delete from dict where id=?", nDictID);
	}

	// 设置编码
	private Dict setCode(Dict dict) {
		// 根据ParentID和CategoryID取得当前级别最大的编码
		Map<String, Object> map = getMap(" SELECT MAX(code) as code FROM dict  WHERE parentID = ? ", dict.getId());
		String strCode = ConvertUtil.toString(map.get("code"));
		// 如果当前级别最大编码不存在,则设置为ParentCode + 0001
		if (StringUtils.isEmpty(strCode) || strCode.length() < 4) {
			Dict parentDict = getById(Dict.class, dict.getParentID());
			if (parentDict != null) {
				strCode = parentDict.getCode();
			} else {
				strCode = "";
			}

			strCode += "0001";
		} else {
			String strEndCode = strCode.substring(strCode.length() - 4, strCode.length());
			String strNextCode = StringUtils.leftPad(ConvertUtil.toString(ConvertUtil.toInt(strEndCode) + 1), 4, '0');

			strCode = strCode.substring(0, strCode.length() - 4) + strNextCode;
		}
		dict.setCode(strCode);
		return dict;
	}

	// / <summary>
	// / 保存一个字典当
	// / </summary>
	// / <param name="dict"></param>
	public void saveDict(Dict dict) {

		if (dict.getId() == null || dict.getId() == 0) {
			// 设置编码,只是新增时需要设置
			setCode(dict);
			if (dict.getStatusID() == null) {
				dict.setStatusID(0);
			}
			if (dict.getSequenceNo() == null) {
				dict.setSequenceNo(1);
			}
			if (dict.getIsReadonly() == null) {
				dict.setIsReadonly(0);
			}
			save(dict);
		} else {
			update(dict);
		}

	}

	public void dictRemoveFromResource(int nID) {
		String strKey = "Dict_" + nID;

		Map<String, String> resources = ResourceUtil.getCurrentResources();
		if (resources.containsKey(strKey)) {
			resources.remove(strKey);
		}
		ResourceUtil.exportResources(resources);
	}

	public int getMaxSequence(int nParentID) {
		Map<String, Object> map = getMap(" SELECT MAX(sequenceNo) AS sequenceNo FROM dict WHERE parentID = ? ", nParentID);
		Object strMaxID = map.get("sequenceNo");
		int nMaxID = ConvertUtil.toInt(strMaxID, 1) + 2;
		return nMaxID;
	}

	public Dict getNewDict() {
		Map<String, Object> map = getMap(" SELECT MAX(id) AS id FROM dict   ");
		Object strMaxID = map.get("id");
		int nID = ConvertUtil.toInt(strMaxID, -1);
		return getDictFromDB(nID);
	}

}
