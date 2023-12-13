package com.treinamento.treinamentopratico.controllers.employeeLeave;

import java.sql.Date;
import com.treinamento.treinamentopratico.models.enums.LeaveTypeEmployeeLeave;
import com.treinamento.treinamentopratico.models.enums.TypeEmployeeLeave;
import lombok.Data;

@Data
public class EmployeeLeaveResponse {

  private int id;
  private int clientId;
  private int employeeId;
  private String employeeName;
  private String clientName;
  private Date leaveDate;
  private Date returnDate;
  private int numberDays;
  private TypeEmployeeLeave type;
  private LeaveTypeEmployeeLeave leaveType;
}
