import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Event } from './Modeles/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  url!:string;

  constructor(
    private http: HttpClient,
  ) {
    this.url="http://localhost:3000/api/event";
   }

  async getEvents(): Promise<any> { 
    return await this.http.get(this.url).toPromise();
  }

  async insertEvents(event:Event):Promise<any>{
    return await this.http.post(this.url,event).toPromise();
  }
async updateEvent(event:Event):Promise<any>{
  return await this.http.put(`${this.url}/${event._id}`,event).toPromise();
  }
  async deleteEvent(event:Event):Promise<any>{
    return await this.http.delete(`${this.url}/${event._id}`).toPromise();  }
}

