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

  

  todosUrl:string = 'http://localhost:3000/user';
  //todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  newUser(usuario:Usuario):Observable<Usuario>{

    console.log("pase por service")

    //console.log("hola");
    return this.http.post<Usuario>(this.todosUrl,usuario,httpOptions);

  }

  updateUser(data: any):Observable<any> {
   //  console.log(data);
     return this.http.put<any>(this.todosUrl,data,httpOptions);
  }



  getUsers():Observable<any> {

    return this.http.get<any>(this.todosUrl);

  }

  delete(id) {
    return this.http.delete<any>(this.todosUrl+'/'+id);
  }


  getUserById(id) {
    return this.http.get<any>(this.todosUrl+'/'+id);

  }



}
