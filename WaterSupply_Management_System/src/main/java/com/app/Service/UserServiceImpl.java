package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Entity.Area;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.AreaRepository;
import com.app.Repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	
	@Autowired
	private AreaRepository  areaRepository;

	    @Autowired
	    private UserRepository userRepository;
	    @Override
	    public User createUser(User user, Long areaId) {
	       
	                user.setRole(Role.ROLE_CUSTOMER);
	            

	            // Set registration date to current date
	            user.setRegistrationDate(LocalDate.now());

	            // Fetch area by ID and assign it to the worker
	           Optional<Area> optionalarea = areaRepository.findById(areaId);
	           Area aera = optionalarea.get();
	           
	           user.setArea(aera);

	            return userRepository.save(user);
}
	    @Override
	    public User createWorker(User user, Long areaId) {
	       
	                user.setRole(Role.ROLE_WORKER);
	            

	            // Set registration date to current date
	            user.setRegistrationDate(LocalDate.now());

	            // Fetch area by ID and assign it to the worker
	           Optional<Area> optionalarea = areaRepository.findById(areaId);
	           Area aera = optionalarea.get();
	           
	           user.setArea(aera);

	            return userRepository.save(user);
}
	    

	    @Override
	    // Update an existing user
	    public User updateUser(Long id, User userDetails) {
	        try {
	            Optional<User> userOptional = userRepository.findById(id);
	            if (userOptional.isPresent()) {
	                User user = userOptional.get();
	                // Update user details
	                user.setName(userDetails.getName());
	                user.setEmail(userDetails.getEmail());
	                user.setPassword(userDetails.getPassword());
	                user.setPhoneNumber(userDetails.getPhoneNumber());
	                user.setAddress(userDetails.getAddress());
	                user.setRole(userDetails.getRole());
	                user.setArea(userDetails.getArea());
	                return userRepository.save(user);
	            } else {
	                throw new RuntimeException("User not found with id " + id);
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to update user: " + e.getMessage());
	        }
	    }
	    @Override
	    // Delete a user
	    public void deleteUser(Long id) {
	        try {
	            if (userRepository.existsById(id)) {
	                userRepository.deleteById(id);
	            } else {
	                throw new RuntimeException("User not found with id " + id);
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to delete user: " + e.getMessage());
	        }
	    }
	    @Override
	    // Get a user by ID
	    public User getUserById(Long id) {
	        try {
	        	Optional<User> optionaluser = userRepository.findById(id);
	        	
	        	
	        	
	            return userRepository.findById(id)
	                    .orElseThrow(() -> new RuntimeException("User not found with id " + id));
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to retrieve user: " + e.getMessage());
	        }
	    }
	    
	    @Override
	    public List<User> getAllWorkers() {
	        try {
	            return userRepository.findByRole(Role.ROLE_WORKER);
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to retrieve workers: " + e.getMessage());
	        }
	    }


		@Override
		public List<User> getAllUser() {
			try {
	            return userRepository.findByRole(Role.ROLE_CUSTOMER);
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to retrieve workers: " + e.getMessage());
	        }
	}
		@Override
		public ResponseEntity<?> getUsersForWorker(Long workerId) {
		    try {
		        // Find the worker by ID
		        User worker = userRepository.findById(workerId)
		                .orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + workerId));

		        // Ensure the user is actually a worker
		        if (!worker.getRole().equals(Role.ROLE_WORKER)) {
		            return ResponseEntity.status(HttpStatus.FORBIDDEN)
		                    .body("User with ID " + workerId + " is not a worker");
		        }

		        // Get customers (ROLE_CUSTOMER) in the same area as the worker
		        List<User> customers = userRepository.findByAreaAndRole(worker.getArea(), Role.ROLE_CUSTOMER);

		        if (customers.isEmpty()) {
		            return ResponseEntity.ok("No customers found in this worker's area.");
		        }

		        // Return the list of customers
		        return ResponseEntity.ok(customers);
		    } catch (ResourceNotFoundException e) {
		        // Handle specific resource not found exception
		        return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                .body("Error: " + e.getMessage());
		    } catch (Exception e) {
		        // Catch all other exceptions
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Error retrieving customers: " + e.getMessage());
		    }
		}
		@Override
		public User addAdmin(User user) {
			
			 user.setRole(Role.ROLE_ADMIN);
		        user.setRegistrationDate(LocalDate.now());

		        return userRepository.save(user);
			
		}

}


