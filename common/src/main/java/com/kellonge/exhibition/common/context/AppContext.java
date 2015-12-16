package com.kellonge.exhibition.common.context;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class AppContext implements ApplicationContextAware {

	private static ApplicationContext context;

	public static <T> T getBean(Class<T> paramClass) {
		return context.getBean(paramClass);
	}

	public void setApplicationContext(ApplicationContext paramApplicationContext) throws BeansException {
		context = paramApplicationContext;

	}

}
