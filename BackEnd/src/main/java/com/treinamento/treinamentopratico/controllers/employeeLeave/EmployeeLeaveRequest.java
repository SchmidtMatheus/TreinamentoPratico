package com.treinamento.treinamentopratico.controllers.employeeLeave;

import java.sql.Date;
import javax.validation.constraints.Past;
import com.treinamento.treinamentopratico.models.enums.LeaveTypeEmployeeLeave;
import com.treinamento.treinamentopratico.models.enums.TypeEmployeeLeave;
import lombok.Data;

@Data
public class EmployeeLeaveRequest {

  private int id;

  private int clientId;

  private int employeeId;

  @Past(message = "\"Data de nascimento\" não pode ser maior que a data atual")
  private Date leaveDate;

  @Past(message = "\"Data de nascimento\" não pode ser maior que a data atual")
  private Date returnDate;

  private int numberDays;

  private TypeEmployeeLeave type;

  private LeaveTypeEmployeeLeave leaveType;
}
