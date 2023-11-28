package dev.noah.repos;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import dev.noah.entities.FreightLoad;
import dev.noah.entities.Person;

@SpringBootTest(classes = dev.noah.app.LoadApplication.class)
@ContextConfiguration(classes = dev.noah.app.LoadApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
class FreightLoadTests {
	
	@Autowired
	private FreightLoadRepo fl;
	
	@Autowired
	private PeopleRepo pr;
	

	@Test
	@Order(1)
	@Rollback(false)
	void createFreightLoad() {

		 Person person = new Person(0,"username","password",null,"firstname","lastname",0,"email","1234567890");
		 pr.saveAndFlush(person);
		 FreightLoad freightLoad1 = new FreightLoad(0,new BigDecimal(11.00),"test1","test1",new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),1,person);
		 FreightLoad freightLoad2 = new FreightLoad(0,new BigDecimal(11.00),"test1","test1",new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),1,person);

		 fl.saveAndFlush(freightLoad1);
		 fl.saveAndFlush(freightLoad2);
		 
		 List<FreightLoad> freight = new ArrayList<FreightLoad>();
		 freight.add(freightLoad1);
		 freight.add(freightLoad2);
		 
		 person.setFreightloads(freight);
		 
		 pr.saveAndFlush(person);
		 
		 Assertions.assertEquals(2, pr.getOne(1).getFreightloads().size());
		 System.out.println("Total loads" + pr.getOne(1).getFreightloads());
		 System.out.println(person);
		 Assertions.assertNotEquals(0, freightLoad1.getF_id());
		 Assertions.assertEquals(1, freightLoad1.getFreightBroker().getpId());

	}
	
	@Test
	@Order(2)
	void getFreightLoad() {
		int fId = fl.findById(1).get().getF_id();
		Assertions.assertEquals(1, fId);

	}
	
	@Test
	@Order(3)
	void getAllFreightLoads(){
		List<FreightLoad> freightLoads = new ArrayList<FreightLoad>();
		freightLoads = fl.findAll();
		Assertions.assertEquals(2, freightLoads.size());
	}
	
	@Test
	@Order(4)
	void updateFreightLoad() {
		FreightLoad freightLoad = fl.findById(1).get();
		freightLoad.setStartAddress("start point");
		fl.save(freightLoad);
		Assertions.assertEquals("start point", freightLoad.getStartAddress());
		Assertions.assertEquals(2, fl.count());
	}
	
	@Test
	@Order(5)
	void deleteFreightLoad() {
		FreightLoad freightLoad = fl.findById(1).get();
		fl.delete(freightLoad);
		Assertions.assertEquals(1, fl.count());
	}

}
