package com.vbcode.blog_App_Api.exception;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Getter
@Setter 
public class EmailResourceNotFoundException extends RuntimeException {
	String resourceName;
	String fieldName;
	String Email;
	public EmailResourceNotFoundException(String resourceName, String fieldName, String email) {
		super(String.format("%s Not Found with %s : %s ",resourceName,fieldName,email));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.Email = email;
	}
}
