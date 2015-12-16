package com.kellonge.exhibition.business.service.user;

import com.kellonge.exhibition.model.entity.user.Member;

public interface UserService {

	public boolean getIsInRole(Integer nMenuID);

	public void setCurrentMember(Member member);

	public Member getCurrentMember();

	public boolean getIsAdmin();

	public boolean getIsAdmin(String strUsername);

	public boolean getCheckAccess();

	public boolean getIsPubMember(String strMemberID);
}
