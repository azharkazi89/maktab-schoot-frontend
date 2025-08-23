// src/app/services/attendance.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attendance} from '../models/all.models';
import {API_BASE} from '../_api-base';

@Injectable({providedIn: 'root'})
export class AttendanceService {
  private baseUrl = `${API_BASE}` + `/maktab` + `/attendance/`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.baseUrl);
  }

  create(dto: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.baseUrl, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  saveAttendance(request: object):
    Observable<Attendance> {
    return this.http.post<Attendance>(this.baseUrl + `saveAttendance`, request);
  }
}
