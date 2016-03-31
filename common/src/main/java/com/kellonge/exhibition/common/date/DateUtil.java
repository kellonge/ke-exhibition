package com.kellonge.exhibition.common.date;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import com.kellonge.exhibition.common.convert.ConvertUtil;

public class DateUtil {

	/**
	 * 获取时间的日期部分
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.clear(Calendar.MINUTE);
		calendar.clear(Calendar.SECOND);
		calendar.clear(Calendar.MILLISECOND);
		return calendar.getTime();
	}

	/**
	 * 和当前日期进行比较，大于当前日期则返回 1；小于返回 -1；等于返回0
	 * 
	 * @param date
	 * @return
	 */
	public static int dateCompareNow(Date date) {
		Date nowDate = getDate(new Date());
		Date compareDate = getDate(date);
		int result = compareDate.compareTo(nowDate);
		if (result > 0) {
			return 1;
		} else if (result < 0) {
			return -1;
		} else {
			return 0;
		}
		 
	}
	 
}
