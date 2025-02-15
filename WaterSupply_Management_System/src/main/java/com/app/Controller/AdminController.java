package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.Area;
import com.app.Entity.Complaint;
import com.app.Entity.Payment;
import com.app.Entity.User;
import com.app.Exception.UnauthorizedAccessException;
import com.app.Service.AreaService;
import com.app.Service.ComplaintService;
import com.app.Service.PaymentService;
import com.app.Service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000/")
public class AdminController {

	@Autowired
	private AreaService areaService;

	@Autowired
	private UserService userService;

	@Autowired
	private ComplaintService complaintService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody User user) {
        try {
            User newAdmin = userService.addAdmin(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

	// Create a new area
	@PostMapping("/createArea")
	public ResponseEntity<Area> createArea(@RequestBody Area area) {
		try {
			Area createdArea = areaService.createArea(area);
			return new ResponseEntity<>(createdArea, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Update an existing area
	@PutMapping("/updateArea/{id}")
	public ResponseEntity<Area> updateArea(@PathVariable("id") Long areaId, @RequestBody Area area) {
		try {
			Area updatedArea = areaService.updateArea(areaId, area);
			return new ResponseEntity<>(updatedArea, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	// Delete an area by ID
	@DeleteMapping("/deleteArea/{id}")
	public ResponseEntity<Void> deleteArea(@PathVariable("id") Long areaId) {
		try {
			areaService.deleteArea(areaId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

	// Get a specific area by ID
	@GetMapping("/getAreaById/{id}")
	public ResponseEntity<Area> getAreaById(@PathVariable("id") Long areaId) {
		try {
			Area area = areaService.getAreaById(areaId);
			return new ResponseEntity<>(area, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	// Get all workers
	@GetMapping("/getAllUser")
	public ResponseEntity<?> getAllUser() {
		try {
			List<User> users = userService.getAllUser();
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to retrieve workers: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to delete worker: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getAllComplaints")
	public ResponseEntity<?> getAllComplaints() {
		try {
			List<Complaint> complaints = complaintService.getAllComplaints();
			return ResponseEntity.ok(complaints);
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while retrieving complaints: " + ex.getMessage());
		}
	}

	@PostMapping("/createWorker")
	public ResponseEntity<User> createWorker(@RequestBody User user, @RequestParam Long areaId) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User createdUser = userService.createWorker(user, areaId);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	// Delete a worker
	@DeleteMapping("/deleteWorker/{id}")
	public ResponseEntity<?> deleteWorker(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to delete worker: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
	@Autowired
    private PaymentService paymentService;

    @GetMapping("/getAllPayments")
    public ResponseEntity<?> getAllPaymentsForAdmin() {
        try {
            List<Payment> payments = paymentService.getAllPaymentsForAdmin();
            return ResponseEntity.ok(payments);
        } catch (UnauthorizedAccessException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}
