import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-list',
  template: `
  <td>{{ userList.username }}</td>
  <td>{{ userList.id }}</td>
  <td>{{ userList.roles }}</td>
  `,
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() userList: { email:string, id: number, roles: string };
  constructor(

  ) {
     
  }

  ngOnInit() {
   
  }

  



  
}
