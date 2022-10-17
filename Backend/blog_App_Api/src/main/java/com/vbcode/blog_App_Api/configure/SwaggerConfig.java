package com.vbcode.blog_App_Api.configure;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import springfox.documentation.spi.service.contexts.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig {

	public static final String AUTHORIZATION_HEADER = "Authorization";

	private ApiKey apiKey() {
		return new ApiKey(AUTHORIZATION_HEADER, "JWT", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(new SecurityReference(AUTHORIZATION_HEADER, authorizationScopes));
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.OAS_30).apiInfo(apiInfo())
				.securityContexts(Arrays.asList(securityContext())).securitySchemes(Arrays.asList(apiKey())).select()
				.apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).build();
	}

	private ApiInfo apiInfo() {
		ApiInfo apiInfo = new ApiInfo("Blogging Application : Backend Project Code",
				"This Project Developed by Vinay Bafna ", "1.0", "Terms of service",
				new Contact("Vinay", "", "vbcode@gmail.com"), "License of API", "API license URL",
				Collections.emptyList());
		return apiInfo;
	}
//	private ApiKey apiKeys() {
//	return new ApiKey("JWT", AUTHORIZATION_HEADER, "header");
//}
//
//private List<SecurityContext> securityContexts(){
//	return Arrays.asList(SecurityContext.builder().securityReferences(sf()).build());
//}
//
//private List<SecurityReference> sf(){
//	AuthorizationScope scopes=new AuthorizationScope("global","accessEverything");
//	return Arrays.asList(new SecurityReference("scope", new AuthorizationScope[] {scopes}));
//}
}
