package dev.noah.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import dev.noah.entities.FreightLoad;
import dev.noah.services.FreightLoadServiceImpl;

@RestController
@CrossOrigin("*")
public class FreightLoadController {

	@Autowired
	FreightLoadServiceImpl fls;
	
	@RequestMapping(value = "/freightLoads/{person}",method = RequestMethod.POST)
	public FreightLoad createFreightLoad(@RequestBody FreightLoad freightLoad,@PathVariable int person) {
		return fls.createFreightLoad(freightLoad, person);
	}
	
	@RequestMapping(value = "/freightLoads/{id}", method = RequestMethod.GET)
	public FreightLoad getFreightLoadById(@PathVariable int id) {
		return fls.getFreightLoadById(id);
	}
	
	@RequestMapping(value = "/freightLoads", method = RequestMethod.GET)
	public List<FreightLoad> getAllFreightLoads() {
		return fls.getAllFreightLoads();
	}
	
	@RequestMapping(value = "/freightLoads", method = RequestMethod.PUT)
	public FreightLoad updateFreightLoad(@RequestBody FreightLoad freightLoad) {
		return fls.updateFreightLoad(freightLoad);
	}
	@RequestMapping(value = "/freightLoads/{id}", method = RequestMethod.DELETE)
	public Boolean deleteFreightLoad(@PathVariable int id) {
		return fls.deleteFreightLoad(id);
	}
	
}
