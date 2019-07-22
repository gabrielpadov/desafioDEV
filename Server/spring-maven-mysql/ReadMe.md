API RESTful CRUD

Listar todos os tarefas - @GetMapping(“/tasks")
Obter uma tarefa específico pelo ID - @GetMapping(“/tasks/{id}”)
Remover uma tarefa pelo ID - @DeleteMapping(“/tasks/{id}”)
Criar uma novo tarefa - @PostMapping(“/tasks)
Atualizar detalhes de uma tarefa - @PutMapping(“/tasks/{id}”)

________________________________________________________________________________

Para executar a API

No diretorio: Server/spring-maven-mysql/ 
### Compilação: 
1. mvn clean install


No diretorio: Server/spring-maven-mysql/target/ 
### Execução: 
1. java -jar spring-maven-mysql-0.0.1-SNAPSHOT.jar