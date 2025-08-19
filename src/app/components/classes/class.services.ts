import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolClass } from '../models/all.models'; // adjust path
import { API_BASE } from '../_api-base';
@Injectable({
  providedIn: 'root'  // makes it globally injectable
})
export class ClassService {
   private baseUrl = `${API_BASE}`+`/maktab`+`/attendance/`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(this.baseUrl);
  }

  getById(id: number): Observable<SchoolClass> {
    return this.http.get<SchoolClass>(`${this.baseUrl}/${id}`);
  }

  create(schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.http.post<SchoolClass>(this.baseUrl, schoolClass);
  }

  update(id: number, schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.http.put<SchoolClass>(`${this.baseUrl}/${id}`, schoolClass);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
