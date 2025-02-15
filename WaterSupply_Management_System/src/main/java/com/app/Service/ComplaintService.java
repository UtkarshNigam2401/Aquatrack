package com.app.Service;

import java.util.List;

import javax.validation.Valid;

import com.app.DTO.ComplaintRequestDTO;
import com.app.Entity.Complaint;

public interface ComplaintService {

	void registerComplaint(@Valid ComplaintRequestDTO complaintRequest);

	List<Complaint> getComplaintsByUser(Long userId);

	List<Complaint> getComplaintsForWorker(Long workerId);

	Complaint updateComplaintStatus(Long workerId, Long complaintId, String status);

	List<Complaint> getAllComplaints();

}
