package dev.noah.dtos;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import dev.noah.entities.FreightLoad;
import dev.noah.entities.Person;
import dev.noah.services.PersonServiceImpl;

@SpringBootTest(classes = dev.noah.app.LoadApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class LoginDtoTests {
	
	@Autowired
	PersonServiceImpl ps;

	@Autowired
	Login log;
	
	@Test
	void loginCredentinals() {
		List<FreightLoad> freight = new ArrayList<FreightLoad>();
		Person person = new Person(0,"username","password",freight,"Jimmy","Johnson",0,"email","1234567890");
		ps.createPerson(person);
		Person person1 = log.loginCredentials(person.getUsername(), person.getPassword());
		Assertions.assertEquals("username",person1.getUsername());
	}

}
