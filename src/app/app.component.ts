import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from './model/todo.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public title!: string;
  public completed: boolean = false;
  public todo!: Todo;
  public subscription: Subscription = new Subscription();

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Do getAllTodo là kiểu observable nên ta sẽ gọi 1 phương thức lắng nghe là subscribe
    this.subscription = this.todoService.getAllTodo().subscribe(
      (data) => {
        // data: là dữ liệu nhận từ server
        this.todos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAddTodo() {
    let todo = new Todo(this.title, this.completed);
    this.subscription = this.todoService.addTodo(todo).subscribe(
      (data) => {
        this.todos.push(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEditTodo(item: Todo) {
    this.todo = item;
  }

  onUpdateTodo() {
    this.subscription = this.todoService.updateTodo(this.todo).subscribe(
      (data) => {
        let index = this.getIndex(data.id);
        this.todos[index] = data;
      },
      () => {}
    );
  }

  onDeleteTodo(id: number) {
    console.log(id);

    this.subscription = this.todoService.deleteTodo(id).subscribe(
      (data) => {
        let index = this.getIndex(data.id);
        this.todos.splice(index, 1);
      },
      () => {}
    );
  }

  getIndex(id: number): number {
    let result = 0;
    this.todos.forEach((item, index) => {
      if (item.id == id) {
        result = index;
      }
    });
    return result;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
