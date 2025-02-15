package com.app.Service;

import java.util.List;

import com.app.Entity.Bill;

public interface BillingService {

	Object generateBill(Long userId, double amount);

	List<Bill> getBillsForWorker(Long workerId);

	List<Bill> getBillsForCustomer(Long id);

	

}
