package com.vbcode.blog_App_Api.service.imple;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vbcode.blog_App_Api.configure.AppConstant;
import com.vbcode.blog_App_Api.entity.Role;
import com.vbcode.blog_App_Api.entity.User;
import com.vbcode.blog_App_Api.exception.ResourceNotFoundException;
import com.vbcode.blog_App_Api.payload.UserDto;
import com.vbcode.blog_App_Api.repository.RoleRepo;
import com.vbcode.blog_App_Api.repository.UserRepo;
import com.vbcode.blog_App_Api.service.UserService;


@Service
public class UserServiceImple implements UserService {
	@Autowired
	private UserRepo userRepo;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private RoleRepo roleRepo;

//	@Override
//	public UserDto createUser(UserDto userDto) {
//		User user = this.dtoToUser(userDto);
//		//user.setRoles(user.getId(),"role_Normal");
//		User saveuser = this.userRepo.save(user);
//		return this.userToDto(saveuser);
//	}

	@Override
	public UserDto updateUser(UserDto userDto, int userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		user.setName(userDto.getName());
		user.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
		// user.setPassword(userDto.getPassword());
		user.setEmail(userDto.getEmail());
		user.setAbout(userDto.getAbout());
		User saveUser = this.userRepo.save(user);
		return this.userToDto(saveUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User userFound = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		return this.userToDto(userFound);
	}

	@Override
	public List<UserDto> getAllUser() {
		List<User> allUsers = this.userRepo.findAll();
		List<UserDto> userDto = allUsers.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());
		return userDto;
	}
	
	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		
		
		
		this.userRepo.delete(user);
	}

	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
//		Alternate
//		User user=new User();
//		user.setId(userDto.getId());
//		user.setEmail(userDto.getEmail());
//		user.setAbout(userDto.getAbout());
//		user.setName(userDto.getName());
//		user.setPassword(userDto.getPassword());	
		return user;
	}
	
	public UserDto userToDto(User user) {
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
// 		Alternate
//		UserDto userDto=new UserDto();
//		userDto.setId(user.getId());
//		userDto.setEmail(user.getEmail());
//		userDto.setAbout(user.getAbout());
//		userDto.setName(user.getName());
//		userDto.setPassword(user.getPassword());
		return userDto;
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		userDto.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
		User user = this.modelMapper.map(userDto, User.class);
		Role role = this.roleRepo.findById(AppConstant.NORMAL_USER).get();
		user.getRoles().add(role);
		//user.setRoles(user.getId(),"role_Normal");
		User newuser = this.userRepo.save(user);
		return this.modelMapper.map(newuser, UserDto.class);
	}

}
