package com.kellonge.exhibition.business.service.function;

import java.util.List;

import com.kellonge.exhibition.business.service.base.BaseService;
import com.kellonge.exhibition.model.entity.function.GroupMenu;
import com.kellonge.exhibition.model.entity.system.Dict;
import com.kellonge.exhibition.model.entity.user.Member;

public interface GroupMenuService extends BaseService<GroupMenu> {

	public void saveGroupMenu(GroupMenu groupMenu);

	public String getGroupFunctions(Integer nGroupID);

	public List<Dict> getAllFunctions();

	public List<Dict> getAuthorityMenus(Member member);

}
