package com.vbcode.blog_App_Api.controller;

import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vbcode.blog_App_Api.JwtSecurity.JwtAuthRequest;
import com.vbcode.blog_App_Api.JwtSecurity.JwtAuthResponse;
import com.vbcode.blog_App_Api.JwtSecurity.JwtTokenHelper;
import com.vbcode.blog_App_Api.entity.User;
import com.vbcode.blog_App_Api.exception.ApiException;
import com.vbcode.blog_App_Api.payload.UserDto;
import com.vbcode.blog_App_Api.service.UserService;


@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {

		// this.authenticate(request.getUsername(), request.getPassword());
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				request.getUsername(), request.getPassword());
		try {
			this.authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			throw new ApiException("Invalid Username OR Password!!!");
		}
		
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtTokenHelper.generateToken(userDetails);
		JwtAuthResponse response = new JwtAuthResponse();
		response.setToken(token);
		response.setUser(this.modelMapper.map((User)userDetails,UserDto.class));
		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
	}
//	private void authenticate(String username, String password) {
//		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//				username,password);
//		try {
//			this.authenticationManager.authenticate(authenticationToken);
//		} catch (BadCredentialsException e) {
//			System.out.println("Invalid Credentials!");
//			// throw new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted
//			// Succesfully",true),HttpStatus.OK);
//			// throw new ResponseEntity<ApiResponse>()
//			// throw new Exception("Invalid Username and Password!!!");
//		}
//
//	}
	
	@PostMapping("/register")	
	public ResponseEntity<UserDto> registerNewUser(@Valid @RequestBody UserDto userDto){
		UserDto registerNewUser = this.userService.registerNewUser(userDto);
		return new ResponseEntity<UserDto>(registerNewUser,HttpStatus.CREATED);
	}

}
