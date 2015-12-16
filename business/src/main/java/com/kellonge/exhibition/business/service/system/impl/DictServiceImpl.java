package com.kellonge.exhibition.business.service.system.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.dao.system.DictDao;
import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.model.entity.system.Dict;


@Repository("dictService")
public class DictServiceImpl implements DictService {

	@Resource
	DictDao dictDao;

	Logger logger = Logger.getLogger(DictServiceImpl.class);

	public int save(Dict dict) {
		int id = (Integer) dictDao.save(dict);

		return id;
	}

	public Dict getByID(int id) {
		return dictDao.getById(Dict.class, id);
	}

	public void delete(Dict dict) {
		dictDao.delete(dict);
	}

	public void update(Dict dict) {
		dictDao.update(dict);
	}

	public List<Dict> getList() {
		return dictDao.getList(" select * from dict ", Dict.class);
	}

}
