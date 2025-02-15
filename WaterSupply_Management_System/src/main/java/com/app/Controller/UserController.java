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
import com.app.Entity.User;
import com.app.Service.AreaService;
import com.app.Service.BillingService;
import com.app.Service.UserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

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

	// Edit an existing user
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
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

	// Get a user by ID
	@GetMapping("/getUserById/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Long id) {
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

	@GetMapping("/getBillsForCustomer/{id}")
	public ResponseEntity<List<Bill>> getBillsForCustomer(@PathVariable Long id) {
		List<Bill> bills = billingService.getBillsForCustomer(id);
		return ResponseEntity.ok(bills);
	}

}
