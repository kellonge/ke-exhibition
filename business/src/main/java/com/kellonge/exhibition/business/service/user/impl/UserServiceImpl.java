package com.kellonge.exhibition.business.service.user.impl;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.function.GroupMenuService;
import com.kellonge.exhibition.business.service.user.UserService;
import com.kellonge.exhibition.common.context.HttpContext;
import com.kellonge.exhibition.common.convert.ConvertUtil;
import com.kellonge.exhibition.model.constant.SessionConstant;
import com.kellonge.exhibition.model.entity.user.Member;

@Repository("userService")
public class UserServiceImpl extends BaseServiceImpl<Member> implements UserService {

	Logger logger = Logger.getLogger(UserServiceImpl.class);

	@Resource
	GroupMenuService groupMenuService;
	
	public boolean isInRole(Integer nMenuID) {
		String groupMenus = groupMenuService.getGroupFunctions(getCurrentMember().getGroupID());	 
		if (StringUtils.contains(groupMenus, ConvertUtil.toString(nMenuID))) {
			return true;
		}
		return false;
	}

	public void setCurrentMember(Member member) {

		HttpContext.setSessionValue(SessionConstant.SessionKey_CurrentMember, member);
	}

	public Member getCurrentMember() {
		try {
			return (Member) HttpContext.getSessionValue(SessionConstant.SessionKey_CurrentMember);
		} catch (Exception e) {
			e.printStackTrace();
			logger.debug("getCurrentMember:" + e.getMessage());
		}
		return null;
	}

	public boolean IsAdmin() {
		return IsAdmin(getCurrentMember().getUsername());
	}

	public boolean IsAdmin(String strUsername) {
		return "admin" == strUsername;
	}

	public boolean checkAccess() {
		boolean isAccess = true;
		try {
			Member member = (Member) HttpContext.getSessionValue(SessionConstant.SessionKey_CurrentMember);
			if (member == null) {
				isAccess = false;
			}
		} catch (Exception e) {
			logger.debug("checkAccess" + e.getMessage());
		}
		return isAccess;
	}

	public boolean isPubMember(String strMemberID) {
		return getCurrentMember().getId().equals(strMemberID);
	}

}
