import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/model/client.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly APICLIENT = 'api/client';

  constructor(private httpClient: HttpClient) {}

  public getList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.APICLIENT}/visualization`);
  }

  public getListbyId(id: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(
      `${this.APICLIENT}/visualization/${id}`
    );
  }

  public saveClient(record: Client) {
    return this.httpClient.post<Client>(`${this.APICLIENT}/create`, record);
  }

  public update(id: string, record: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${this.APICLIENT}/edit/${id}`, record);
  }

  public delete(id: string): Observable<Client[]> {
    return this.httpClient.delete<Client[]>(`${this.APICLIENT}/delete/${id}`);
  }
}
