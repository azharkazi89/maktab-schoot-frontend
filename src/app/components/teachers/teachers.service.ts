import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/all.models';
import { API_BASE } from '../_api-base';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private baseUrl = `${API_BASE}`+`/maktab`+`/teacher/`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Teacher[]> { return this.http.get<Teacher[]>(this.baseUrl); }
  get(id: number): Observable<Teacher> { return this.http.get<Teacher>(`${this.baseUrl}/${id}`); }
  create(dto: Teacher): Observable<Teacher> { return this.http.post<Teacher>(this.baseUrl, dto); }
  update(id: number, dto: Teacher): Observable<Teacher> { return this.http.put<Teacher>(`${this.baseUrl}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
}
