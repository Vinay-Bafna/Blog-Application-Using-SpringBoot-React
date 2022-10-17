package com.vbcode.blog_App_Api.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Role {
	@Id
	private Integer id;
	private String name;
	
}
