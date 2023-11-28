package dev.noah.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping(value = {"/persons/{id}", "/persons/{person}"})
	public Person getPersonIdentifier(@PathVariable String id) {
		if(isNumeric(id)) {
			return ps.getPersonById(Integer.parseInt(id));
		}
		else {
			return ps.findPersonByUsername(id);
		}
	}
	
	public static boolean isNumeric(String str) {
		  return str.matches("-?\\d+(\\.\\d+)?");
		}
}
