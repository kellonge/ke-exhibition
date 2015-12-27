package com.kellonge.exhibition.model.entity.function;

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
@Table(name = "groupmenu")
public class GroupMenu implements Serializable {

	private Integer id;
	private String menuIDs;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMenuIDs() {
		return menuIDs;
	}

	public void setMenuIDs(String menuIDs) {
		this.menuIDs = menuIDs;
	}

}
