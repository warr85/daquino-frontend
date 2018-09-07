import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent implements OnInit {
  public options;
  public nextId: number;

  editForm: FormGroup;
  public items;


  default: string = 'Select Party';
  constructor() {
    
   }

  ngOnInit() {
    this.options = {
      format: "MM.DD.YYYY",
      showClose: true,
      ignoreReadonly: true,
      allowInputToggle: true
    };

    this.getNextId();
    this.populateSelect();

    this.editForm = new FormGroup({
      'id': new FormControl(this.nextId),
      'sigDate': new FormControl(null),
      'startDate': new FormControl(null),
      'expDate': new FormControl(null),
      'contracting': new FormControl("Daquino's Import"),
      'contracted': new FormControl(this.items[0].value , Validators.required)

    });
    
    console.log(this.items[0])
    
  }

  getNextId() {
      this.nextId = 123456;
  }

  populateSelect() {
    this.items = [{name: 'Select Party', value: null}, {name: 'One', value: 1}, {name: 'Two', value: 2}, {name: 'Three', value: 3}];
  }

  onSubmit() {
    console.log(this.editForm.value);
  }

}
