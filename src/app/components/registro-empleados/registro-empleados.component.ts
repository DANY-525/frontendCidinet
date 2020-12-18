import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';



interface Pais {
  value: string;
  nombre: string;
}

interface Identificacion {
  value: string;
  nombre: string;
}


@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {


  paises: Pais[] = [
    {value: '0', nombre: 'colombia'},
    {value: '1', nombre: 'usa'}
  ];

  tipoId: Identificacion[] = [
    {value: '0', nombre: 'cedula'},
    {value: '1', nombre: 'cedula extrangeria'},
    {value: '2', nombre: ' pasaporte'},
    {value: '2', nombre: ' permiso especiao'},
  ];
  
  primerApellido:string;
  segundoApellido:string;
  primerNombre:string;
  segundoNombre:string;
  identificacion:string;

  
  correo:string;
  model: NgbDateStruct;
  date: {year: number, month: number};


  constructor(private calendar: NgbCalendar) { 


  
  }
  ngOnInit(): void {

  }

  beforeSend(data){


    return data;
  }


  onClickSubmit(data):void{

     let  result =  this.beforeSend(data);

     console.log(result);
      

    
  }






}
