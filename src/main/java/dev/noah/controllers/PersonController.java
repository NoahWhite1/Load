package dev.noah.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.noah.entities.Person;
import dev.noah.services.PersonServiceImpl;

@RestController
@CrossOrigin("*")
public class PersonController {

	@Autowired
	PersonServiceImpl ps;
	
	@RequestMapping(value = "/persons", method = RequestMethod.POST)
	public Person createPerson(@RequestBody Person person) {
		return ps.createPerson(person);
	}
	
	@RequestMapping(value = "/persons/{person}", method = RequestMethod.GET)
	public Person getPersonByUsername(@PathVariable String person) {
		return ps.findPersonByUsername(person);
	}
	
}
