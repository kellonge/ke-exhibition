package com.kellong.exhibition.console;

import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.context.AppContext;
import com.kellonge.exhibition.common.context.InitContext;
import com.kellonge.exhibition.model.entity.system.Dict;

/**
 * Hello world!
 *
 */
public class App {

	public static void main(String[] args) {
		InitContext.init();
		DictService dictService = AppContext.getBean(DictService.class);
		try {
			long b = System.currentTimeMillis();
			 
			dictService.saveTransaction();
			System.out.println((System.currentTimeMillis() - b) + "ms");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
