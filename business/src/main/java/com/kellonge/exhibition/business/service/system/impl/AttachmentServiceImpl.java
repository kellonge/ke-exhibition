package com.kellonge.exhibition.business.service.system.impl;

import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.system.AttachmentService;
import com.kellonge.exhibition.business.service.base.impl.BaseServiceImpl;
import com.kellonge.exhibition.model.entity.system.Attachment;

@Repository("attachmentService")
public class AttachmentServiceImpl extends BaseServiceImpl<Attachment> implements AttachmentService {

}
