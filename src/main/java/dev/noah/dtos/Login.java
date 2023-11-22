package dev.noah.dtos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.noah.entities.Person;
import dev.noah.repos.PeopleRepo;

@Component
public class Login {

	@Autowired
	PeopleRepo pr;
	
	public Person loginCredentials(String username, String password) {
		
		Person person = pr.findByUsername(username);
		
		if(person != null) {
			if(person.getPassword().equals(password)) {
			return person;
			}
		}
		return null;
	}
}
