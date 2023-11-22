package dev.noah.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.noah.entities.Person;

@Repository
public interface PeopleRepo extends JpaRepository<Person,Integer> {

	public Person findByUsername(String username);
	
}
