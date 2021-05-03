import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { EditEmpleadosComponent } from './components/edit-empleados/edit-empleados.component';

import {GrillaComponent} from './components/grilla/grilla.component';
import {RegistroEmpleadosComponent} from './components/registro-empleados/registro-empleados.component';


const routes: Routes = [

    {path:'',component:GrillaComponent},
    {path:'registro',component:RegistroEmpleadosComponent},
    {path:'registro/:id',component:RegistroEmpleadosComponent},
    {path:'edit/:id',component:EditEmpleadosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
