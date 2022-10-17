package com.vbcode.blog_App_Api.JwtSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.vbcode.blog_App_Api.entity.User;
import com.vbcode.blog_App_Api.exception.ApiException;
import com.vbcode.blog_App_Api.repository.UserRepo;


@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userRepo.findByEmail(username)
				.orElseThrow(() -> new ApiException(" Username is Not Found!......") );
		return user;
	}

}
