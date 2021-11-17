import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from './Modeles/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  message: any;

  constructor(private http:HttpClient,private router:Router) {
    
   }
   async userLogin(user:User):Promise<any>{
     try {
        const data= await this.http.post("http://localhost:3000/api/auth",user).toPromise();
        if(data)
        this.router.navigate(['home']);
     } catch (error: any) {
      this.message=error.error.error
      console.log(error);
      
      }
  }  
}
