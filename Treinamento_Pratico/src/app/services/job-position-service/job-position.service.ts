import { JobPosition } from './../../model/job-position.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class JobPositionService {
  private readonly APIJOBPOSITION = 'api/job-position';

  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<JobPosition[]> {
    return this.httpClient.get<JobPosition[]>(
      `${this.APIJOBPOSITION}/visualization`
    );
  }

  public getListbyId(id: string): Observable<JobPosition[]> {
    return this.httpClient.get<JobPosition[]>(
      `${this.APIJOBPOSITION}/visualization/${id}`
    );
  }

  public save(record: JobPosition) {
    return this.httpClient.post<JobPosition>(
      `${this.APIJOBPOSITION}/create`,
      record
    );
  }

  public update(id: string, record: JobPosition): Observable<JobPosition> {
    return this.httpClient.put<JobPosition>(
      `${this.APIJOBPOSITION}/edit/${id}`,
      record
    );
  }

  public delete(id: string): Observable<JobPosition[]> {
    return this.httpClient.delete<JobPosition[]>(
      `${this.APIJOBPOSITION}/delete/${id}`
    );
  }
}
