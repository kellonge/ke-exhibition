package com.kellonge.exhibition.web.action.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Result;

import com.kellonge.exhibition.common.config.ConfigUtil;
import com.opensymphony.xwork2.ActionSupport;

public class ImgAction extends ActionSupport {

	private InputStream imgStream;
	private String path;

	@Action(results = { @Result(name = SUCCESS, type = "stream", params = { "contentType", "image/png", "inputName", "imgStream", "bufferSize", "4096" }), })
	public String execute() {
		String allPath = ConfigUtil.getProperties("sys.img.path") + path;
		if (!Files.exists(Paths.get(allPath))) {
			return "not_find";
		}
		try {
			imgStream = new FileInputStream(allPath);
		} catch (FileNotFoundException e) {
			return "not_find";
		}
		return SUCCESS;
	}

	public InputStream getImgStream() {
		return imgStream;
	}

	public void setImgStream(InputStream imgStream) {
		this.imgStream = imgStream;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

}
