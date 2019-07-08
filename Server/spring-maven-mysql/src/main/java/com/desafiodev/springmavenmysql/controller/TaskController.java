package com.desafiodev.springmavenmysql.controller;

import com.desafiodev.springmavenmysql.repository.TaskRepository;
import com.desafiodev.springmavenmysql.model.Task;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/tasks"})
public class TaskController {

   private TaskRepository repository;

   TaskController(TaskRepository taskRepository) {
       this.repository = taskRepository;
   }
   // métodos do CRUD aqui

    /**
     * Listando todos as tarefas (GET /tasks)
     * @return
     */
    @GetMapping
    public List findAll(){
        return repository.findAll();
    }
    
    /**
     * Obtendo uma tarefa especifica pelo ID (GET /tasks/{id})
     * @param id
     * @return
     */
    @GetMapping(path = {"/{id}"})
    public ResponseEntity findById(@PathVariable long id){
        return repository.findById(id)
           .map(record -> ResponseEntity.ok().body(record))
           .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Criando uma nova tarefa (POST /tasks)
     * @param task
     * @return
     */
    @PostMapping
    public Task create(@RequestBody Task task){
        return repository.save(task);
    }

    /**
     *  Atualizando uma tarefa (PUT /tasks)
     * @param id
     * @param task
     * @return
     */
    @PutMapping(value="/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody Task task) {
        return repository.findById(id)
            .map(record -> {
                record.setName(task.getName());
                record.setDescription(task.getDescription());
                Task updated = repository.save(record);
                return ResponseEntity.ok().body(updated);
            }).orElse(ResponseEntity.notFound().build());
    } 

    /**
     * Removendo uma pelo ID (DELETE /tasks/{id})
     */
    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<?> delete(@PathVariable long id) {
    return repository.findById(id)
            .map(record -> {
                repository.deleteById(id);
                return ResponseEntity.ok().build();
            }).orElse(ResponseEntity.notFound().build());
    }
} 