import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/services/user.service';
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
      console.log(req)
      this.dataSource = new MatTableDataSource(req);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteById(id) {
    var answer = window.confirm("Delete data?");
    if (answer) {
      this.userService.delete(id).subscribe(res => {
        this.getUsers();
      });
    }
    else {
      //some code
    }

  
  }



  consultaArea(id) {
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

  consultaPais(id) {
    let retorno = "";
    if (id == 0) {
      retorno = "colombia";
    }
    if (id == 1) {
      retorno = "usa";

    }
    return retorno;
  }


  consultaTipoId(id) {
    let retorno = "";
    if (id == 0) {
      retorno = "cedula";
    }
    if (id == 1) {
      retorno = "extrangeria";

    }
    if (id == 2) {
      retorno = "pasaporte";

    }
    if (id == 3) {
      retorno = "permiso especial";

    }
    return retorno;
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
