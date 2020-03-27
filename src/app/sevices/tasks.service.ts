import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TasksService {
  constructor(private readonly http: HttpClient) { }

  getCredentials(data: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/credentials?uname=' + data.uname + '&password=' + data.password);
  }
  changePassword(id: string, data: any): Observable<any> {
    let heads = new HttpHeaders();
    heads.append("Content-Type", "application/json");
    return this.http.put("http://localhost:3000/credentials/" + id, data, { headers: heads })
  }
  getTasks(id: string): Observable<any> {
    return this.http.get("http://localhost:3001/tasks/" + id);
  }
  getAllTasks(): Observable<any> {
    return this.http.get("http://localhost:3001/tasks");
  }
  pushTasks(data: any): Observable<any> {
    let heads = new HttpHeaders();
    heads.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3001/tasks', data, { headers: heads });
  }
  editTask(id: string, data: any): Observable<any> {
    let heads = new HttpHeaders();
    heads.append("Content-Type", "application/json");
    return this.http.put("http://localhost:3001/tasks/" + id, data, { headers: heads });
  }
  getToast(id: string): Observable<any> {
    return this.http.get("http://localhost:3000/" + id);
  }
}
