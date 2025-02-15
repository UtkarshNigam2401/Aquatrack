package com.app.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.Bill;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.BillRepository;
import com.app.Repository.UserRepository;

@Service
public class BillServiceImpl implements BillingService {

	@Autowired
	private UserRepository  userRepository;
	
	@Autowired
	private BillRepository  billRepository;
	
	
	public Bill generateBill(Long userId, double amount) {
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

	    if (!user.getRole().equals(Role.ROLE_CUSTOMER)) {
	        throw new IllegalArgumentException("Only customers can receive bills.");
	    }

	    Bill bill = new Bill();
	    bill.setUser(user);
	    bill.setAmount(amount);
	    bill.setPaymentStatus("PENDING");
	    bill.setBillingDate(LocalDate.now());
	    LocalDate billingDate = LocalDate.now();
	    bill.setBillingDate(billingDate);
	    bill.setDueDate(billingDate.plusDays(5));
	    
	    return billRepository.save(bill);
	}
	
	public List<Bill> getBillsForWorker(Long workerId) {
        // Get the worker by ID and ensure the worker exists
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new ResourceNotFoundException("Worker not found with ID: " + workerId));

        // Ensure the user is of role "ROLE_WORKER"
        if (!worker.getRole().equals(Role.ROLE_WORKER)) {
            throw new IllegalArgumentException("Only workers can view bills.");
        }

        // Get all customers in the worker's area
        List<User> customersInArea = userRepository.findByArea_AreaId(worker.getArea().getAreaId());

        // Check if there are customers in the area
        if (customersInArea.isEmpty()) {
            throw new ResourceNotFoundException("No customers found in this area.");
        }

        // Fetch the bills for those customers
        List<Bill> bills = billRepository.findByUserIn(customersInArea);

        // Return the list of bills
        return bills;
    }
	
	public List<Bill> getBillsForCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (!user.getRole().equals(Role.ROLE_CUSTOMER)) {
            throw new IllegalArgumentException("Only customers can view their bills.");
        }

        return billRepository.findByUser(user);
    }

}
