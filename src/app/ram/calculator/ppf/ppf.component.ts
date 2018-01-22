import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ppf',
  templateUrl: './ppf.component.html',
  styleUrls: ['./ppf.component.css']
})
export class PpfComponent implements OnInit {
  ppfInterestRate: FormGroup;
  ppfMaturityAmount:number;
  ppfTotalDeposit:number;
  earnTotalProfit:number;
  ppfAmountArray:any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ppfInterestRate = this.fb.group({
      depostiAmount: ['', [Validators.required, Validators.min(500), Validators.max(150000)]],
      financialYear: ['2017-18', [Validators.required]],
      interestRate: ['7.8']

    })
  }

  ppfInterestRateCalc(){
    this.ppfMaturityAmount = 0;
    this.ppfTotalDeposit = 0;
    this.earnTotalProfit = 0;
    this.ppfAmountArray = [];

    console.log('click to button sumbit');
    let depositAmount = this.ppfInterestRate.value.depostiAmount;
    let depositAmountWithInterset =  depositAmount;
    let fY = this.ppfInterestRate.value.financialYear;
    console.log(depositAmountWithInterset + '__' + fY);

    

    let depostiAmount;
    
    let i;
    for(i=0; i<15; i++){

      let monthlyInterestRatio  = (7.8/100)/12;
      let totalIn = depositAmountWithInterset * monthlyInterestRatio * 12;
      let  finalAmount = totalIn + depositAmountWithInterset ;
      let actualAmount = 	finalAmount - totalIn;
      depositAmountWithInterset = finalAmount + depositAmount;
      this.ppfAmountArray.push({
        'Year':i+1,
        'monthlyInterestRatio':monthlyInterestRatio,
        'interestEarned':totalIn,
        'closingBalance':finalAmount,
        'actualAmount':actualAmount,
        'amountDeposited':depositAmount,
        'openingBalance' : actualAmount - depositAmount

      })
      this.ppfMaturityAmount = finalAmount;
      this.ppfTotalDeposit = depositAmount*15;
      this.earnTotalProfit = this.ppfMaturityAmount-this.ppfTotalDeposit;
    }
    console.log(this.ppfAmountArray);

  }
  
  
  
  

}
