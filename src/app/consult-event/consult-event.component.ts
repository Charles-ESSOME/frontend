import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbDateStruct,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from './event.service';
import { Event } from './Modeles/event';

@Component({
  selector: 'app-consult-event',
  templateUrl: './consult-event.component.html',
  styleUrls: ['./consult-event.component.css']
})
export class ConsultEventComponent implements OnInit {

  isAuth = false;
  events: any;
  dialog:any;
  
//modéle pour donner une forme au données envoyer au serveur et utilisé comme tampon
  selectedEvent:Event={
    label: "",
    description:"",
    lieu: "",
    invite:""

  };
  date!: NgbDateStruct ;

  constructor(private modalService: NgbModal, private eventService:EventService) { }

  //fonction pour récupérer et afficher les données du serveur
  async ngOnInit(): Promise<void> {
    this.events = await this.eventService.getEvents();

  }
  
  //fonction pour ajouter les données binder et enregisistrer dans la bd
  async save(callback:any){
    this.selectedEvent.date=this.toTimestamp(this.date.year,this.date.month-1,this.date.day)
    console.log(this.selectedEvent);
    await this.eventService.insertEvents(this.selectedEvent) ;
    this.events = await this.eventService.getEvents();  
    callback("");
    
  } 
  open(content: any) {
    
      this.date  = {year: 0, day:0, month:0}
    const dialog=this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }
   
  //fonction de modification des événnement poster
  async modify(callback:any){
    this.selectedEvent.date=this.toTimestamp(this.date.year,this.date.month-1,this.date.day)
    console.log(this.selectedEvent);
    await this.eventService.updateEvent(this.selectedEvent) ;
    this.events = await this.eventService.getEvents();  
    callback("");
    
  }
  openEdit(content: any,event:any) {
    this.selectedEvent=event;
    const date=new Date(event.date);
    this.date={year:date.getFullYear(),month:date.getMonth(),day:date.getDay()}
    const dialog=this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //fonction de suppression d'unévénement
  async delete(callback:any){
    await this.eventService.deleteEvent(this.selectedEvent) ;
    this.events = await this.eventService.getEvents();  
    callback("");    
  }
  openDelete(content:any,event:any){
    this.selectedEvent=event;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  //fonction d'affichage de la date
   toTimestamp(year:number ,month:number,day:number){
    var datum = new Date(year,month,day);
    return datum.getTime();
   }
  closeResult = '';


 //fonction d'ajout d'invité
 async addInvite(callback:any){
   
  await this.eventService.updateEvent(this.selectedEvent) ;
  this.events = await this.eventService.getEvents();  
  callback("");
  
}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}


