package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Bill;
import com.app.Entity.User;

public interface BillRepository extends JpaRepository<Bill, Long> {

	List<Bill> findByUser(User user);

	List<Bill> findByUserIn(List<User> customerinArea);

}
