import { TypeEmployee } from './type-employee.enum';
export interface Employee {

  id: number;

  clientId: number;

  name: string;

  nationalIdentity: string;

  jobPosition: number;

  active: boolean;

  salary: number;

  type: TypeEmployee;

  birthdate: Date;

}
