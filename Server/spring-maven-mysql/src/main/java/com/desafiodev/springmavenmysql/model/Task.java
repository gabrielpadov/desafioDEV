package com.desafiodev.springmavenmysql.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String name;
   private String description;
   private String level;
   private String status;
   private String details;
   private String locate;
   private String date_start;
   private String date_end;
   private String image; 
   
}