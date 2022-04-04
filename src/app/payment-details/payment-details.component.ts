import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  dataList: any[] = [];
  payment: PaymentDetail = {} as PaymentDetail;
  paymentForm: FormGroup;
  submitted: boolean = false;
  actionBtn: string = 'Submit';
  showBtn: boolean = false;
  disableUpdate: boolean = false;
  disableSave: boolean = false;



  constructor(
    private service: PaymentDetailService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  get f() { return this.paymentForm.controls };

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      securityCode: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
    this.getListPD();
  }

  // Get API
  private getListPD() {
    this.service.getPaymentDetail()
      .subscribe(res => {
        this.dataList = res;
        console.log(res, 'log thu');
      });
  }

  public getValueId(paymentId: any) {
    this.disableUpdate = true;
    this.disableSave = true;
    this.service.getPaymentDetailId(paymentId)
      .subscribe(res => {
        this.payment = res;
        console.log(res, 'log id');
      });
    this.f.cardOwnerName.setValue(this.payment.cardOwnerName);
    this.f.cardNumber.setValue(this.payment.cardNumber);
    this.f.securityCode.setValue(this.payment.securityCode);
    this.f.expirationDate.setValue(this.payment.expirationDate);
  }

  // Execute
  public onSubmit() {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }
    this.service.postPaymentDetail(this.paymentForm.value)
      .subscribe(res => {
        this.toastr.success('Save Information Successfully!');
        this.paymentForm.reset();
      },
        error => {
          this.toastr.error('Save Information Failed!');
        }
      );
  }

  public onUpdate() {
    this.disableSave = false;
    this.service.updatePaymentDetailId(this.payment.payMentDetailId, this.paymentForm.value)
      .subscribe(() => {
        this.toastr.success('Update Information Successfully!');
        this.paymentForm.reset();
      }, error => {
        this.toastr.error('Update Information Failed!');
      })
  }

  public onDelete(id: any) {
    this.service.deletePaymentDetail(id)
      .subscribe(res => {
        this.toastr.error('Deleted Successful!');
        this.getListPD();
      },
        error => {
          this.toastr.error('Something went wrong');
        })
  }
}
