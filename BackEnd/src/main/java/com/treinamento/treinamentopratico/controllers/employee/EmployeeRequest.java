package com.treinamento.treinamentopratico.controllers.employee;

import java.sql.Date;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import com.treinamento.treinamentopratico.models.enums.TypeEmployee;
import lombok.Data;


@Data
public class EmployeeRequest {


  @Pattern(regexp = "[^0-9]*", message = "O campo \"Nome \"não deve conter números")
  private String name;

  @Digits(message = "O campo \"CPF\" deve ser preenchido com números", integer = 11, fraction = 0)
  @Size(min = 11, max = 11, message = "\"CPF\" precisa conter 11 dígitos")
  private String nationalIdentity;

  private int clientId;

  private float salary;

  private int jobPositionId;

  private TypeEmployee typeEmployee;

  private boolean active;

  @Past(message = "\"Data de nascimento\" não pode ser maior que a data atual")
  private Date birthdate;

}
