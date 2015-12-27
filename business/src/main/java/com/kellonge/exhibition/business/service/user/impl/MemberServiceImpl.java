package com.kellonge.exhibition.business.service.user.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.user.MemberService;
import com.kellonge.exhibition.model.entity.user.Member;

@Repository("memberService")
public class MemberServiceImpl extends BaseServiceImpl<Member> implements MemberService {

	Logger logger = Logger.getLogger(MemberServiceImpl.class);

	private static List<Member> All = new ArrayList<Member>();

//	public void saveMember(Member member) {
//		if (member.getId() == null) {
//			member.setRegistDate(new Date());
//		}
//		saveOrUpdate(member);
//
//	}
//
//	// 根据ID查询
//	public Member getMemberByID(String strMemberID) {
//		for (Member m : getAllMember()) {
//			if (m.getId().equals(strMemberID)) {
//				return extendMember(m);
//			}
//		}
//		return null;
//	}
//
//	// 根据用户名查询
//	public Member getMemberByUsername(String strUsername) {
//		return this.extendMember((Member) dao.getEntityByDual(Member.class, "Username", strUsername));
//	}
//
//	public List<Member> getAllMember() {
//		if (All == null || All.size() == 0) {
//			All = (List<Member>) dao.getAll(Member.class);
//		}
//		return All;
//	}
//
//	public List<Member> getMemberByKeyword(String strKeyword) {
//		List<Member> list = new ArrayList<Member>();
//		try {
//			String hql = "FROM Member m WHERE m.Username LIKE :Keyword  OR m.Username LIKE :UpperCaseKeyword ORDER BY m.Username";
//			Query query = DataAccessObject.openSession().createQuery(hql);
//			query.setString("Keyword", "%" + strKeyword + "%");
//			query.setString("UpperCaseKeyword", "%" + Utility.toSafeString(strKeyword).toUpperCase() + "%");
//			list = query.list();
//		} catch (Exception e) {
//			LogPrinter.error("getMemberByKeyword" + e.getMessage());
//		} finally {
//			DataAccessObject.closeSession();
//		}
//
//		return list;
//	}
//
//	// 分页
//	public List getMembers(int nPageIndex, int nPageSize) {
//
//		return dao.getList(Member.class, nPageIndex, nPageSize);
//	}
//
//	public long getMembersCount() {
//		return dao.getListCount(Member.class);
//	}
//
//	public List<Member> getPickMembers(String strKeyword, int searchGroupIDs) {
//		List<Member> members = new ArrayList<Member>();
//		try {
//			String hql = "SELECT m FROM Member m WHERE (m.Username LIKE :Keyword ) ";
//
//			if (searchGroupIDs != -1) {
//				hql += " AND m.GroupID= :searchGroupIDs";
//			}
//
//			hql += " ORDER BY m.Username";
//
//			Query query = DataAccessObject.openSession().createQuery(hql);
//
//			if (searchGroupIDs != -1) {
//				query.setInteger("searchGroupIDs", searchGroupIDs);
//			}
//
//			query.setString("Keyword", "%" + strKeyword + "%");
//
//			members = query.list();
//		} catch (Exception e) {
//			LogPrinter.error("getPickMembers" + e.getMessage());
//		} finally {
//			DataAccessObject.closeSession();
//		}
//
//		return members;
//	}
//
//	public List<Member> getMembers(int nPageIndex, int nPageSize, String strKeyword, int searchGroupIDs, int searchStatusID) {
//		List<Member> list = new ArrayList<Member>();
//		try {
//			Query query = getMembersQuery("m", strKeyword, searchGroupIDs, searchStatusID);
//			query.setFirstResult(nPageIndex * nPageSize);
//			query.setMaxResults(nPageSize);
//			list = query.list();
//			for (Member member : list) {
//				extendMember(member);
//			}
//		} catch (Exception e) {
//			LogPrinter.error("getMembers" + e.getMessage());
//		} finally {
//			DataAccessObject.closeSession();
//		}
//
//		return list;
//	}
//
//	public long getMembersCount(String strKeyword, int searchGroupIDs, int searchStatusID) {
//		long count = 0;
//		try {
//			Query query = this.getMembersQuery(" COUNT(*) ", strKeyword, searchGroupIDs, searchStatusID);
//			count = Utility.toSafeLong(query.uniqueResult());
//		} catch (Exception e) {
//			LogPrinter.error("getMembersCount" + e.getMessage());
//		} finally {
//			DataAccessObject.closeSession();
//		}
//
//		return count;
//	}
//
//	private Query getMembersQuery(String strChange, String strKeyword, int searchGroupIDs, int searchStatusID) {
//		String hql = "SELECT " + strChange + " FROM Member m WHERE (m.Username LIKE :Keyword OR m.Mobile LIKE :Keyword) ";
//
//		if (searchGroupIDs != -1) {
//			hql += " AND m.GroupID= :searchGroupIDs";
//		}
//		if (searchStatusID != -1) {
//			hql += " AND m.StatusID= :searchStatusID";
//		}
//		hql += " ORDER BY m.RegistDate DESC";
//
//		Query query = DataAccessObject.openSession().createQuery(hql);
//
//		if (searchGroupIDs != -1) {
//			query.setInteger("searchGroupIDs", searchGroupIDs);
//		}
//		if (searchStatusID != -1) {
//			query.setInteger("searchStatusID", searchStatusID);
//		}
//		query.setString("Keyword", "%" + strKeyword + "%");
//		return query;
//	}
//
//	private Member extendMember(Member member) {
//		try {
//			if (member != null) {
//				member.setGroupName(DictManager.getDictNameByID(member.getGroupID()));
//				member.setStatusName(DictManager.getDictNameByID(member.getStatusID()));
//			}
//
//		} catch (Exception e) {
//			LogPrinter.info("extendMember" + e.getMessage());
//		}
//		return member;
//	}
//
//	public String login(String strUsername, String strPassword) {
//		try {
//
//			if (strUsername == null) {
//				ResourceUtil
//				return ResourceUtil.getValue("Member_UsernameIsNull");
//			}
//			if (strPassword == null) {
//				return ResourceUtil.getValue("Member_PasswordIsNull");
//			}
//			Member member = getMemberByUsername(strUsername);
//			if (member == null) {
//				return ResourceUtil.getValue("Common_UserNotExist");
//			}
//			if (!member.getPassword().equals(DEncrypt.md5(strPassword))) {
//				return ResourceUtil.getValue("Member_PasswordNotMatch");
//			}
//			return Utility.RESULT_VALUE_OK;
//		} catch (Exception err) {
//			return "login:" + err.getMessage();
//		}
//	}
//
//	// 删除
//	public void removeMemberByID(String strMemberID) {
//		dao.remove(Member.class, strMemberID);
//	}
//
//	public String removeMembers(String removeIDs) {
//		if (removeIDs.equals("")) {
//			return ResourceUtil.getValue("Common_PleaseSelectDeletedOption");
//		}
//
//		Transaction transaction = null;
//		Session session = null;
//		try {
//			session = DataAccessObject.openSession();
//			transaction = session.beginTransaction();
//
//			String[] arrMemberIDs = Utility.getStrArray(removeIDs);
//			for (Object memberID : arrMemberIDs) {
//				if (memberID != null && memberID != "") {
//					this.removeMemberByID(session, Utility.toSafeString(memberID));
//				}
//			}
//
//			transaction.commit();
//			return Utility.RESULT_VALUE_OK;
//		} catch (Exception e) {
//			transaction.rollback();
//			LogPrinter.error("removeMembers" + e.getMessage());
//			return e.getMessage();
//		} finally {
//			DataAccessObject.closeSession();
//		}
//	}
//
//	private void removeMemberByID(Session session, String strMemberID) {
//		remove(session, Member.class, strMemberID);
//	}
}
