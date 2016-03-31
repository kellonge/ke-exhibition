package com.kellonge.exhibition.admin.action.base;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class BaseAction  extends ActionSupport{
	
	public HttpServletRequest request = ServletActionContext.getRequest();// request
	public HttpServletResponse response = ServletActionContext.getResponse();// response
	public HttpSession session = ServletActionContext.getRequest().getSession();// session
	public Map<String, Object> pageData =new HashMap<String, Object>();//页面数据

 
}
