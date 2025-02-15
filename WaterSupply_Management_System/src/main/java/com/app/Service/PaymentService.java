package com.app.Service;

import java.util.List;

import com.app.DTO.PaymentRequestDTO;
import com.app.Entity.Payment;

public interface PaymentService {

	List<Payment> getAllPaymentsForAdmin();

	List<Payment> getPaymentsByUserId(Long userId);

	//Payment makePayment(PaymentRequestDTO paymentRequest);

	//Payment makePayment(long id, double amount);

	Payment makePayment(long id, double amount, long billId);

}
