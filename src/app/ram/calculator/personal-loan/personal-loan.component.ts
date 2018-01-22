import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  styleUrls: ['./personal-loan.component.css']
})
export class PersonalLoanComponent implements OnInit {
  personalLoanEMIForm: FormGroup;
  emailMessage: string;
  loanEMI:number;
  totalInterestPayable:number;
  totalPaymentPrincipalInterest:number;
  interestPercentage:string;
  totalEmiPrice:any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.personalLoanEMIForm = this.fb.group({
      loanAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(40)]],
      loanTerm: ['', [Validators.required, Validators.max(40)]]

    })
  }

  calulatePersonalEMI():void{
    let loanAmount = this.personalLoanEMIForm.value.loanAmount;
    let numberOfMonths = this.personalLoanEMIForm.value.loanTerm*12;
    let rateOfInterest = this.personalLoanEMIForm.value.interestRate;
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
    
    console.log('loan emi click');
    console.log(this.personalLoanEMIForm);
    console.log(this.personalLoanEMIForm.value);

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
      // pre_dd = emi.toFixed(2) - int_dd.toFixed(2);
      // end_dd = bb - pre_dd.toFixed(2);
      //  rohitazad.push(j + '__'+bb.toFixed(2) + '__'+emi.toFixed(2)+ '__' +pre_dd.toFixed(2) + '__'+int_dd.toFixed(2)+ '___'+end_dd.toFixed(2)) ;
      // bb = bb - pre_dd.toFixed(2);
    


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
