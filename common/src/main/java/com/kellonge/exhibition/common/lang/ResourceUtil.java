package com.kellonge.exhibition.common.lang;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.XMLOutputter;

import com.alibaba.fastjson.JSON;
import com.kellonge.exhibition.common.config.ConfigUtil;
import com.kellonge.exhibition.common.convert.ConvertUtil;

public class ResourceUtil {
	private static Map<String, String> resources = null;
	private static String LangCode = "";
	private static Logger logger = Logger.getLogger(ResourceUtil.class);

	public static String getResourceCfg(CLang lang) {
		return ConfigUtil.getRealLangPath(lang.getLanguage());
	}

	public static void clear() {
		resources = null;
		LangCode = "";
	}

	public static String getValue(String name1) {
		getCurrentResources();
		if (resources.containsKey(name1)) {
			return (String) resources.get(name1);
		}
		return "";
	}

	public static String getValue(String name1, String name2) {
		String value1 = getValue(name1);
		if ((name2 != null) && (!"".equals(name2))) {
			value1 = String.format(value1, new Object[] { getValue(name2) });
		}
		return value1;
	}

	public static Map<String, String> getAllResources() {
		Map<String, String> map = new HashMap<String, String>();
		List<CLang> cLangs = CLang.getLangs();
		for (CLang cLang : cLangs) {
			Map<String, String> res = getResources(cLang);
			for (Entry<String, String> entry : res.entrySet()) {
				String key = ConvertUtil.toString(entry.getKey());
				String value = ConvertUtil.toString(entry.getValue());
				map.put("v_" + cLang.getID() + "_" + key, value);
			}
		}
		return map;
	}

	public static Map<String, String> getCurrentResources() {
		CLang lang = CLang.getCurrentLang();
		if (!LangCode.equals(lang.getLanguage())) {
			resources = getResources(lang);
			LangCode = lang.getLanguage();
		}
		return resources;
	}

	private static Map<String, String> getResources(CLang lang) {
		String fileName = ConfigUtil.getRealLangPath(lang.getLanguage());
		Map<String, String> map = new TreeMap<String, String>();
		try {
			SAXBuilder sb = new SAXBuilder();
			Document doc = sb.build(fileName);
			Element root = doc.getRootElement();
			List<Element> datas = root.getChildren();
			if ((datas != null) && (datas.size() > 0))
				for (int i = 0; i < datas.size(); i++)
					try {
						Element data = (Element) datas.get(i);
						String name = data.getAttributeValue("name");
						if (StringUtils.isNotEmpty(name))
							map.put(name, data.getChildTextTrim("value"));
					} catch (Exception e) {
						logger.error("读取XML文件出错：" + e.getMessage());
					}
		} catch (Exception e1) {
			logger.error("读取XML文件出错：" + e1.getMessage());
		}
		return map;
	}

	public static void exportResources(Map<String, String> resources) {
		exportResources(resources, CLang.getCurrentLang());
	}

	public static void exportResources(Map<String, String> resources, CLang lang) {
		try {
			Element root = new Element("root");
			root.setAttribute("version", "1.0");
			Document doc = new Document(root);
			for (Entry<String, String> entry : resources.entrySet()) {
				String key = ConvertUtil.toString(entry.getKey());
				String value = ConvertUtil.toString(entry.getValue());
				root.addContent("\n");
				root.addContent("\t");
				Element data = getXMLElement(key, value);
				root.addContent(data);
			}
			root.addContent("\n");
			XMLOutputter out = new XMLOutputter();
			out.output(doc, new FileOutputStream(getResourceCfg(CLang.getCurrentLang())));
		} catch (Exception e) {
			logger.error("生成XML文件出错：" + e.getMessage());
		}
	}

	private static Element getXMLElement(String id, String strName) {
		Element data = new Element("data");
		data.addContent("\n");
		data.addContent("\t");
		data.addContent("\t");
		data.setAttribute("name", id);
		Element value = new Element("value");
		value.addContent(strName);
		data.addContent(value);
		data.addContent("\n");
		data.addContent("\t");
		return data;
	}

	public static void main(String[] args) {
		System.out.println(JSON.toJSONString(getResourceCfg(CLang.Cn)));
		System.out.println(JSON.toJSONString(resources));
		System.out.println(JSON.toJSONString(getCurrentResources()));
		System.out.println(JSON.toJSONString(resources));
		System.out.println(JSON.toJSONString(getAllResources()));
	}
}
