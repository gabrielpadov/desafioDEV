package com.desafiodev.springmavenmysql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SpringMavenMysqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMavenMysqlApplication.class, args);
	}
    
	public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/tasks/**")
               .allowedOrigins("http://localhost:3000","http://localhost:8080")
               .allowedMethods("GET", "PUT", "POST", "DELETE")
               .allowedHeaders("Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Authorization", "X-Requested-With", "requestId", "Correlation-Id")
               .allowCredentials(false).maxAge(3600);
               
           }
      };
    }    
}
