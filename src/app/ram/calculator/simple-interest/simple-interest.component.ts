import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-interest',
  templateUrl: './simple-interest.component.html',
  styleUrls: ['./simple-interest.component.css']
})
export class SimpleInterestComponent implements OnInit {

  simpleInterestForm: FormGroup;
  totalInterest:number;
  finalAmount:number;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.simpleInterestForm = this.fb.group({
      depositAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(40)]],
      loanTerm: ['', [Validators.required, Validators.max(40)]]

    })
  }

  simpleInterestDeposit():void{
    console.log(this.simpleInterestForm.value);
    let depositAmount = this.simpleInterestForm.value.depositAmount;
    let interestRate = this.simpleInterestForm.value.interestRate;
    let numberOfMonth = (this.simpleInterestForm.value.loanTerm)*12;
    let monthlyInterestRatio  = (interestRate/100)/12;

    console.log('depositAmount'+depositAmount);
    console.log('interestRate'+interestRate);
    console.log('numberOfMonth'+numberOfMonth);


    let totalIn = depositAmount * monthlyInterestRatio * numberOfMonth;
    this.totalInterest = 	totalIn;
    this.finalAmount = totalIn + depositAmount ;
  }

}
