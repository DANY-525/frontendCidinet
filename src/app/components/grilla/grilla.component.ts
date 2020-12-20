import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/services/user.service';

/*export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}*/

/** Constants used to fill up our data base. */
/*const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];*/




@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent  {
  displayedColumns: string[] = ['id',
    'primerNombre',
    'segundoNombre',
    'primerApellido',
    'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {

        this.getUsers();
    // Create 100 users
   /* const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));*/

    // Assign the data to the data source for the table to render
  }

  getUsers() {
    this.userService.getUsers().subscribe(req => {
      
    this.dataSource = new MatTableDataSource(req);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

   });
  }

  deleteById(id){

    this.userService.delete(id).subscribe(res =>{

      this.getUsers();

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
