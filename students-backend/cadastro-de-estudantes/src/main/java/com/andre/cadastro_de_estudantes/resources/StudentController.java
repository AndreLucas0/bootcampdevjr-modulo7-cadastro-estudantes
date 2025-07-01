package com.andre.cadastro_de_estudantes.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.andre.cadastro_de_estudantes.models.Student;

@RestController
@CrossOrigin
public class StudentController {
    
    private List<Student> students = new ArrayList<>();

    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {

        Student student = students.stream()
                                  .filter(s -> s.getId() == id)
                                  .findFirst()
                                  .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found."));
                                  
        return ResponseEntity.ok(student);
    }

}
