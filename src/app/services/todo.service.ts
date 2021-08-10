import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.class';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public API: string = 'https://jsonplaceholder.typicode.com/users/1/todos';

  constructor(public http: HttpClient) {}

  getAllTodo(): Observable<Todo[]> {
    // trả về 1 observable có kiểu dữ liệu là Todo
    return this.http.get<Todo[]>(this.API);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.API}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.API}?id=${id}`);
  }

  handleError(err: any) {
    if (err.error instanceof Error) {
      // thuộc kiểu dữ liệu
      console.log(`Client Side error: ${err.error.message}`);
    } else {
      console.log(`Server Side error: ${err.status}`);
    }
  }
}
