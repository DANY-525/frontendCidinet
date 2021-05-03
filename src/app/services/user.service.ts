import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{Usuario} from '../../app/models/Usuario';
import{Observable} from 'rxjs';

const httpOptions = {
  headers: new  HttpHeaders({
    'Content-Type':'application/json'

  })

}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  todosUrl:string = 'http://localhost:1990/Usuarios';
  //todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  getUsers():Observable<any> {

    return this.http.get<any>(this.todosUrl);

  }

  newUser(usuario:Usuario):Observable<Usuario>{

    console.log("pase por service")

    //console.log("hola");
    return this.http.post<Usuario>(this.todosUrl+"/addUser",usuario,httpOptions);

  }

  updateUser(data: any,id):Observable<any> {
   //  console.log(data);
     return this.http.put<any>(this.todosUrl+`/${id}`,data,httpOptions);
  }




  delete(id) {
    return this.http.delete<any>(this.todosUrl+`/${id}`,httpOptions);
  }


  getUserById(id) {
    return this.http.get<any>(this.todosUrl+'/'+id);

  }



}
