import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.css']
})
export class IncomeTaxComponent implements OnInit {
  incomeTaxForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.incomeTaxForm = this.fb.group({
      loanAmount: ['', [Validators.required]]

    })
  }

  calulateIncomeTax(){
    console.log('yes click to tax');
  }

}
