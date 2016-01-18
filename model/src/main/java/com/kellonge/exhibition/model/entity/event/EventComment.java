package com.kellonge.exhibition.model.entity.event;

import static javax.persistence.GenerationType.IDENTITY;

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
@Table(name = "event_comment")
public class EventComment {

	private Integer commentID;
	private String content;
	private Integer targetUserID;
	private Integer eventID;
	private Integer createUserID;
	private Integer isDel;
	private Date createTime;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "commentID", unique = true, nullable = false)
	public Integer getCommentID() {
		return commentID;
	}

	public void setCommentID(Integer commentID) {
		this.commentID = commentID;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getTargetUserID() {
		return targetUserID;
	}

	public void setTargetUserID(Integer targetUserID) {
		this.targetUserID = targetUserID;
	}

	public Integer getEventID() {
		return eventID;
	}

	public void setEventID(Integer eventID) {
		this.eventID = eventID;
	}

	public Integer getCreateUserID() {
		return createUserID;
	}

	public void setCreateUserID(Integer createUserID) {
		this.createUserID = createUserID;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
