package com.app.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.ComplaintRequestDTO;
import com.app.Entity.Complaint;
import com.app.Service.ComplaintService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000/")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Endpoint for users to file a complaint
    @PostMapping("/registerComplaint")
    public ResponseEntity<?> registerComplaint(@Valid @RequestBody ComplaintRequestDTO complaintRequest) {
        complaintService.registerComplaint(complaintRequest);
        return ResponseEntity.ok("Complaint registered successfully.");
    }

    // Fetch all complaints by a specific user
    @GetMapping("/getUserComplaints/{id}")
    public ResponseEntity<List<Complaint>> getUserComplaints(@PathVariable Long id) {
        List<Complaint> complaint = complaintService.getComplaintsByUser(id);
        return ResponseEntity.ok(complaint);
    }
    
   

}
