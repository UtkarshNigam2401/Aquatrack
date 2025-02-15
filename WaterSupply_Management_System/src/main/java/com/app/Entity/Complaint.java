package com.app.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @Column(nullable = false, length = 255)
    private String issue;

    @Column(nullable = false)
    private String status; // e.g., PENDING, RESOLVED, REJECTED

    @Column(nullable = false)
    private LocalDate dateLogged;

	public Long getComplaintId() {
		return complaintId;
	}

	public void setComplaintId(Long complaintId) {
		this.complaintId = complaintId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Area getArea() {
		return area;
	}

	public void setArea(Area area) {
		this.area = area;
	}

	public String getIssue() {
		return issue;
	}

	public void setIssue(String issue) {
		this.issue = issue;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getDateLogged() {
		return dateLogged;
	}

	public void setDateLogged(LocalDate dateLogged) {
		this.dateLogged = dateLogged;
	}

	@Override
	public String toString() {
		return "Complaint [complaintId=" + complaintId + ", user=" + user + ", area=" + area + ", issue=" + issue
				+ ", status=" + status + ", dateLogged=" + dateLogged + "]";
	}

   
}

