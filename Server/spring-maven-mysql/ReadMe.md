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