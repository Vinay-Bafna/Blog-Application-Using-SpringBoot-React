package com.vbcode.blog_App_Api.payload;

import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private int id;
	
	@NotEmpty(message="May Not Be Null! Enter Your Full Name.")
	@Size(min=5,message="Your Full Name Must Be Greater Than 5 Chracters!")
	private String name;
	
	@NotEmpty(message="May Not Be Null! Enter Valid Email.")
	@Email(message="Enter Valid Email With '@'.")
	private String email;
	
	@NotEmpty(message="Required Password Must be Greater than 5.")
	@Size(min=5,max=15,message="Password Must be Greater than 5 with Special Symbol ('@','$')")
	private String password;

	@JsonIgnore
	public String getPassword() {
		return password;
	}
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	private String about;
	
	private Set<RoleDto> roles = new HashSet<>();
	
}
