package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.Payment;
import com.app.Service.BillingService;
import com.app.Service.PaymentService;
import com.app.Service.UserService;

@RestController
@RequestMapping
@CrossOrigin("http://localhost:3000/")
public class PaymentController {
	
	@Autowired
	private PaymentService  paymentService;
	
	
	 @GetMapping("/customer/getPaymentsByUserId/{id}")
	    public ResponseEntity<?> getPaymentsByUserId(@PathVariable Long id) {
	        try {
	            List<Payment> payments = paymentService.getPaymentsByUserId(id);
	            if (payments.isEmpty()) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                        .body("No payments found for user ID: " + id);
	            }
	            return ResponseEntity.ok(payments);
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An error occurred while retrieving payments: " + ex.getMessage());
	        }
	    }
	
     @PostMapping("/customer/makePayment/{userId}")
	 public ResponseEntity<?> makePayment(@PathVariable long userId,@RequestParam double amount,@RequestParam long billId) {
	        try {
	            Payment payment = paymentService.makePayment(userId,amount,billId);
	            return ResponseEntity.status(HttpStatus.CREATED).body(payment);
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An error occurred while processing the payment: " + ex.getMessage());
	        }

}
}
