package com.kellonge.exhibition.common.context;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class HttpContext implements Filter {
	public static final ThreadLocal<HttpSession> CurrentSession = new ThreadLocal<HttpSession>();
	public static final ThreadLocal<HttpServletRequest> CurrentRequest = new ThreadLocal<HttpServletRequest>();
	public static final ThreadLocal<HttpServletResponse> CurrentResponse = new ThreadLocal<HttpServletResponse>();

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		CurrentSession.set(((HttpServletRequest) request).getSession());
		CurrentRequest.set((HttpServletRequest) request);
		CurrentResponse.set((HttpServletResponse) response);

		chain.doFilter(request, response);
	}

	public void destroy() {
	}

	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public static void setSessionValue(String strSessionName, Object sessionValue) {
		((HttpSession) CurrentSession.get()).setAttribute(strSessionName, sessionValue);
	}

	public static void setSessionNull(String cookieName) {
		((HttpSession) CurrentSession.get()).removeAttribute(cookieName);
	}

	public static Object getSessionValue(String strSessionName) {
		Object o = null;
		try {
			o = ((HttpSession) CurrentSession.get()).getAttribute(strSessionName);
		} catch (Exception localException) {
		}
		return o;
	}

}