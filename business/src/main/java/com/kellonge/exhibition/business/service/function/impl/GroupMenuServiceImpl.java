package com.kellonge.exhibition.business.service.function.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.function.GroupMenuService;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.constant.DictConstant;
import com.kellonge.exhibition.model.entity.function.GroupMenu;
import com.kellonge.exhibition.model.entity.system.Dict;
import com.kellonge.exhibition.model.entity.user.Member;

@Repository("groupMenuService")
public class GroupMenuServiceImpl extends BaseServiceImpl<GroupMenu> implements GroupMenuService {

	static List<GroupMenu> groupMenus = null;
	@Resource
	DictService dictService;

	private List<GroupMenu> getAllGroupMenus() {
		if (groupMenus == null) {
			groupMenus = (List<GroupMenu>) getList(" select * from groupmenu ", GroupMenu.class);
		}
		return groupMenus;
	}

	public void saveGroupMenu(GroupMenu groupMenu) {
		saveOrUpdate(groupMenu);
		groupMenus = null;
	}

	public String getGroupFunctions(Integer nGroupID) {

		List<GroupMenu> groupMenus = this.getAllGroupMenus();
		for (GroupMenu groupMenu : groupMenus) {
			if (groupMenu.getId().equals(nGroupID)) {
				return groupMenu.getMenuIDs();
			}
		}
		return "";
	}

	public List<Dict> getAllFunctions() {
		List<Dict> menus = new ArrayList<Dict>();
		menus = dictService.getAllDicts(DictConstant.BackendMenu);
		return menus;
	}

	public List<Dict> getAuthorityMenus(Member member) {
		List<Dict> menus = new ArrayList<Dict>();
		String[] menuIDs = StringUtils.split(getGroupFunctions(member.getGroupID()), ",");
		for (String menuID : menuIDs) {
			Dict menu = dictService.getById(Dict.class, ConvertUtil.toInt(menuID));
			if (menu != null && !menu.getStatusID().equals(DictConstant.FunctionOperation)) {
				menus.add(menu);
			}
		}
		return menus;
	}

}
