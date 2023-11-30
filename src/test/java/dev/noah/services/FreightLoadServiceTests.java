package dev.noah.services;

import java.math.BigDecimal;

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
class FreightLoadServiceTests {

	@Autowired
	FreightLoadServiceImpl fls;
	
	@Autowired
	PersonServiceImpl ps;
	
	@Test
	@Order(1)
	@Rollback(false)
	void createFreightLoad() {
		Person person = new Person(0,"username","password",null,"testingfirstname","testinglastname",0,"email","123456789");
		ps.createPerson(person);
		FreightLoad freightLoad1 = new FreightLoad(0,new BigDecimal(11.00),"test1","test1",new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),1,person);
		FreightLoad freightLoad2 = new FreightLoad(0,new BigDecimal(11.00),"test1","test1",new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),new BigDecimal(0.00),1,person);
		fls.createFreightLoad(freightLoad1, 1);
		fls.createFreightLoad(freightLoad2, 1);
		
		Assertions.assertNotEquals(0, freightLoad1.getF_id());
		Assertions.assertNotEquals(0, freightLoad2.getF_id());

		Assertions.assertEquals(1, fls.getFreightLoadById(1).getF_id());
		Assertions.assertEquals(2, fls.getFreightLoadById(2).getF_id());
		Assertions.assertEquals("username", ps.getPersonById(1).getUsername());
		Assertions.assertEquals(2,ps.getPersonById(1).getFreightloads().size());
	}
	
	@Test
	@Order(2)
	void getFreightLoad() {
		FreightLoad freightLoad = fls.getFreightLoadById(1);
		Assertions.assertEquals(11, freightLoad.getRate());
	}
	
	@Test
	@Order(3)
	void getAllFreightLoads() {
		Assertions.assertEquals(8, fls.getAllFreightLoads().size());
	}
	
	@Test
	@Order(4)
	void updateFreightLoad() {
		FreightLoad freightLoad = fls.getFreightLoadById(1);
		freightLoad.setDriverPay(new BigDecimal(1000.00));
		fls.updateFreightLoad(freightLoad);
		Assertions.assertEquals(1000.00, freightLoad.getDriverPay());
	}
	
	@Test
	@Order(5)
	void deleteFreightLoad() {
		fls.deleteFreightLoad(1);
		Assertions.assertEquals(7, fls.getAllFreightLoads().size());
	}

}
