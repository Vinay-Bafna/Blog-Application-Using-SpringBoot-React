package com.vbcode.blog_App_Api.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class CategoryDto {

	private int categoryId;
	
	@NotEmpty
	@Size(min=2,message="It Must be Greater than 2 character.")
	private String Title;
	
	@NotEmpty
	private String description;
	
	
}
