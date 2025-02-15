package com.app.initializer;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.Entity.Area;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Repository.AreaRepository;
import com.app.Repository.UserRepository;


@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AreaRepository areaRepository;

    @Override
    public void run(String... args) {
        // Save the area first
        Area area = new Area();
        area.setAreaId(1L);
        area.setAreaName("Bangalore");
        area.setDailyWaterQuota(50000);
        areaRepository.save(area); // Save the area to the database

        if (adminRepository.findByEmail("admin@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhoneNumber("9876543210");
            admin.setAddress("India");
            admin.setRole(Role.ROLE_ADMIN);
            admin.setRegistrationDate(LocalDate.now());
            admin.setArea(area); // Set the existing area

            adminRepository.save(admin);
            System.out.println("Admin user seeded successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }



}
