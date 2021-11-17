import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './Modeles/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user:User={
    email:"",
    password:"",
  };
loginMessage:any;
  constructor(private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    
  }
  async login(){
    await this.auth.userLogin(this.user)
    this.loginMessage=this.auth.message;
  }
  nav() {
    
   
  }
}