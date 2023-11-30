package dev.noah.services;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.noah.entities.FreightLoad;
import dev.noah.entities.Person;
import dev.noah.repos.FreightLoadRepo;

@Component
@Service
public class FreightLoadServiceImpl implements FreightLoadService {

	@Autowired
	FreightLoadRepo flp;
	@Autowired
	PersonService psp;

	@Override
	@Transactional
	public FreightLoad createFreightLoad(FreightLoad freightLoad, int personId) {

		Person person = psp.getPersonById(personId);

		if (person.getFreightloads() != null) {

			freightLoad.setFreightBroker(person);
			flp.saveAndFlush(freightLoad);
			person.getFreightloads().add(freightLoad);
			psp.updatePerson(person);
		} else {

			List<FreightLoad> freight = new ArrayList<FreightLoad>();
			freightLoad.setFreightBroker(person);
			flp.saveAndFlush(freightLoad);
			freight.add(freightLoad);
			person.setFreightloads(freight);
			psp.updatePerson(person);
		}

		return freightLoad;
	}

	@Override
	public FreightLoad getFreightLoadById(int id) {
		return flp.findById(id).get();
	}

	public List<FreightLoad> getAllFreightLoads() {
		return flp.findAll();
	}

	@Override
	public FreightLoad updateFreightLoad(FreightLoad freightLoad) {
		return flp.save(freightLoad);
	}

	@Override
	public Boolean deleteFreightLoad(int id) {
		FreightLoad freightLoad = flp.findById(id).get();
		if (freightLoad != null) {
			flp.delete(freightLoad);
			return true;
		}
		return false;
	}

}
