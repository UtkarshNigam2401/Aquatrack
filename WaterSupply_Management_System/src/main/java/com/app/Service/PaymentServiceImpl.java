package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.Bill;
import com.app.Entity.Payment;
import com.app.Entity.User;
import com.app.Repository.BillRepository;
import com.app.Repository.PaymentRepository;
import com.app.Repository.UserRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BillRepository billRepository;

	public List<Payment> getAllPaymentsForAdmin() {
		return paymentRepository.findAll();
	}

	@Override
	public List<Payment> getPaymentsByUserId(Long userId) {
		return paymentRepository.findByUserId(userId);
	}

	@Override
	public Payment makePayment(long id, double amount, long billId) {
		Optional<User> opuser = userRepository.findById(id);
		User user = opuser.get();
		
		Optional<Bill> opbill = billRepository.findById(billId);
		Bill bill = opbill.get();
	

		Payment payment = new Payment();
		payment.setUser(user);
		payment.setAmount(amount);
		payment.setStatus("DONE"); // Default status before confirmation
		payment.setPaymentDate(LocalDate.now());
		
		bill.setPaymentStatus("Paid");
		billRepository.save(bill);
		

		return paymentRepository.save(payment);
	}

}
