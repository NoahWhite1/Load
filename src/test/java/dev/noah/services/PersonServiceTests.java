package dev.noah.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import dev.noah.entities.Person;

@SpringBootTest(classes = dev.noah.app.LoadApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PersonServiceTests {

	@Autowired
	PersonServiceImpl ps;
	
	@Test
	@Order(1)
	void createPerson() {
		Person person = new Person(0,"username","password",null,"testingfirstname","testinglastname",0,"email","1234567890");
		ps.createPerson(person);
		Assertions.assertEquals(1, person.getpId());
		Assertions.assertEquals("username", person.getUsername());
	}
	
	@Test
	@Order(2)
	void getPerson() {
		Person person = ps.getPersonById(1);
		Assertions.assertEquals(1, person.getpId());
	}
	
	@Test
	@Order(3)
	void updatePerson() {
		Person person = ps.getPersonById(1);
		person.setUsername("user");
		ps.updatePerson(person);
		Assertions.assertEquals("user", ps.getPersonById(1).getUsername());
	}
	
	@Test
	@Order(4)
	void findPersonByUsername() {
		Person person = ps.findPersonByUsername("user");
		Assertions.assertEquals("user", person.getUsername());
	}
	
	@Test
	@Order(5)
	void deletePerson() {
		Person person = ps.findPersonByUsername("user");
		ps.deletePerson(person);
		Assertions.assertEquals(0, ps.getAmountOfPeople());
	}
	
	

}
