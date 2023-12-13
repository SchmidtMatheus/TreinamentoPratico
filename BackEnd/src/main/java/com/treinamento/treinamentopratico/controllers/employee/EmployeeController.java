package com.treinamento.treinamentopratico.controllers.employee;

import java.util.ArrayList;
import java.util.List;
import com.treinamento.treinamentopratico.exceptions.NotFoundIdException;
import com.treinamento.treinamentopratico.exceptions.NullFieldException;
import com.treinamento.treinamentopratico.models.Employee;
import com.treinamento.treinamentopratico.services.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employee")
@Component

public class EmployeeController {

  private final EmployeeService employeeService;


  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;

  }

  @GetMapping("/visualization")
  public List<EmployeeResponse> list() {
    ArrayList<EmployeeResponse> employeeList = new ArrayList<>();
    employeeService.findAll().forEach(employee -> {
      employeeList.add(EmployeeMapper.toResponse(employee));
    });
    return employeeList;
  }

  @GetMapping("/visualization/{id}")
  public ResponseEntity findId(@PathVariable("id") Integer id) {

    try {
      Employee employee = employeeService.findById(id);
      return ResponseEntity.accepted().body(EmployeeMapper.toResponse(employee));

    } catch (NotFoundIdException i) {
      return ResponseEntity.badRequest().body(i.getMessage());
    }
  }

  @PostMapping("/create")
  public ResponseEntity create(@RequestBody EmployeeRequest employeeRequest) {
    Employee employee = EmployeeMapper.toEntity(employeeRequest);
    try {
      employeeService.save(employee);
    }catch (NullFieldException e){
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity delete(@PathVariable("id") Integer id) {
    employeeService.deleteById(id);
    return ResponseEntity.accepted().build();
  }

  @PutMapping("/edit/{id}")
  public Employee edit(@PathVariable("id") Integer id,
      @RequestBody EmployeeRequest employeeRequest) {
    Employee employee = EmployeeMapper.toEntity(employeeRequest, id);
    return employeeService.save(employee);
  }

}
