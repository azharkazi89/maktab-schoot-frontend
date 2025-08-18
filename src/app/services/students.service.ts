import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/all.models';
import { API_BASE } from './_api-base';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = `${API_BASE}`+`/maktab`+`/student/`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Student[]> { return this.http.get<Student[]>(this.baseUrl); }
  get(id: number): Observable<Student> { return this.http.get<Student>(`${this.baseUrl}${id}`); }
  create(dto: Student): Observable<Student> { return this.http.post<Student>(this.baseUrl, dto); }
  update(id: number, dto: Student): Observable<Student> { return this.http.put<Student>(`${this.baseUrl}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}${id}`); }
}
