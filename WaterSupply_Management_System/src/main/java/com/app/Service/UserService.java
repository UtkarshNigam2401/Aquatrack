package com.app.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.Entity.User;

public interface UserService {

	//User createUser(User user);

	User updateUser(Long id, User user);

	void deleteUser(Long id);

	User getUserById(Long id);



	List<User> getAllWorkers();

	User createUser(User user, Long areaId);

	List<User> getAllUser();

	User createWorker(User user, Long areaId);

	ResponseEntity<?> getUsersForWorker(Long workerId);

	User addAdmin(User user);

}
