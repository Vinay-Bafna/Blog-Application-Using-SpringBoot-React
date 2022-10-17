package com.vbcode.blog_App_Api.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vbcode.blog_App_Api.exception.ApiResponse;
import com.vbcode.blog_App_Api.payload.UserDto;
import com.vbcode.blog_App_Api.service.UserService;


@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserService userService;

	@PutMapping("/Users/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto,
			@PathVariable("userId") Integer UId) {
		UserDto updateUser = this.userService.updateUser(userDto, UId);
		return new ResponseEntity<>(updateUser, HttpStatus.OK);
	}

	@DeleteMapping("/Users/{userId}")
	@PreAuthorize("hasAuthority('ADMIN_USER')")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userId") Integer uid) {
		this.userService.deleteUser(uid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted Succesfully", true), HttpStatus.OK);
	}

	@GetMapping("/Users")
	@PreAuthorize("hasAuthority('ADMIN_USER')")
	public ResponseEntity<List<UserDto>> getAllUser() {
		return ResponseEntity.ok(this.userService.getAllUser());
	}

	@GetMapping("/Users/{userId}")
	@PreAuthorize("hasAuthority('ADMIN_USER')")
	public ResponseEntity<UserDto> getUser(@PathVariable("userId") Integer Uid) {
		return ResponseEntity.ok(this.userService.getUserById(Uid));
	}

}
