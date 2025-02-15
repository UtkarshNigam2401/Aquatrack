package com.app.DTO;

public class ComplaintRequestDTO {

	private Long userId;
    private String issue;
	public Long getId() {
		return userId;
	}
	public void setId(Long id) {
		this.userId = id;
	}
	
	public String getIssue() {
		return issue;
	}
	public void setIssue(String issue) {
		this.issue = issue;
	}
    
    
}
