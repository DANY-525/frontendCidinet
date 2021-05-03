import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent {
  displayedColumns: string[] = ['id',
    'primerNombre',
    'segundoNombre',
    'primerApellido',
    'Identificacion',
    'correo',
    'idArea',
    'idPais',
    'tipoId',
    'fechaIngreso',
    'fechaRegistro',
    'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService) {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(req => {
      //console.log(req)
      localStorage.setItem('usuarios',JSON.stringify(req));
      this.dataSource = new MatTableDataSource(req);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteById(id) {

    console.log(id+"pas");


    var answer = window.confirm("Delete data?");
    if (answer) {
      this.userService.delete(id).subscribe(res => {

        console.log(res)
       this.getUsers();
      });
    }
   
  
  }

  consultaArea(id:number) {
    let retorno = ""
    if (id == 0) {
      retorno = "Administracion";
    }
    if (id == 1) {
      retorno = "Financiera";
    }
    if (id == 2) {
      retorno = "Compras";
    }

    if (id == 3) {
      retorno = "Infraestructura";
    }

    if (id == 4) {
      retorno = "Operacion";
    }
    return retorno;
  }

  consultaPais(id:number) {
    let retorno = "";
    if (id == 0) {
      retorno = "Colombia";
    }
    if (id == 1) {
      retorno = "Usa";

    }
    return retorno;
  }

  consultaTipoId(id:number) {
    let retorno = "";
    if (id == 0) {
      retorno = "Cedula";
    }
    if (id == 1) {
      retorno = "Extrangeria";

    }
    if (id == 2) {
      retorno = "Pasaporte";

    }
    if (id == 3) {
      retorno = "Permiso especial";

    }
    return retorno;
  }
  formatearFecha(fechaformater:string) {
    fechaformater = moment(fechaformater).format('DD/MM/YYYY HH:mm:ss')
    return fechaformater;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}