package com.kellonge.exhibition.business.service.system;

import java.util.List;

import com.kellonge.exhibition.model.entity.system.Dict;

public interface DictService {

	public int save(Dict dict);

	public Dict getByID(int id);

	public void delete(Dict dict);

	public void update(Dict dict);

	public List<Dict> getList();

}
