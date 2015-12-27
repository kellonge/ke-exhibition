package com.kellonge.exhibition.business.service.base.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;

import com.kellonge.exhibition.business.service.base.BaseService;

public class BaseServiceImpl<T> implements BaseService<T> {

	@Resource
	SessionFactory sessionFactory;

	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	public int save(T o) {
		return (Integer) getCurrentSession().save(o);
	}

	public void delete(T o) {
		getCurrentSession().delete(o);

	}

	public void update(T o) {
		getCurrentSession().update(o);

	}

	public void saveOrUpdate(T o) {
		getCurrentSession().saveOrUpdate(o);

	}

	public T getById(Class<T> c, Integer id) { 
		return getCurrentSession().get(c, id);
	}

	@SuppressWarnings("unchecked")
	public T getBySql(String sql, Class<T> c, Object... params) {
		Query query = getCurrentSession().createSQLQuery(sql).addEntity(c).setMaxResults(1);
		if (params != null && params.length > 0) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return (T) query.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<T> getList(String sql, Class<T> c, Object... params) {
		Query query = getCurrentSession().createSQLQuery(sql).addEntity(c);
		if (params != null && params.length > 0) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.list();
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getMapList(String sql, Object... params) {
		Query query = getCurrentSession().createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		if (params != null && params.length > 0) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List<Object> list = query.list();
		List<Map<String, Object>> maps = new ArrayList<Map<String, Object>>();
		for (Object object : list) {
			maps.add((Map<String, Object>) object);
		}
		return maps;
	}

	public Map<String, Object> getMap(String sql, Object... params) {
		List<Map<String, Object>> mapList = getMapList(sql, params);
		return mapList.size() > 0 ? mapList.get(0) : null;
	}

	public int execSql(String sql, Object... params) {
		Query query = getCurrentSession().createSQLQuery(sql);
		if (params != null && params.length > 0) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.executeUpdate();
	}

	public Long getCount(String sql, Object... params) {
		Query query = getCurrentSession().createSQLQuery(sql).setMaxResults(1);
		if (params != null && params.length > 0) {
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return (Long) query.uniqueResult();
	}

}
