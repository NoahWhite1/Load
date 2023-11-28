package dev.noah.repos;

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
class PersonTests {

	@Autowired
	PeopleRepo pr;
	
	@Test
	@Order(1)
	void createPerson() {
		Person person = new Person(0,"username","password",null,"firstname","lastname",0,"email","1234567890");
		pr.save(person);
		Assertions.assertEquals(1, person.getpId());
	}

	@Test
	@Order(2)
	void getPerson() {
		Person person = pr.findById(1).get();
		Assertions.assertEquals(1, person.getpId());
	}
	
	@Test
	@Order(3)
	void updatePerson() {
		Person person = pr.findById(1).get();
		person.setUsername("user");
		pr.save(person);
		
	}
	
	@Test
	@Order(4)
	void findPersonByUsername() {
		Person person = pr.findByUsername("user");
		Assertions.assertEquals("user", person.getUsername());
	}
	
	@Test
	@Order(5)
	void deletePerson() {
		Person person = pr.findById(1).get();
		pr.delete(person);
		Assertions.assertEquals(0, pr.count());
		
	}
}
