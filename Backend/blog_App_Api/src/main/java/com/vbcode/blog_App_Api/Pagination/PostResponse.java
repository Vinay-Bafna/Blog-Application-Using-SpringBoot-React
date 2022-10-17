package com.vbcode.blog_App_Api.Pagination;

import java.util.List;

import com.vbcode.blog_App_Api.payload.PostDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostResponse {
	
	private List<PostDto> content;
	private Integer pageNumber;
	private Integer pageSize;
	private long totoalElements;
	private Integer totalPages; 
	private boolean lastPage;

}
