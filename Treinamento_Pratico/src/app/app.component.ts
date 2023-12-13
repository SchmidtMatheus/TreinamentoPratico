import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router){
  }

  public ngOnInit(): void {
  }

  onAddEmployee(){
    this.router.navigate(['']);
  }

  onAddClient(){
    this.router.navigate(['clientList'])
  }

  onAddJobPosition(){
    this.router.navigate(['jobPositionList'])
  }

  onAddEmployeeLeave(){
    this.router.navigate(['employeeLeaveList']);
  }
}

