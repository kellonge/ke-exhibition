package com.kellonge.exhibition.business.service.doc.impl;

import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.business.service.doc.InformationService;
import com.kellonge.exhibition.model.entity.doc.Information;

@Repository("informationService")
public class InformationServiceImpl extends BaseServiceImpl<Information> implements InformationService {

}
