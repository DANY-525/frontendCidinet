import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{Todo} from '../../app/models/Todo';
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

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }




  addTodo(todo:Todo):Observable<Todo>{

    return this.http.post<Todo>(this.todosUrl,todo,httpOptions);

  }



  /*getTodos():Observable<Todo[]>{
      return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`); 
  }*/

  
  
  /*//deleteTodo
  deleteTodo(todo:Todo):Observable<Todo>{
    //remove from UI
    const url =`${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url,httpOptions);


  }



  //Toggle competed status

  toggleCompleted(todo:Todo):Observable<any>{
         const url =`${this.todosUrl}/${todo.id}`;

         return this.http.put(url,todo,httpOptions);
    
  }

*/






}
