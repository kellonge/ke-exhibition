package com.kellonge.exhibition.model.entity.doc;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Date;

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
@Table(name = "information")
public class Information implements Serializable {

	private Integer id;
	private String title;
	private String digest;
	private String content;
	private String comment;
	private String imageIDs;
	private String attachmentIDs;
	private String pubMemberID;
	private Date pubDate;
	private String tag;
	private Integer statusID;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getImageIDs() {
		return imageIDs;
	}

	public void setImageIDs(String imageIDs) {
		this.imageIDs = imageIDs;
	}

	public String getAttachmentIDs() {
		return attachmentIDs;
	}

	public void setAttachmentIDs(String attachmentIDs) {
		this.attachmentIDs = attachmentIDs;
	}

	public String getPubMemberID() {
		return pubMemberID;
	}

	public void setPubMemberID(String pubMemberID) {
		this.pubMemberID = pubMemberID;
	}

	public Date getPubDate() {
		return pubDate;
	}

	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Integer getStatusID() {
		return statusID;
	}

	public void setStatusID(Integer statusID) {
		this.statusID = statusID;
	}

}
