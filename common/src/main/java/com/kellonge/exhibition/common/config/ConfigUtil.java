package com.kellonge.exhibition.common.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigUtil {

	private static Logger logger = Logger.getLogger(ConfigUtil.class);
	private static Properties properties;

	private static boolean devMode;
	private static String imgHost;
	private static String host;

	static {
		load();
	}

	public static void load() {
		try {
			InputStream in = new FileInputStream(getClassPath() + "config.properties");
			properties = new Properties();
			properties.load(in);
			imgHost = properties.getProperty("biz.img.host");
			host = properties.getProperty("sys.host");
			devMode = properties.getProperty("sys.devmode").equals("debug");
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

	public static boolean getDevMode() {
		return devMode;
	}

	public static String getImgHost() {
		return imgHost;
	}

	public static String getHost() {
		return host;
	}

	public static void main(String[] args) {
		System.out.println(getClassPath());
	}

}
