package com.kellong.exhibition.console;

import com.kellonge.exhibition.common.context.InitContext;

/**
 * Hello world!
 *
 */
public class App {

	public static void main(String[] args) {
		InitContext.init(); 
		try {
			long b = System.currentTimeMillis();
			  
			System.out.println((System.currentTimeMillis() - b) + "ms");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
