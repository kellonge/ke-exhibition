package com.kellonge.exhibition.common.context;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class InitContext {

	public static void init() {
		ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
	}
}
