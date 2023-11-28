package dev.noah.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.noah.entities.FreightLoad;

@Repository
public interface FreightLoadRepo extends JpaRepository<FreightLoad,Integer> {

}
