import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8080/ListWave-1.0/api/list/'; // API-Endpoint

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get(this.apiUrl)
      //      .get<Task[]>(this.apiUrl)
      .pipe<Task[]>(map((data:any) => data))
      ;
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }

  deleteUsers(tasks: Task[]): Observable<Task[]> {
    return forkJoin(
      tasks.map((tasks) =>
        this.http.delete<Task>(`${this.apiUrl}/${tasks.id}`)
      )
    );
  }


}
