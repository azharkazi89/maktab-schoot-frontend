import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../_api-base';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) {}
  getTopStudents(): Observable<any[]> { return this.http.get<any[]>(`${API_BASE}`+`/maktab`+`/reports/attendance/top5`); }
  getFeePerClass(): Observable<any[]> { return this.http.get<any[]>(`${API_BASE}`+`/maktab`+`/reports/fees/per-class`); }
  getTeacherWorkload(): Observable<any[]> { return this.http.get<any[]>(`${API_BASE}`+`/maktab`+`/reports/teachers/workload`); }
  getGuardiansWithPendingFees(): Observable<any[]> { return this.http.get<any[]>(`${API_BASE}`+`/maktab`+`/reports/guardians/pending-fees`); }
  getAttendancePerSubject(): Observable<any[]> { return this.http.get<any[]>(`${API_BASE}`+`/maktab`+`/reports/subjects/attendance`); }
}
