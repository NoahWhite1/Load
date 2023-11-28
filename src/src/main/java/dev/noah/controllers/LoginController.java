package dev.noah.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.noah.dtos.Login;
import dev.noah.entities.Person;

@Component
@RestController
@CrossOrigin("*")
public class LoginController {
	

	@Autowired
	Login login;
	
	
	@RequestMapping(value = "/persons", method = RequestMethod.GET)
	public Person loginCredentials(@RequestParam String username, @RequestParam String password) {
		return login.loginCredentials(username, password);
	}
}
