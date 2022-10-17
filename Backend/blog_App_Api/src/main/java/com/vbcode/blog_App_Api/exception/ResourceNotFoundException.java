package com.vbcode.blog_App_Api.exception;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Getter
@Setter

public class ResourceNotFoundException  extends RuntimeException{
	String resourceName;
	String fieldName;
	long filedValue;
	public ResourceNotFoundException(String resourceName, String fieldName, long filedValue) {
		super(String.format("%s Not Found with %s : %s ",resourceName,fieldName,filedValue));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.filedValue = filedValue;
	}
	

}
