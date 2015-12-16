package com.kellonge.exhibition.model.vo.system;

public class FuncResult {

	private Object data; // 数据
	private String msg; // 说明
	private Boolean flag; // 是否成功

	public static FuncResult setError(String msg) {
		FuncResult paramVo = new FuncResult();
		paramVo.setFlag(false);
		paramVo.setMsg(msg);
		return paramVo;
	}

	public static FuncResult setSuccess(String msg) {
		FuncResult paramVo = new FuncResult();
		paramVo.setFlag(true);
		paramVo.setMsg(msg);
		return paramVo;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Boolean getFlag() {
		return flag;
	}

	public void setFlag(Boolean flag) {
		this.flag = flag;
	}
}
