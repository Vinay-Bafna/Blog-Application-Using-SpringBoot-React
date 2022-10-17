package com.vbcode.blog_App_Api.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer categoryId;
	@Column(name="title", nullable=false)
	private String Title;
	@Column(name="description")
	private String Description;
	
	
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private List<Post> ports=new ArrayList<>();
}


