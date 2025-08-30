import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fee, BatchFeeRequest, BatchFeeResponse} from '../models/all.models';
import { API_BASE } from '../_api-base';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private baseUrl = `${API_BASE}`+`/fee`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Fee[]> { return this.http.get<Fee[]>(this.baseUrl); }
  create(dto: Fee): Observable<Fee> { return this.http.post<Fee>(this.baseUrl, dto); }
  delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  assignFees(request: BatchFeeRequest): Observable<BatchFeeResponse> {
      return this.http.post<BatchFeeResponse>(this.baseUrl+`/updateStudentFees`, request);
    }
}
