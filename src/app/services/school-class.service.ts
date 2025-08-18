import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolClass } from '../models/school-class.model';
import { API_BASE } from './_api-base';

@Injectable({ providedIn: 'root' })
export class SchoolClassService {
  private baseUrl = `${API_BASE}`+`/maktab`+`/class/`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<SchoolClass[]> { return this.http.get<SchoolClass[]>(this.baseUrl); }

