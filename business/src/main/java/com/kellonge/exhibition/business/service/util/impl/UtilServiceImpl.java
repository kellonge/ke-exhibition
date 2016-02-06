package com.kellonge.exhibition.business.service.util.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.kellonge.exhibition.business.service.util.UtilService;
import com.kellonge.exhibition.common.config.ConfigUtil;

@Repository("utilService")
public class UtilServiceImpl implements UtilService {

	public String handleImgHost(String url, int defualtImg) {
		if (StringUtils.isNotEmpty(url)) {
			if (!url.startsWith("http")) {
				return ConfigUtil.getImgHost() + url;
			}
		}
		return "";

	}

}
