import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../users/user-edit/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit, CanComponentDeactivate {

  constructor() { }

  ngOnInit() {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm("are you sure?");
  }

}
