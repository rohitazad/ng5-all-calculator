import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ppf',
  templateUrl: './ppf.component.html',
  styleUrls: ['./ppf.component.css']
})
export class PpfComponent implements OnInit {
  ppfInterestRate: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ppfInterestRate = this.fb.group({
      depostiAmount: ['', [Validators.required, Validators.min(500), Validators.max(150000)]],
      financialYear: ['', [Validators.required]]

    })
  }

  ppfInterestRateCalc(){
    console.log('click to button sumbit');
    let depositAmount = this.ppfInterestRate.value.depostiAmount;
    let depositAmountWithInterset =  depositAmount;
    let fY = this.ppfInterestRate.value.financialYear;
    console.log(depositAmountWithInterset + '__' + fY);

    
    // var ppfFn = this.ppfCalculateFn(dFA, 1);
    // console.log(ppfFn);
    // https://ppf-calculator.in/result

    let depostiAmount;
    let objArray:any[] = [];
    let i;
    for(i=0; i<15; i++){

      let monthlyInterestRatio  = (7.8/100)/12;
      let totalIn = depositAmountWithInterset * monthlyInterestRatio * 12;
      let  finalAmount = totalIn + depositAmountWithInterset ;
      let actualAmount = 	finalAmount - totalIn;
      depositAmountWithInterset = finalAmount + depositAmount;
      objArray.push({
        'Year':i,
        'monthlyInterestRatio':monthlyInterestRatio,
        'interestEarned':totalIn,
        'closingBalance':finalAmount,
        'actualAmount':actualAmount,
        'amountDeposited':depositAmount,
        'openingBalance' : actualAmount - depositAmount

      })
    }
    console.log(objArray);

  }
  ppfCalculateFn(amount,intersetRate){
    let monthlyInterestRatio  = (intersetRate/100)/12;
    let totalIn = amount * monthlyInterestRatio * 12;
    let  finalAmount = totalIn + amount ;
    let actualAmount = 	finalAmount - totalIn;
    return {
      'totalIn': totalIn,
      'actualAmount': actualAmount,
      'finalAmount':finalAmount
    }
  }

  
  
  

}
