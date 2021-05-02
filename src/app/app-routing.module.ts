import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {GrillaComponent} from './components/grilla/grilla.component';
import {RegistroEmpleadosComponent} from './components/registro-empleados/registro-empleados.component';


const routes: Routes = [

    {path:'',component:GrillaComponent},
    {path:'registro',component:RegistroEmpleadosComponent},
    {path:'registro/:id',component:RegistroEmpleadosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
