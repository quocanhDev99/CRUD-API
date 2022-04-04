import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }

  // formData: PaymentDetail = new PaymentDetail();
  readonly baseUrl = 'https://localhost:7283/api/PaymentDetail';

  postPaymentDetail(request: any) {
    return this.http.post(this.baseUrl, request);
  }

  getPaymentDetail(): Observable<any[]> {
    return this.http.get<PaymentDetail[]>(this.baseUrl);
  }

  getPaymentDetailId(paymentId: any): Observable<PaymentDetail> {
    return this.http.get<PaymentDetail>(`${this.baseUrl}/${paymentId}`);
  }

  updatePaymentDetailId(paymentId: any, request: any): Observable<PaymentDetail> {
    return this.http.put<PaymentDetail>(`${this.baseUrl}/${paymentId}`, request);
  }

  deletePaymentDetail(paymentID: any): Observable<any[]> {
    return this.http.delete<PaymentDetail[]>(`${this.baseUrl}/${paymentID}`);
  }
}
