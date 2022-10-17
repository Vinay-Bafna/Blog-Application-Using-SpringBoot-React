package com.vbcode.blog_App_Api.payload;

import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto {
	@Id
	private Integer id;
	private String name;
}
