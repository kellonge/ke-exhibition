package com.kellonge.exhibition.common.lang;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.kellonge.exhibition.common.config.ConfigUtil;
import com.kellonge.exhibition.common.context.HttpContext;
import com.kellonge.exhibition.common.convert.ConvertUtil;

public class CLang {
	public static final String SessionKey_Lang = "LanguageVersion";
	private static final long serialLangUID = 3640916850392743522L;
	private Integer ID;
	private String name;	
	private String language;
	private static List<CLang> langs = null;

	public static final CLang Cn = new CLang(1, "中文", "cn");
	public static final CLang En = new CLang(2, "English", "en");
	public static final CLang De = new CLang(3, "Deutsch", "de");
	public static final CLang Fr = new CLang(4, "Français", "fr");
	public static final CLang Ja = new CLang(5, "日本語", "ja");

	public static final List<CLang> All = new ArrayList<CLang>() {
		{
			add(Cn);
			add(En);
			add(De);
			add(Fr);
			add(Ja);
		}
	};

	public static int getCurrentLangID() {
		CLang defaultLang = getDefaultLang();
		Object v = HttpContext.getSessionValue("LanguageVersion");
		if (v != null) {
			return ConvertUtil.toInt(v, defaultLang.getID().intValue());
		}
		return defaultLang.getID().intValue();
	}

	public static CLang getCurrentLang() {
		CLang defaultLang = getDefaultLang();
		Object v = HttpContext.getSessionValue("LanguageVersion");
		if (v != null) {
			return getLangByID(ConvertUtil.toInt(v));
		}
		return defaultLang;
	}

	public static List<CLang> getLangs() {
		if (langs == null) {
			langs = new ArrayList<CLang>();
			File dir = new File(ConfigUtil.getRealResourcePath());
			File[] files = dir.listFiles();
			for (File file : files) {
				if ((file.getName().toLowerCase().startsWith("resource")) && (file.getName().toLowerCase().endsWith(".xml"))) {
					String strLanguage = file.getName().toLowerCase().substring(file.getName().toLowerCase().indexOf(".") + 1, file.getName().toLowerCase().indexOf(".") + 3);
					CLang lang = getLangByLanguage(strLanguage);
					if (lang != null) {
						langs.add(lang);
					}
				}
			}
		}
		return langs;
	}

	public static CLang getLangByLanguage(String strLanguage) {
		for (CLang lang : All) {
			if (lang.getLanguage().equals(strLanguage)) {
				return lang;
			}
		}
		return null;
	}

	public static CLang getLangByID(Integer nLangID) {
		for (CLang lang : All) {
			if (lang.getID().equals(nLangID)) {
				return lang;
			}
		}
		return Cn;
	}

	public static CLang getDefaultLang() {
		HttpServletRequest request = (HttpServletRequest) HttpContext.CurrentRequest.get();
		String strLanguage = (request == null ? "cn" : request.getLocale().getLanguage());
		if ("zh".equals(strLanguage)) {
			return Cn;
		}
		if ("en".equals(strLanguage)) {
			return En;
		}
		if ("fr".equals(strLanguage)) {
			return Fr;
		}
		if ("de".equals(strLanguage)) {
			return De;
		}
		if ("ja".equals(strLanguage)) {
			return Ja;
		}
		return Cn;
	}

	public CLang(Integer ID, String name, String language) {
		setID(ID);
		setName(name);
		setLanguage(language);
	}

	public Integer getID() {
		return this.ID;
	}

	public void setID(Integer ID) {
		this.ID = ID;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLanguage() {
		return this.language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public static void main(String[] args) {
		System.out.println(JSON.toJSONString(getCurrentLang()));
		System.out.println(JSON.toJSONString(getCurrentLangID()));
		System.out.println(JSON.toJSONString(getLangs()));
		System.out.println(JSON.toJSONString(getLangByID(1)));
		System.out.println(JSON.toJSONString(getLangByLanguage("en")));

	}
}
