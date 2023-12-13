package com.treinamento.treinamentopratico.models;

import java.sql.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.treinamento.treinamentopratico.models.enums.TypeEmployee;
import lombok.Data;

@Entity
@Data

@Table(name = "employee")

public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "national_identity", nullable = false)
  private String nationalIdentity;

  @Column(name = "active", nullable = false)
  private boolean active;

  @Column(name = "salary", nullable = false)
  private float salary;

  @Column(name = "type", nullable = false)
  private TypeEmployee type;

  @Column(name = "birthdate", nullable = false)
  private Date birthdate;

  @OneToOne(cascade= {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinColumn(name = "job_Position",nullable=false)
  private JobPosition jobPosition;

  @OneToOne(cascade= {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinColumn(name = "client_id",nullable=false)
  private Client client;

}
