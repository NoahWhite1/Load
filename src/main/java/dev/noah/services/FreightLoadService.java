package dev.noah.services;

import java.util.List;

import dev.noah.entities.FreightLoad;

public interface FreightLoadService {
	
	FreightLoad createFreightLoad(FreightLoad freightLoad,int personId);
	
	FreightLoad getFreightLoadById(int id);
	List<FreightLoad> getAllFreightLoads();
	
	FreightLoad updateFreightLoad(FreightLoad freightLoad);
	
	
	Boolean deleteFreightLoad(int id);

}
