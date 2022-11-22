import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  addServerForm : FormGroup;

  appData = new Promise( (resolve,reject)=> {
    setTimeout( ()=> {
      resolve('stable');
    } ,2000)
  } );

  filterQuery = '';

  servers = [
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer() {
    this.servers.push(
      {
        instanceType: 'medium',
        name: 'UAT',
        status: 'stable',
        started: new Date(15, 1, 2017)
      }
    )
  }

  ngOnInit(): void {
      this.addServerForm = new FormGroup({
        name : new FormControl(null,Validators.required),
        instanceType: new FormControl(null,Validators.required),
        status: new FormControl(null,Validators.required)
      })
  }

  addServer() {
    console.log('submit');
    
    this.servers.push(
      {
        instanceType: this.addServerForm.value['instanceType'],
        name: this.addServerForm.value['name'],
        status: this.addServerForm.value['status'],
        started: new Date(15, 1, 2017)
      }
    )

    this.addServerForm.reset();
  }
}
