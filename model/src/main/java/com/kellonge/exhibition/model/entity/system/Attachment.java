package com.kellonge.exhibition.model.entity.system;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "attachment")
public class Attachment implements Serializable {

	private Integer id;
	private String fileName;
	private String fileNameInDisk;
	private String description;
	private byte[] fileData;
	private String contentType;
	private String fileLength;
	private String needWaterMark;
	private Integer memberID;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileNameInDisk() {
		return fileNameInDisk;
	}

	public void setFileNameInDisk(String fileNameInDisk) {
		this.fileNameInDisk = fileNameInDisk;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getFileData() {
		return fileData;
	}

	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFileLength() {
		return fileLength;
	}

	public void setFileLength(String fileLength) {
		this.fileLength = fileLength;
	}

	public String getNeedWaterMark() {
		return needWaterMark;
	}

	public void setNeedWaterMark(String needWaterMark) {
		this.needWaterMark = needWaterMark;
	}

	public Integer getMemberID() {
		return memberID;
	}

	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}

}
