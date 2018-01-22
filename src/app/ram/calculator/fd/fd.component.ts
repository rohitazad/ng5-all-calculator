import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-fd',
  templateUrl: './fd.component.html',
  styleUrls: ['./fd.component.css']
})
export class FdComponent implements OnInit {
  fixedDepositForm: FormGroup;
  totalInterest:number;
  finalAmount:number;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fixedDepositForm = this.fb.group({
      depositAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(40)]],
      loanTerm: ['', [Validators.required, Validators.max(40)]]

    })
  }

  calculateFixedDeposit():void{
    console.log(this.fixedDepositForm.value);
    let depositAmount = this.fixedDepositForm.value.depositAmount;
    let interestRate = this.fixedDepositForm.value.interestRate;
    let numberOfMonth = (this.fixedDepositForm.value.loanTerm);
    
    console.log('depositAmount'+depositAmount);
    console.log('interestRate'+interestRate);
    console.log('numberOfMonth'+numberOfMonth);

    let totalValue = this.calculateFd(depositAmount,interestRate,numberOfMonth);

    console.log(totalValue);

    
    this.totalInterest = 	totalValue - depositAmount;
    this.finalAmount = totalValue  ;


  }

  calculateFd(PV:number,i:number,n:number){
    let x=(1+i/100)
    let FV = PV*(Math.pow(x,n));
    return FV; 
  }

}
