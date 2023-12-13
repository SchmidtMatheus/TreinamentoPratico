package com.treinamento.treinamentopratico.controllers.employeeLeave;

import java.util.ArrayList;
import java.util.List;
import com.treinamento.treinamentopratico.exceptions.DeathOrTerminationException;
import com.treinamento.treinamentopratico.exceptions.LeaveDaysException;
import com.treinamento.treinamentopratico.exceptions.NotFoundIdException;
import com.treinamento.treinamentopratico.exceptions.NullFieldException;
import com.treinamento.treinamentopratico.models.EmployeeLeave;
import com.treinamento.treinamentopratico.services.EmployeeLeaveService;
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
@RequestMapping("/api/employeeLeave")
@Component

public class EmployeeLeaveController {

  private final EmployeeLeaveService employeeLeaveService;


  public EmployeeLeaveController(EmployeeLeaveService employeeLeaveService) {
    this.employeeLeaveService = employeeLeaveService;

  }

  @GetMapping("/visualization")
  public List<EmployeeLeaveResponse> list() {
    ArrayList<EmployeeLeaveResponse> employeeLeaveList = new ArrayList<>();
    employeeLeaveService.findAll().forEach(employeeLeave -> {
      employeeLeaveList.add(EmployeeLeaveMapper.toResponse(employeeLeave));
    });
    return employeeLeaveList;
  }

  @GetMapping("/visualization/{id}")
  public ResponseEntity findId(@PathVariable("id") Integer id) {

    try {
      EmployeeLeave employeeLeave = employeeLeaveService.findById(id);
      return ResponseEntity.accepted().body(EmployeeLeaveMapper.toResponse(employeeLeave));

    } catch (NotFoundIdException i) {
      return ResponseEntity.badRequest().body(i.getMessage());
    }
  }

  @PostMapping("/create")
  public ResponseEntity create(@RequestBody EmployeeLeaveRequest employeeLeaveRequest) {
    EmployeeLeave employeeLeave = EmployeeLeaveMapper.toEntity(employeeLeaveRequest);
    try {
      employeeLeaveService.save(employeeLeave);
    } catch (DeathOrTerminationException | NullFieldException | LeaveDaysException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity delete(@PathVariable("id") Integer id) {
    employeeLeaveService.deleteById(id);
    return ResponseEntity.accepted().build();
  }

  @PutMapping("/edit/{id}")
  public EmployeeLeave edit(@PathVariable("id") Integer id,
      @RequestBody EmployeeLeaveRequest employeeLeaveRequest) {
    EmployeeLeave employeeLeave = EmployeeLeaveMapper.toEntity(employeeLeaveRequest, id);
    return employeeLeaveService.save(employeeLeave);
  }

}
