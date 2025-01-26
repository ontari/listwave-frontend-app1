import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8080/ListWave-1.0/api/list/'; // API-Endpoint

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createData(record: any): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }

  updateData(id: number, record: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, record);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
