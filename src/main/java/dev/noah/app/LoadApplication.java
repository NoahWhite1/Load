package dev.noah.app;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("dev.noah")
@EntityScan("dev.noah.entities")
@EnableJpaRepositories("dev.noah.repos")
public class LoadApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoadApplication.class, args);
	}

}
