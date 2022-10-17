package com.vbcode.blog_App_Api.JwtSecurity;

import lombok.Data;

@Data
public class JwtAuthRequest {

	private String username;
	private String password;

}
