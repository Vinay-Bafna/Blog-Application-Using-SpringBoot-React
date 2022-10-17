package com.vbcode.blog_App_Api.service;

import java.util.List;

import com.vbcode.blog_App_Api.payload.UserDto;


public interface UserService {
	
	//UserDto createUser(UserDto userdto);
	UserDto updateUser(UserDto userDto,int userId);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUser();
	void deleteUser(Integer userId);
	UserDto registerNewUser(UserDto userDto);
}
