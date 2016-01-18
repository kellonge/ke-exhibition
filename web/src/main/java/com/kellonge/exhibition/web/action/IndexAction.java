package com.kellonge.exhibition.web.action;

import com.opensymphony.xwork2.ActionSupport;

public class IndexAction extends ActionSupport {

	private String msg;

	@Override
	public String execute() throws Exception {
		msg = "index excute";
		return SUCCESS;

	}

	public String method() {
		msg = "method in action";
		return SUCCESS;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
