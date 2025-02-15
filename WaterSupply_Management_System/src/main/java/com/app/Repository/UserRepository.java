package com.app.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Area;
import com.app.Entity.Role;
import com.app.Entity.User;
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByRole(Role roleWorker);

	List<User> findByAreaAndRole(Area area, Role roleCustomer);

	//List<User> findByArea(Long areaId);

	List<User> findByArea(Area area);

	List<User> findByArea_AreaId(Long areaId);

	//User findByEmail(String email);
	
	Optional<User> findByEmail(String email);

}
