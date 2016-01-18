package com.kellonge.exhibition.common.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigUtil {

	private static Logger logger = Logger.getLogger(ConfigUtil.class);
	private static Properties properties;

	static {
		load();
	}

	public static void load() {
		try {
			InputStream in = new FileInputStream(getClassPath() + "config.properties");
			properties = new Properties();
			properties.load(in);
		} catch (IOException e) {
			logger.warn(e);
		}
	}

	public static String getClassPath() {
		return ConfigUtil.class.getResource("/").getPath().substring(1);
	}

	public static String getProperties(String key) {
		return properties.getProperty(key);
	}

	public static void main(String[] args) {
		System.out.println(getClassPath());
	}

}
