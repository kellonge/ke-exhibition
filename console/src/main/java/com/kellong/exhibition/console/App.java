package com.kellong.exhibition.console;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.kellonge.exhibition.business.service.system.DictService;
import com.kellonge.exhibition.common.context.AppContext;
import com.kellonge.exhibition.common.context.InitContext;
import com.kellonge.exhibition.model.entity.Dict;

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
			Dict dict = new Dict();
			dict.setCreateTime(new Date());
			dict.setName("ssw");

			dictService.save(dict);

			System.out.println((System.currentTimeMillis() - b) + "ms");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
