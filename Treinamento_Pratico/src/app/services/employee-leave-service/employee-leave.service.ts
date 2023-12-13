import { EmployeeLeave } from '../../model/employee-leave.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveService {
  private readonly APIEMPLOYEELEAVE = 'api/employeeLeave';

  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<EmployeeLeave[]> {
    return this.httpClient.get<EmployeeLeave[]>(`${this.APIEMPLOYEELEAVE}/visualization`);
  }

  public getListbyId(id: string): Observable<EmployeeLeave> {
    return this.httpClient.get<EmployeeLeave>(
      `${this.APIEMPLOYEELEAVE}/visualization/${id}`
    );
  }

  public save(record: EmployeeLeave) {
    return this.httpClient.post<EmployeeLeave>(`${this.APIEMPLOYEELEAVE}/create`, record);
  }

  public update(id: string, record: EmployeeLeave): Observable<EmployeeLeave> {
    return this.httpClient.put<EmployeeLeave>(
      `${this.APIEMPLOYEELEAVE}/edit/${id}`,
      record
    );
  }

  public delete(id: string): Observable<EmployeeLeave> {
    return this.httpClient.delete<EmployeeLeave>(
      `${this.APIEMPLOYEELEAVE}/delete/${id}`
    );
  }
}
