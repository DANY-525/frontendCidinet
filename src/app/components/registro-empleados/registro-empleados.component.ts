import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';




interface Pais {
  value: string;
  nombre: string;
}

interface Identificacion {
  value: string;
  nombre: string;
}


interface Area {
  value: string;
  nombre: string;
}


let show:boolean;
let spining:boolean;



@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {
  @Output() newUser: EventEmitter<any> = new EventEmitter();

  

 show =false;
 spining=false;
  
  
 areas: Area[] = [
  {value: '0', nombre: 'Administracion'},
  {value: '1', nombre: 'Financiera'},
  {value: '2', nombre: 'Compras'},
  {value: '3', nombre: 'Infraestructura'},
  {value: '3', nombre: 'Operacion'}


];




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
  constructor(private calendar: NgbCalendar,private userService:UserService ) { 


  
  }
  ngOnInit(): void {

  }

  beforeSend(data){
    let result = false;
    if(data.fechaIngreso  == undefined){
      result = true;
    }

    if(data.identificacion  == ""){
      result = true;
    }
  if(data.pais  == ""){
      result = true;
    }

    if(data.primerApellido  == ""){
      result = true;
    }
    if(data.segundoApellido  == ""){
     result = true;
    }
    if(data.segundoNombre  == ""){
      result = true;
    }
    if(data.tipoId  == ""){
     result = true;
    }
    return result;

  }


  onClickSubmit(data):void{


    console.log(data);
    this.show =false;
    this.spining = true;
    let  result =  this.beforeSend(data);
    if(result == true){
      this.show = true;
     }
    if(!result){
       
      let fecha =   data.fechaIngreso.getDate();
       console.log(fecha);
      
      this.userService.newUser(data).subscribe(res =>{
          console.log(res);
      });
      
       //this.newUser.emit(data);
      //console.log(result);  
    }
     //this.spining = false;
      
  }






}
