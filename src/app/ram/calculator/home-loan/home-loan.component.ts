import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateKey } from '@angular/platform-browser/src/browser/transfer_state';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit, AfterViewInit {

  homeLoanEMIForm: FormGroup;
  emailMessage: string;
  loanEMI: number;
  totalInterestPayable: number;
  totalPaymentPrincipalInterest: number;
  interestPercentage: string;
  totalEmiPrice: any[] = [];

  emiPay: any[] = [];
  principlePay: any[] = [];
  startDate: any[] = [];

  ngAfterViewInit() {
      
  }

  
// ============================
canvas: any;
ctx: any;
// =============================

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.homeLoanEMIForm = this.fb.group({
      loanAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(40)]],
      loanTerm: ['', [Validators.required, Validators.max(40)]]

    });
    

  }

 

  chartdrowMyRohitazad(data,data2, label1, label2) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: [label1, label2],
          datasets: [{
              label: '# of Votes',
              data: [data, data2],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }



  calulateHomeLoanEMI(): void {
    let loanAmount = this.homeLoanEMIForm.value.loanAmount;
    let numberOfMonths = this.homeLoanEMIForm.value.loanTerm * 12;
    let rateOfInterest = this.homeLoanEMIForm.value.interestRate;
    let monthlyInterestRatio = (rateOfInterest / 100) / 12;


    let top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    let bottom = top - 1;
    let sp = top / bottom;
    let emi = ((loanAmount * monthlyInterestRatio) * sp);

    console.log(emi);
    this.loanEMI = emi;

    let full = numberOfMonths * emi;
    let interest = full - loanAmount;
    this.totalInterestPayable = interest;
    this.totalPaymentPrincipalInterest = full;

    console.log('loan emi click');
    console.log(this.homeLoanEMIForm);
    console.log(this.homeLoanEMIForm.value);

    let int_pge = (interest / full) * 100;
    let r = (int_pge.toFixed(2) + " %");
    this.interestPercentage = r;
    console.log(int_pge);
    console.log(r);
    console.log('-------------------------------------------');
    let bb = parseInt(loanAmount);
    let int_dd = 0;
    let pre_dd = 0;
    let end_dd = 0;
    let rohitazad: any[] = [];
    for (let j = 1; j <= numberOfMonths; j++) {
      int_dd = bb * ((rateOfInterest / 100) / 12);
      // pre_dd = emi.toFixed(2) - int_dd.toFixed(2);
      // end_dd = bb - pre_dd.toFixed(2);
      //  rohitazad.push(j + '__'+bb.toFixed(2) + '__'+emi.toFixed(2)+ '__' +pre_dd.toFixed(2) + '__'+int_dd.toFixed(2)+ '___'+end_dd.toFixed(2)) ;
      // bb = bb - pre_dd.toFixed(2);



      pre_dd = emi - int_dd;
      end_dd = bb - pre_dd;
      rohitazad.push(
        {
          'PaymentNo': j,
          'BeginingBalance': bb,
          'EMI': emi,
          'Principal': pre_dd,
          'Interest': int_dd,
          'EndingBalance': end_dd
        }
      );

      this.emiPay.push(emi+int_dd);
      this.principlePay.push(pre_dd);
      this.startDate.push(j);

      bb = bb - pre_dd;
    }
    this.totalEmiPrice = rohitazad;
    
    
    this.chartdrowMyRohitazad(loanAmount,this.totalPaymentPrincipalInterest, 'Principal', 'Total Payment  (Principal + Interest)');
   
  }

}
