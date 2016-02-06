package com.kellonge.exhibition.business.service.util;

public interface UtilService {

	/**
	 * 增加图片主机地址
	 * @param url
	 * @param defualtImg -1表示不进行默认图片处理
	 */
	public String handleImgHost(String url,int defualtImg);
}
