package com.vbcode.blog_App_Api.JwtSecurity;

import com.vbcode.blog_App_Api.payload.UserDto;

import lombok.Data;

@Data
public class JwtAuthResponse {

	private String token;
	private UserDto user;

}
