package com.treinamento.treinamentopratico.repositories;

import java.util.List;
import com.treinamento.treinamentopratico.models.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeLeaveRepository extends JpaRepository<EmployeeLeave, Integer> {

  @Query(value = "SELECT el.*, e.name as employeeName, c.name as clientName FROM employee e inner join employee_leave el on e.id = el.employee_id inner join client c on el.client_id = c.id", nativeQuery = true)
  List<EmployeeLeave> findAllWithJoin();

  @Query(value = "SELECT COUNT (employee_id) FROM employee_leave el WHERE el.employee_id = :employeeId AND (el.leave_type = '4' OR el.leave_type = '5')", nativeQuery = true)
  int countByEmployeeIdAndTerminationsType(@Param("employeeId") int employeeId);
}
