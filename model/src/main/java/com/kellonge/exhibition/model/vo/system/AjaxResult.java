package com.kellonge.exhibition.model.vo.system;

import org.apache.commons.lang3.StringUtils;

public class AjaxResult {

	private Status status;
	private String msg;
	private Object data;
	private int cost;

	public enum Status {
		SUCCESS, Fail, NoLogin;
	}

	public void setSuccess(Object data, String msg) {
		this.status = Status.SUCCESS;
		this.data = data;
		this.msg = StringUtils.isNotEmpty(msg) ? msg : "操作成功";
	}

	public void setFail(String msg) {
		this.status = Status.Fail;
		this.msg = StringUtils.isNotEmpty(msg) ? msg : "操作失败";
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
