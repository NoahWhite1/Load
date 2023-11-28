package dev.noah.services;

import dev.noah.entities.Person;

public interface PersonService {

	public Person createPerson(Person person);
	
	public Person getPersonById(int id);
	
	public int getAmountOfPeople();
	
	public Person updatePerson(Person person);
	
	public Person findPersonByUsername(String person);
	
	public boolean deletePerson(Person person);
	
}
