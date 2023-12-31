import { Component } from '@angular/core';
import {PaymentService} from "../../share/service/payment/payment.service";
import {PaymentRequest} from "../../share/model/request/payment-request.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BillService} from "../../share/service/bill/bill.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  isLoading:boolean = false;

  constructor(
      private readonly service: PaymentService,
      private readonly billService: BillService,
      private readonly route: ActivatedRoute,
      private readonly router:Router
  ) {}

  ngOnInit(): void{
    this.route.params.subscribe({
      next: (params: Params): void => {
        if (params["id"]) {
          this.getBillById(params["id"]);
        }
      }
    })
  }

  dueDate: Date = new Date('2023-08-30');
  amount: number = 0;

  paymentRequest: PaymentRequest = {
    umkmId: '',
    billId: ''
  }
  getBillById(id: string): void{
    this.billService.getById(id).subscribe({
      next: res => {
        this.paymentRequest.billId = res.data.id;
        this.dueDate = res.data.dueDate;
        this.amount = res.data.debt;
        this.paymentRequest.umkmId = res.data.umkmId;
      }
    })
  }

  createPayment() {
    this.isLoading = true;
    this.service.create(this.paymentRequest).subscribe({
        next: res => {
          const newTab = window.open(res.data.snapUrl, '_blank');
          if (newTab) {
            newTab.focus();
          } else {
            console.error("Failed to open new tab");
          }
          this.router.navigateByUrl("/debtor/bill");
        },
        error: (error) => {
          this.router.navigateByUrl("/debtor/bill");
          Swal.fire(
            'Error',
            "Payment failed",
            'error'
          );
        }
    })
  }
}
