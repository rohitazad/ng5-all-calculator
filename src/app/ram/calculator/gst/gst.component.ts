import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  gstClcForm: FormGroup;
  OriginalCost:number;
  GST:number;
  GSTPrice:number;
  NetPrice:number;
  showBlock:boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.gstClcForm = this.fb.group({
      initialAmount: ['', [Validators.required]],
      rateOfGst: ['', [Validators.required, Validators.min(0), Validators.max(28)]]

    })
    
  }

  private calculateGst(whatDo:string){
    if(whatDo === 'add'){
      this.OriginalCost = this.gstClcForm.value.initialAmount;
      this.GSTPrice = (this.gstClcForm.value.initialAmount *  this.gstClcForm.value.rateOfGst)/100;
      this.GST = this.gstClcForm.value.rateOfGst;
      this.NetPrice = this.gstClcForm.value.initialAmount + this.GSTPrice;
      this.showBlock = true;
    }else if(whatDo === 'mines'){
      this.OriginalCost = this.gstClcForm.value.initialAmount;
      this.GSTPrice = this.gstClcForm.value.initialAmount - (this.gstClcForm.value.initialAmount *  
        (100/(100 + this.gstClcForm.value.rateOfGst)));
      
      this.GST = this.gstClcForm.value.rateOfGst;
      this.NetPrice = this.gstClcForm.value.initialAmount - this.GSTPrice;
      this.showBlock = true;
    }
    
  }

  addGst(){
    console.log('click to gst form addGst ', this.gstClcForm.value);
    this.calculateGst('add');
  }
  subtractGst(){
    console.log('click to gst form subtractGst ', this.gstClcForm.value);
    this.calculateGst('mines');

  }

}
