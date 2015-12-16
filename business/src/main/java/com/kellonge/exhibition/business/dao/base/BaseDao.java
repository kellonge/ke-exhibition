package com.kellonge.exhibition.business.dao.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface BaseDao<T> {

	/**
	 * 保存一个对象
	 * 
	 * @param o
	 * @return 对象的ID
	 */
	public int save(T o);

	/**
	 * 删除一个对象
	 * 
	 * @param o
	 */
	public void delete(T o);

	/**
	 * 更新一个对象
	 * 
	 * @param o
	 */
	public void update(T o);

	/**
	 * 保存或更新一个对象
	 * 
	 * @param o
	 */
	public void saveOrUpdate(T o);

	/**
	 * 通过主键获得对象
	 * 
	 * @param c
	 * @param id
	 * @return 对象
	 */
	public T getById(Class<T> c, Serializable id);

	/**
	 * 通过sql语句获取对象
	 * 
	 * @param sql
	 * @param params
	 * @return @
	 */
	public T getBySql(String sql, Class<T> c, Object... params);

	/**
	 * 通过sql语句获取对象列表
	 * 
	 * @param sql
	 * @param c
	 * @param objects
	 * @return
	 */
	public List<T> getList(String sql, Class<T> c, Object... params);

	/**
	 * 通过sql语句获取Map列表
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> getMapList(String sql, Object... params);

	/**
	 * 通过sql语句获取Map
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String, Object> getMap(String sql, Object... params);

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 * @param objects
	 * @
	 */
	public int execSql(String sql, Object... params);

	/**
	 * 查询SQL语句，返回记录总条数
	 * 
	 * @param sql
	 * @param objects
	 * @return @
	 */
	public Long getCount(String sql, Object... params);

}
