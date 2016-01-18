package com.kellonge.exhibition.model.entity.event;

import static javax.persistence.GenerationType.IDENTITY;

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
@Table(name = "event_attr")
public class EventAttr {

	private Integer attrID;
	private Integer dictID;
	private String content;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "attrID", unique = true, nullable = false)
	public Integer getAttrID() {
		return attrID;
	}

	public void setAttrID(Integer attrID) {
		this.attrID = attrID;
	}

	public Integer getDictID() {
		return dictID;
	}

	public void setDictID(Integer dictID) {
		this.dictID = dictID;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
