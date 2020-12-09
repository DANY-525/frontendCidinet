import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import{Todo} from 'src/app/models/Todo';

import{TodoService} from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo;
  @Output()deleteTodo:EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }


  //set Dynamic classes

  setClases(){
    let classes = {
      todo:true,
      'is-complete':this.todo.completed
    }
    return classes;
  }

  //on Toggle

  onToggle(todo){
    //toggle in UI
    todo.completed = !todo.completed;
    //Toggle on devServerTarget
    this.todoService.toggleCompleted(todo).subscribe(todo =>{

      console.log(todo) 


    });
  
  }




  onDelete(todo:Todo){

    this.deleteTodo.emit(todo)
    //this.todos = this.todo.filter(t => t.id !== todo.id);

    console.log("hello world")
   // this.delete.emi
  }


}
