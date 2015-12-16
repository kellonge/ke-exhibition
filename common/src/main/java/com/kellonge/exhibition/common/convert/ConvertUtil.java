package com.kellonge.exhibition.common.convert;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ConvertUtil {

	public static Boolean isInteger(Object str) {
		try {
			Integer.parseInt(toString(str));
		} catch (Exception err) {
			return false;
		}
		return true;
	}

	public static Date toDateTime(Object objDate) {
		Date date = new Date();
		try {
			String strDate = toString(objDate);
			if (strDate.indexOf(":") > 0) {
				String strFormat = "yyyy-MM-dd HH:mm:ss";
				if (strDate.indexOf("/") > 0)
					strFormat = "yyyy/MM/dd HH:mm:ss";
				SimpleDateFormat formatDateTime = new SimpleDateFormat(strFormat);
				date = formatDateTime.parse(strDate);
			} else {
				String strFormat = "yyyy-MM-dd";
				if (strDate.indexOf("/") > 0)
					strFormat = "yyyy/MM/dd";
				SimpleDateFormat formatDate = new SimpleDateFormat(strFormat);
				date = formatDate.parse(strDate);
			}
		} catch (Exception exception) {
		}
		return date;
	}

	public static String toString(Object obj) {
		if (obj == null)
			return "";
		return obj.toString().trim();

	}

	public static Integer toInt(Object obj) {
		if (isInteger(obj))
			return Integer.parseInt(toString(obj));
		else
			return -1;
	}

	public static Integer toInt(Object obj, int nInitValue) {
		int nResult = toInt(obj);
		if (nResult == -1)
			nResult = nInitValue;
		return nResult;
	}

	public static Long toLong(Object obj) {
		long num = 0L;
		try {
			num = Long.parseLong(toString(obj));
		} catch (Exception exception) {
		}
		return num;
	}

	public static Long toShort(Object obj) {
		short num = 0;
		try {
			num = Short.parseShort(toString(obj));
		} catch (Exception exception) {
		}
		return (long) num;
	}

	public static Float toFloat(Object obj) {
		float num = 0.0F;
		try {
			num = Float.parseFloat(toString(obj));
		} catch (Exception exception) {
		}
		return num;
	}

	public static Double toDouble(Object obj) {
		double num = 0.0D;
		try {
			num = Double.parseDouble(toString(obj));
		} catch (Exception exception) {
		}
		return num;
	}

	public static Boolean toBool(Object obj) {
		return toString(obj).equalsIgnoreCase("true");
	}

	public static List<String> strToList(String str) {
		List<String> list = new ArrayList<String>();
		if (str != null) {
			String[] stringArr = str.split(",");
			for (String element : stringArr) {
				list.add(element);
			}
		}
		return list;
	}

}
