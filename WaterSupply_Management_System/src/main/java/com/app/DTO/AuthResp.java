package com.app.DTO;


import org.springframework.security.core.Authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


public class AuthResp {
	private String message;
	private String jwt;
	private Authentication authenticatedDetails;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public Authentication getAuthenticatedDetails() {
		return authenticatedDetails;
	}
	public void setAuthenticatedDetails(Authentication authenticatedDetails) {
		this.authenticatedDetails = authenticatedDetails;
	}
	@Override
	public String toString() {
		return "AuthResp [message=" + message + ", jwt=" + jwt + ", authenticatedDetails=" + authenticatedDetails + "]";
	}
	public AuthResp(String message, String jwt, Authentication authenticatedDetails) {
		super();
		this.message = message;
		this.jwt = jwt;
		this.authenticatedDetails = authenticatedDetails;
	}
	public AuthResp() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
