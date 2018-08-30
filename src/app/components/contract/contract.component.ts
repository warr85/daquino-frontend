import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../users/user-edit/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit, CanComponentDeactivate {

  constructor() { }

  ngOnInit() {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm("are you sure?");
  }

}
