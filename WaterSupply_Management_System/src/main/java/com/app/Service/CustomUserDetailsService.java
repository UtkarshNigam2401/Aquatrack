package com.app.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Entity.User;
import com.app.Repository.UserRepository;

@Service // or @Component also works!
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load by user nm " + email);

		Optional<User> opuser = userRepo.findByEmail(email);
		User user = opuser.get();
		System.out.println(user.getName());
		System.out.println("lifted user dtls from db " + user);
		return new CustomUserDetails(user);
	}

}
