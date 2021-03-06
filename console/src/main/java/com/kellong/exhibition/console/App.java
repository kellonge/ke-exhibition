package com.kellong.exhibition.console;

import com.alibaba.fastjson.JSONObject;
import com.kellonge.exhibition.business.service.event.EventService;
import com.kellonge.exhibition.common.context.AppContext;
import com.kellonge.exhibition.common.context.InitContext;

/**
 * Hello world!
 *
 */
public class App {

	public static void main(String[] args) throws Exception {

		InitContext.init();
		try {
			long b = System.currentTimeMillis();
			EventService eventService = AppContext.getBean(EventService.class);

			System.out.println(JSONObject.toJSONString(eventService.getAdminEventList(0, 10, null, null, null, null, null)));
			System.out.println((System.currentTimeMillis() - b) + "ms");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
