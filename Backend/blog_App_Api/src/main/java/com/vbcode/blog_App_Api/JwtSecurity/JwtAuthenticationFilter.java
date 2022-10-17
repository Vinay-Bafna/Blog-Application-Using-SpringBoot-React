package com.vbcode.blog_App_Api.JwtSecurity;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String username = null;
		String token = null;
		String requestToken = request.getHeader("Authorization");
		System.out.println(requestToken);

		if (requestToken != null && requestToken.startsWith("Bearer")) {

			token = requestToken.substring(7);
			try {
				username = this.jwtTokenHelper.getUsernameFromToken(token);
			} 
			catch (IllegalArgumentException e) {
				System.out.println("unable to get JWt Token");
			}
			catch(ExpiredJwtException e) {
				System.out.println("Token Expired");
			}
			catch(MalformedJwtException e) {
				System.out.println("Invalid JWT!");
			}
		} else {
			System.out.println("Jwt token does not begin with Bearer.");
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
			if (this.jwtTokenHelper.validateToken(token, userDetails)) {

				UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(userDetails, null,
						userDetails.getAuthorities());
				upat.setDetails(new WebAuthenticationDetails(request));
				SecurityContextHolder.getContext().setAuthentication(upat);

			} else {
				System.out.println("Invalid JWT Token.!");
			}

		} else {
			System.out.println("Username is Null or context is not null !");
		}

		filterChain.doFilter(request, response);
	}

}