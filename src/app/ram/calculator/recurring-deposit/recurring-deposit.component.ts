import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recurring-deposit',
  templateUrl: './recurring-deposit.component.html',
  styleUrls: ['./recurring-deposit.component.css']
})
export class RecurringDepositComponent implements OnInit {
  recurringDepositForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.recurringDepositForm = this.fb.group({
      initialAmount: ['', [Validators.required]],
      interestRate: ['6', [Validators.required, Validators.max(20)]],
      selectMonths: ['0', [Validators.required]]

    })
  }

  recurringDepositSbmit():void{
    console.log('fom submit');
  }

}
