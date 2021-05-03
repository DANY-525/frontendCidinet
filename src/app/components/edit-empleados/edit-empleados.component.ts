import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-edit-empleados',
  templateUrl: './edit-empleados.component.html',
  styleUrls: ['./edit-empleados.component.css']
})
export class EditEmpleadosComponent implements OnInit {
  id: any;
  primerApellido: string = "daniel";
  segundoApellido: string;
  primerNombre: string;
  segundoNombre: string;
  idPais: string;
  idNumber: string;
  correo: string;
  fechaIngreso: string;
  model: NgbDateStruct;
  date: { year: number, month: number };
  show = false;
  spining = false;
  datos: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {

  };

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

  profileForm = new FormGroup({
    primerApellido: new FormControl(''),
    segundoApellido: new FormControl(''),
    primerNombre: new FormControl(''),
    segundoNombre: new FormControl(''),
    idPais: new FormControl(""),
    tipoId: new FormControl(""),
    idNumber: new FormControl(""),
    correo: new FormControl(""),
    fechaIngreso: new FormControl(""),
    fechaRegistro: new FormControl(""),
    AreaId: new FormControl(""),
  });
  dato: any
  ngOnInit(): void {

    this.dato = localStorage.getItem('usuarios');
    let usuarios = JSON.parse(this.dato);
    this.id = this.route.snapshot.paramMap.get('id')
    const usuario = usuarios.filter(usuario => usuario.id == this.id)[0];
    this.profileForm.patchValue(usuario);
    this.profileForm.controls["idPais"].setValue(usuario.idpais.toString());
    this.profileForm.controls["tipoId"].setValue(usuario.tipoId.toString());
    this.profileForm.controls["fechaIngreso"].setValue(usuario.fechaIngreso.toString());
    this.profileForm.controls["correo"].setValue(usuario.correo.toString());
    this.profileForm.controls["AreaId"].setValue(usuario.idArea.toString());
    this.profileForm.controls["fechaRegistro"].setValue(usuario.fechaRegistro.toString());
  }

  onClickSubmit(user: any) {
    this.userService.updateUser(user, this.id).subscribe(res => {
      this.router.navigate(['/']);
    }
    );
  }

}
