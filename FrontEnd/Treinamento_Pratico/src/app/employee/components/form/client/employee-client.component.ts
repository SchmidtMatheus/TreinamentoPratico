import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../services/client-service/client.service';

@Component({
  selector: 'app-employee-client',
  templateUrl: './employee-client.component.html',
  styleUrls: ['./employee-client.component.css'],
})
export class EmployeeClientComponent implements OnInit {
  public formClient: FormGroup;
  private id : string;

  constructor(
    private FormClient: FormBuilder,
    private serviceClient: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.formClient = this.FormClient.group({
      name: [null],
    });
  }

  public ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.serviceClient.getListbyId(this.id).subscribe((client) => {
        this.formClient.patchValue(client);
      });
    }
  }



  public onClear() {
    this.formClient.reset();
  }

  public onSubmit() {
    if (this.id) {
      this.serviceClient
        .update(this.id, this.formClient.value)
        .subscribe(() => this.router.navigate(['clientList']));
    } else {
    this.serviceClient
      .saveClient(this.formClient.value)
      .subscribe(() => this.router.navigate(['clientList']));
  }
}

  public onBack() {
    this.router.navigate(['clientList']);
  }
}
