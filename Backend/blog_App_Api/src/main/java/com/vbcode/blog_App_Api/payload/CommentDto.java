package com.vbcode.blog_App_Api.payload;




import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class CommentDto {
	
	private int Id;
	private String content;
	private Date commentPostDate;
	private UserDto user;
	private Integer pid;


}
