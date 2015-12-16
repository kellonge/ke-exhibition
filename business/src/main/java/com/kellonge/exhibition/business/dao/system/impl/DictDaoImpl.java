package com.kellonge.exhibition.business.dao.system.impl;

import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.dao.base.impl.BaseDaoImpl;
import com.kellonge.exhibition.business.dao.system.DictDao;
import com.kellonge.exhibition.model.entity.system.Dict;

@Repository("dictDao")
public class DictDaoImpl extends BaseDaoImpl<Dict> implements DictDao {

}
