import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-loan',
  templateUrl: './car-loan.component.html',
  styleUrls: ['./car-loan.component.css']
})
export class CarLoanComponent implements OnInit {
  carLoanEMIForm: FormGroup;
  emailMessage: string;
  loanEMI:number;
  totalInterestPayable:number;
  totalPaymentPrincipalInterest:number;
  interestPercentage:string;
  totalEmiPrice:any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.carLoanEMIForm = this.fb.group({
      loanAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(30)]],
      loanTerm: ['', [Validators.required, Validators.max(15)]]

    })
  }

  calulateCarLoanEMI():void{
    let loanAmount = this.carLoanEMIForm.value.loanAmount;
    let numberOfMonths = this.carLoanEMIForm.value.loanTerm*12;
    let rateOfInterest = this.carLoanEMIForm.value.interestRate;
    let monthlyInterestRatio = (rateOfInterest/100)/12;


    let top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
    let bottom = top -1;
    let sp = top / bottom;
    let emi = ((loanAmount * monthlyInterestRatio) * sp);

    console.log(emi);
    this.loanEMI = emi;

    let full = numberOfMonths * emi;
    let interest = full - loanAmount;
    this.totalInterestPayable = interest;
    this.totalPaymentPrincipalInterest = full;
    
    console.log('car  emi click');
    console.log(this.carLoanEMIForm);
    console.log(this.carLoanEMIForm.value);

    let int_pge =  (interest / full) * 100;
    let r = (int_pge.toFixed(2)+" %");
    this.interestPercentage = r;
    console.log(int_pge);
    console.log(r);
    console.log('-------------------------------------------');
    let bb=parseInt(loanAmount);
    let int_dd =0;
    let pre_dd=0;
    let end_dd=0;
    let rohitazad:any[]=[];
    for (let j=1;j<=numberOfMonths;j++){
      int_dd = bb * ((rateOfInterest/100)/12);
      
      pre_dd = emi - int_dd;
      end_dd = bb - pre_dd;
       rohitazad.push(
         {
           'PaymentNo':j, 
           'BeginingBalance':bb,
           'EMI':emi,
           'Principal' :pre_dd,
           'Interest':int_dd,
           'EndingBalance':end_dd
        }
       ) ;
      bb = bb - pre_dd;
    }
    this.totalEmiPrice = rohitazad;
    console.log(rohitazad);
		
  }

}
