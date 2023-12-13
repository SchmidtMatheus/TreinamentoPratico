import { TypeEmployeeLeave } from './type-employee-leave.enum';
import { LeaveTypeEmployeeLeave } from './leave-type-employee-leave.enum';
export interface EmployeeLeave {
  id: number;

  clientId: number;

  employeeId: number;

  leaveDate: Date;

  numberDays: number;

  returnDate: Date;

  salary: number;

  type: TypeEmployeeLeave;

  leaveType: LeaveTypeEmployeeLeave;
}
