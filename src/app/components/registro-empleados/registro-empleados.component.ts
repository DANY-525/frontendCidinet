import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
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

let isEdit = false;

let show: boolean;
let spining: boolean;

let camposMalos;

let col = "@cidenet.com.co";
let usa = "@cidenet.com.us";
@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {
  @Output() newUser: EventEmitter<any> = new EventEmitter();
  id: string;
  show = false;
  spining = false;
  usuario;
  areas: Area[] = [
    { value: '0', nombre: 'Administracion' },
    { value: '1', nombre: 'Financiera' },
    { value: '2', nombre: 'Compras' },
    { value: '3', nombre: 'Infraestructura' },
    { value: '4', nombre: 'Operacion' }
  ];
  paises: Pais[] = [
    { value: '0', nombre: 'colombia' },
    { value: '1', nombre: 'usa' }
  ];

  tipoId: Identificacion[] = [
    { value: '0', nombre: 'cedula' },
    { value: '1', nombre: 'cedula extrangeria' },
    { value: '2', nombre: ' pasaporte' },
    { value: '3', nombre: ' permiso especial' },
  ];
  primerApellido: string;
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  idPais: string;
  identificacion: string;
  correo: string;
  fechaIngreso:string;
  model: NgbDateStruct;
  date: { year: number, month: number };
  constructor(private calendar: NgbCalendar, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.usuario = {
      id: '',
      primerApellido: '',
      segundoApellido: '',
      primerNombre: '',
      segundoNombre:'',
      idPais: '',
      tipoId: '',
      identificacion: '',
      fechaIngreso: '',
      idArea: '',
      fechaRegistro: '',
      estado: '',
    }
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getById(this.id);

      isEdit = true;
    }
  }

  getById(id) {
    this.userService.getUserById(id).subscribe(res => {
      //console.log(res);
      this.usuario = res;
    });

  }

  getTimesLocal(fechaParametro) {
    let mes = fechaParametro.getMonth();
    let dia = fechaParametro.getDate();
    let fecha = fechaParametro.toLocaleString().slice(6, -10);
    if (dia <= 9) {
      dia = "0" + dia;
    }
    if (mes <= 9) {
      mes = "0" + mes;
    }
    return fecha + "-" + mes + "-" + dia;
  }
  buildEmail(primerNombre: any, primerApellido: any, idPais: any) {
    let dominio = (idPais == 0) ? col : usa;
    return primerNombre + "" + primerApellido + "" + dominio;
  }

  validateForm(data: any) {
    let retornoCampos = "";
    let regexaz = new RegExp("^[a-zA-Z]{0,20}$");
    let regexaz50 = new RegExp("^[a-zA-Z]{0,50}$");
    let resPrimerN = (regexaz.test(data.primerNombre) == true) ? "" : "revisar primer nombre max 20 caracteres</br>";
    let resSegundoN = (regexaz.test(data.segundoNombre) == true) ? "" : "revisar primer nombre max 20 caracteres</br>";
    let resPrimera = (regexaz.test(data.primerApellido) == true) ? "" : "revisar primer nombre max 20 caracteres</br>";
    let resSegA = (regexaz50.test(data.segundoApellido) == true) ? "" : "revisar primer nombre max 50 caracteres</br>";
    return resPrimerN + resSegundoN + resPrimera + resSegA;
  }
  onClickSubmit(data): void {
    this.show = false;
    this.spining = true;
    // this.router.navigate(['/']);
    camposMalos = this.validateForm(data);
    if (camposMalos == "") {
      //let fechaRegistroCalendar = this.getTimesLocal(data.fechaIngreso);
     
                     //   console.log(this.usuario.fechaIngreso);

                     console.log(data.fechaIngreso);
     
      data.fechaIngreso = data.fechaIngreso;
      let fechaRegistro = new Date();
      console.log(fechaRegistro);
      // let fechaActual = this.getTimesLocal(fechaRegistro);
      data.fechaRegistro = fechaRegistro;
      data.estado = 1;
      let email = this.buildEmail(data.primerNombre, data.primerApellido, data.idPais);
      data.correo = email;

     // console.log(data);
      this.userService.newUser(data).subscribe(res => {
        this.spining = false;
        this.show = false;
        this.router.navigate(['/']);
      });
    } else {
      this.show = true;
      this.spining = false;
    }

  }

}
