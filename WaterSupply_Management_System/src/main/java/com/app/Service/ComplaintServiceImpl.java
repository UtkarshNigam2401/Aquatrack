package com.app.Service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.ComplaintRequestDTO;
import com.app.Entity.Area;
import com.app.Entity.Complaint;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.AreaRepository;
import com.app.Repository.ComplaintRepository;
import com.app.Repository.UserRepository;

@Service
@Transactional
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
	private ComplaintRepository complaintRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AreaRepository areaRepository;

	@Override
	public void registerComplaint(ComplaintRequestDTO complaintRequest) {
	    try {
	        // Fetch user from database
	        User user = userRepository.findById(complaintRequest.getId())
	                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + complaintRequest.getId()));

	        // Get the area from the user object
	        Area area = user.getArea();
	        if (area == null) {
	            throw new ResourceNotFoundException("User is not assigned to any area.");
	        }

	        // Create a new Complaint
	        Complaint complaint = new Complaint();
	        complaint.setUser(user);
	        complaint.setArea(area); // Auto-fetch area from user
	        complaint.setIssue(complaintRequest.getIssue());
	        complaint.setStatus("PENDING");
	        complaint.setDateLogged(LocalDate.now());

	        // Save complaint
	        complaintRepository.save(complaint);
	    } catch (Exception e) {
	        throw new RuntimeException("Failed to register complaint: " + e.getMessage());
	    }
	}

	@Override
	public List<Complaint> getComplaintsByUser(Long userId) {
		return complaintRepository.findByUserId(userId);
	}

	@Override
	public List<Complaint> getComplaintsForWorker(Long workerId) {
		User worker = userRepository.findById(workerId)
				.orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + workerId));

		Area assignedArea = worker.getArea();
		if (assignedArea == null) {
			throw new ResourceNotFoundException("Worker is not assigned to any area.");
		}

		return complaintRepository.findByArea_AreaId(assignedArea.getAreaId());
	}

	@Override
	public Complaint updateComplaintStatus(Long workerId, Long complaintId, String status) {
		// Check if the worker exists and has the ROLE_WORKER
		User worker = userRepository.findById(workerId)
				.orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + workerId));

		// Retrieve the complaint
		Complaint complaint = complaintRepository.findById(complaintId)
				.orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + complaintId));

		// Validate status
		if (!status.equalsIgnoreCase("RESOLVED")) {
			throw new IllegalArgumentException("Invalid status! Allowed values: RESOLVED");
		}

		// Update status
		complaint.setStatus(status.toUpperCase());
		return complaintRepository.save(complaint);
	}

	@Override
	public List<Complaint> getAllComplaints() {
		return complaintRepository.findAll();
	}

}
