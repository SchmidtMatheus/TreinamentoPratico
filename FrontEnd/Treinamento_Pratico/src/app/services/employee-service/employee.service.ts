import { Employee } from '../../model/employee.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly APIEMPLOYEE = 'api/employee';

  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.APIEMPLOYEE}/visualization`);
  }

  public getById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(
      `${this.APIEMPLOYEE}/visualization/${id}`
    );
  }

  public save(record: Employee) {
    return this.httpClient.post<Employee>(`${this.APIEMPLOYEE}/create`, record);
  }

  public update(id: string, record: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(
      `${this.APIEMPLOYEE}/edit/${id}`,
      record
    );
  }

  public delete(id: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(
      `${this.APIEMPLOYEE}/delete/${id}`
    );
  }
}
