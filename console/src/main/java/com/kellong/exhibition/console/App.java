package com.kellong.exhibition.console;

import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.context.AppContext;
import com.kellonge.exhibition.common.context.InitContext;

/**
 * Hello world!
 *
 */
public class App {

	public static void main(String[] args) {
		InitContext.init();
		DictService dictService = AppContext.getBean(DictService.class);
		try {
			for (int i = 0; i < 10; i++) {
				long b = System.currentTimeMillis();

				dictService.getAllDicts(0);

				System.out.println((System.currentTimeMillis() - b) + "ms");

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
