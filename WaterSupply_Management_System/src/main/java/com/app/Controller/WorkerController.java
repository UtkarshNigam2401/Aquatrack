package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.Area;
import com.app.Entity.Bill;
import com.app.Entity.Complaint;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.AreaService;
import com.app.Service.BillingService;
import com.app.Service.ComplaintService;
import com.app.Service.UserService;

@RestController
@RequestMapping("/worker")
@CrossOrigin("http://localhost:3000/")
public class WorkerController {

	@Autowired
	private ComplaintService complaintService;

	@Autowired
	private UserService userService;

	@Autowired
	private AreaService areaService;

	@Autowired
	private BillingService billingService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/createUser")
	public ResponseEntity<User> createUser(@RequestBody User user, @RequestParam Long areaId) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User createdUser = userService.createUser(user, areaId);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	// Edit an existing worker
	@PutMapping("/updateWorker/{id}")
	public ResponseEntity<?> updateWorker(@PathVariable Long id, @RequestBody User user) {
		try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			User updatedUser = userService.updateUser(id, user);
			return new ResponseEntity<>(updatedUser, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to update worker: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Get a worker by ID
	@GetMapping("/getWorkerById/{id}")
	public ResponseEntity<?> getWorkerById(@PathVariable Long id) {
		try {
			User user = userService.getUserById(id);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to retrieve worker: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Get all workers
	@GetMapping("/getAllWorkers")
	public ResponseEntity<?> getAllWorkers() {
		try {
			List<User> users = userService.getAllWorkers();
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to retrieve workers: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getComplaintsrByWorkerId/{id}")
	public ResponseEntity<?> getComplaintsForWorker(@PathVariable Long id) {
		try {
			List<Complaint> complaints = complaintService.getComplaintsForWorker(id);
			return ResponseEntity.ok(complaints);
		} catch (ResourceNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}
	}

	@PutMapping("/updateComplaintStatus/{id}/{complaintId}")
	public ResponseEntity<?> updateComplaintStatus(@PathVariable Long id, @PathVariable Long complaintId,@RequestParam String status) {
		try {
			Complaint updatedComplaint = complaintService.updateComplaintStatus(id, complaintId, status);
			return ResponseEntity.ok(updatedComplaint);
		} catch (ResourceNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());

		} catch (IllegalArgumentException ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
		}
	}

	// Get all areas
	@GetMapping("/getAllAreas")
	public ResponseEntity<List<Area>> getAllAreas() {
		try {
			List<Area> areas = areaService.getAllAreas();
			return new ResponseEntity<>(areas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getUsersForWorker/{id}")
	public ResponseEntity<?> getUsersForWorker(@PathVariable Long id) {
		try {
			return userService.getUsersForWorker(id);
		} catch (Exception e) {
			// Handle unexpected errors
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error retrieving users for worker: " + e.getMessage());
		}
	}

	@PostMapping("/generateBill/{customerId}")
	public ResponseEntity<?> generateBill(@PathVariable Long customerId, @RequestParam double amount) {
		try {
			return ResponseEntity.ok(billingService.generateBill(customerId, amount));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error generating bill: " + e.getMessage());
		}
	}
	
	@GetMapping("/getBillsForWorker/{id}")
    public ResponseEntity<List<Bill>> getBillsForWorker(@PathVariable Long id) {
        List<Bill> bills = billingService.getBillsForWorker(id);
        return ResponseEntity.ok(bills);
    }
}
