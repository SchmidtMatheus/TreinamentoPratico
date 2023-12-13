import { ClientService } from '../../../../services/client-service/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../model/client.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  public clientList: Observable<Client[]>;
  public displayedColumns: string[] = ['id', 'name', 'actionButtons'];

  constructor(private serviceService: ClientService, private router: Router) {}

  public ngOnInit(): void {
    this.clientList = this.serviceService.getList();
  }
  public onAddClient() {
    this.router.navigate(['newClient']);
  }

  public onRouteEdit(id: string) {
    this.router.navigate(['editClient/', id]);
  }

  public onRemove(id: string) {
    this.serviceService.delete(id).subscribe(() => {
      this.clientList = this.serviceService.getList();
    });
  }
}
