import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolClass } from '../models/all.models';
import { API_BASE } from '../_api-base';

@Injectable({ providedIn: 'root' })
export class SchoolClassService {
  private baseUrl = `${API_BASE}` + `/class/`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(this.baseUrl);
  }
}

