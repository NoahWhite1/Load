package dev.noah.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import dev.noah.entities.Person;
import dev.noah.repos.PeopleRepo;

@Component
@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
	PeopleRepo pr;
	
	@Override
	public Person createPerson(Person person) {
		return pr.save(person);
	}

	@Override
	public Person getPersonById(int id) {
		return pr.findById(id).get();
	}

	@Override
	public int getAmountOfPeople() {
		return (int) pr.count();
	}
	
	@Override
	public Person updatePerson(Person person) {
		return pr.save(person);
	}

	@Override
	public Person findPersonByUsername(String person) {
		return pr.findByUsername(person);
	}
	
	@Override
	public boolean deletePerson(Person person) {
		if(person == null) {
			return true;
		}
		else {
			pr.delete(person);
			return true;
		}
	}

	
}
