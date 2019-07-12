API RESTful CRUD

Listar todos os tarefas - @GetMapping(“/tasks")
Obter uma tarefa específico pelo ID - @GetMapping(“/tasks/{id}”)
Remover uma tarefa pelo ID - @DeleteMapping(“/tasks/{id}”)
Criar uma novo tarefa - @PostMapping(“/tasks)
Atualizar detalhes de uma tarefa - @PutMapping(“/tasks/{id}”)


CREATE TABLE localizacao (coordenadas GEOMETRY);

INSERT INTO localizacao (coordenadas) VALUES 
(ST_GeomFromText('POINT(40.71727401 -74.00898606)'));

SELECT ST_AsText(coordenadas) coordenadas FROM localizacao;


Configuração de CORS

https://spring.io/guides/gs/rest-service-cors/

https://stackoverflow.com/questions/35091524/spring-cors-no-access-control-allow-origin-header-is-present

Change the CorsMapping from registry.addMapping("/*") to registry.addMapping("/**") in addCorsMappings method.

Check out this Spring CORS Documentation .

From the documentation -

Enabling CORS for the whole application is as simple as:

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
You can easily change any properties, as well as only apply this CORS configuration to a specific path pattern:

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://domain2.com")
            .allowedMethods("PUT", "DELETE")
            .allowedHeaders("header1", "header2", "header3")
            .exposedHeaders("header1", "header2")
            .allowCredentials(false).maxAge(3600);
    }
}
Controller method CORS configuration

@RestController
@RequestMapping("/account")
public class AccountController {
  @CrossOrigin
  @RequestMapping("/{id}")
  public Account retrieve(@PathVariable Long id) {
    // ...
  }
}