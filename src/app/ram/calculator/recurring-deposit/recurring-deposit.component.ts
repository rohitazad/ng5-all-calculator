import { Component, OnInit } from '@angular/core';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recurring-deposit',
  templateUrl: './recurring-deposit.component.html',
  styleUrls: ['./recurring-deposit.component.css']
})
export class RecurringDepositComponent implements OnInit {
  recurringDepositForm: FormGroup;
  maturityAmount:number;
  totalInterst:number;
  totalPaymentPrincipal:number;
  tableData:any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.recurringDepositForm = this.fb.group({
      initialAmount: ['', [Validators.required, Validators.min(500)]],
      interestRate: ['6', [Validators.required, Validators.max(20)]],
      selectMonths: ['0', [Validators.required]]

    })
  }

  recurringDepositSbmit():void{
    this.tableData = [];
    console.log('fom submit');
    let myStartDate, myStartMonth, myStartday, myStartYear, amtValue, thisMonthDays, maturityValue, lastDateofMonthSTART, startDateofMonthSTART;
    let monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let shortMonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let monthStartArray =1;
    let baseTotalDays = 365;
    let inputMonth, inputDays, addMonth, addDateDays, addDays, leapYr, captchupAmt, quarters, iterations;
    let eachIntAmt = 0;
    let eachTotalAmt = 0;
    let totalIntAmt = 0;
    let lastCount, lastShortTermCount;
    let FDint, myLastDay;
    let plusMonth = 0;
    let flag = true;
    let lastAdd = true;
    let catchUpdate = 0;
    let withAccrual = true;
    let ROI;
    let intAmtValue=0;
    let intAmtValueNew = 0;
    let totalIntNew = 0;
    let mat = 0;



    amtValue= this.recurringDepositForm.value.initialAmount; 
    let rdPeriod =this.recurringDepositForm.value.selectMonths;
    let interestRate= this.recurringDepositForm.value.interestRate;
    ROI = (interestRate/100);
    
    let inpuVal = amtValue;	



    var startDate = new Date();//alert("startDate "+startDate);
    myStartDate = startDate.getDate(); 	// Day of the month
    myStartMonth = startDate.getMonth() + 1; //alert("myStartMonth "+myStartMonth);// Month with a zero index
    myStartday = startDate.getDay(); 		// Day of the week
    myStartYear = startDate.getFullYear(); // The "full" year, e.g. 2011		
    var firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    var lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    //var lastDayWithSlashes = (lastDay.getDate()) + '/' + (lastDay.getMonth() + 1) + '/' + lastDay.getFullYear();	
    lastDateofMonthSTART = lastDay.getDate(); 
    startDateofMonthSTART = firstDay.getDate();
    
    leapYr = myStartYear % 4;
    
    if (leapYr == 0) {
      baseTotalDays = 366;
      monthArray[1] = 29;
    }
    else {
        baseTotalDays = 365;
        monthArray[1] = 28;
    }	


    var term = rdPeriod;
    var days = myStartDate;
    var monthEnd = monthArray[myStartMonth-1]; 
    var iteration = 4 ;

    console.log(startDateofMonthSTART);
    console.log(lastDateofMonthSTART);

    var a = (term/3);
	
	for(var x = 0; x < a; x++){	
 		
		intAmtValueNew = 0;
				
		for(var y = 0; y < iteration; y++){			
			
			var prevDays = ((monthArray[myStartMonth - 1]) - myStartDate );
			var nextDays = ((monthArray[myStartMonth - 1]) - myStartDate )+1;
						
			amtValue = Math.round(amtValue);
			if (y == 0)
			{				
				myStartMonth = myStartMonth-1;
				leapYr = myStartYear % 4;
    			if (leapYr == 0) {
        			baseTotalDays = 366;
        			monthArray[1] = 29;
				}
				else {
					baseTotalDays = 365;
					monthArray[1] = 28;
				}
				
				var currentMonthDays = monthArray[myStartMonth];
	   			var beforeDays = 0;
	   			//var afterDays = ((monthArray[myStartMonth]) - myStartDate)+1;					
				if (myStartMonth == 1 && leapYr != 0 && myStartDate == 29 ){
					var afterDays = ((monthArray[myStartMonth]) - myStartDate)+2
				}
				else {					
					var afterDays = ((monthArray[myStartMonth]) - myStartDate)+1	
				}
								
	   			var totaldays = beforeDays +afterDays;   
				if(myStartMonth == 2)	{				
					intAmtValue = Math.round((amtValue*afterDays*ROI)/baseTotalDays);						
				}
				else {						
					intAmtValue = ((amtValue*afterDays*ROI)/baseTotalDays);	
				}
				
				intAmtValueNew+= intAmtValue;
				
				myStartMonth = myStartMonth + 1; 
				if (myStartMonth >= 12) {
            		myStartMonth = 0;
            		myStartYear = myStartYear + 1;
       			}				
			}
						
			else if (y == 3)
			{	
				leapYr = myStartYear % 4;
				if (leapYr == 0) {
        			baseTotalDays = 366;
        			monthArray[1] = 29;
				}
				else {
					baseTotalDays = 365;
					monthArray[1] = 28;
				}			
				
				var currentMonthDays = monthArray[myStartMonth];
	   			var beforeDays = (myStartDate - monthStartArray);
	   			var afterDays = 0;	
	   			var totaldays = beforeDays +afterDays;  				
				intAmtValue=0;
				if(myStartMonth == 1 && myStartDate > currentMonthDays)	{					
					intAmtValue = ((amtValue*(beforeDays-1)*ROI)/baseTotalDays);	
				}
				else {				
					intAmtValue = ((amtValue*beforeDays*ROI)/baseTotalDays);										
				}								
				intAmtValueNew+= intAmtValue;								
				amtValue= amtValue+inpuVal+intAmtValueNew;							
			}
			
			else 
			{		
			 	leapYr = myStartYear % 4;
				if (leapYr == 0) {
					baseTotalDays = 366;
					monthArray[1] = 29;
				}
				else {
				baseTotalDays = 365;
				monthArray[1] = 28;
				}
												
				var currentMonthDays = monthArray[myStartMonth];
	   			var beforeDays = (myStartDate - monthStartArray);
	   			var afterDays = ((monthArray[myStartMonth]) - myStartDate)+1;	
	   			var totaldays = beforeDays +afterDays;    	
				/*if(myStartMonth == 2)	{
					intAmtValue = Math.round((((amtValue*beforeDays)+((amtValue+inpuVal)*afterDays))*ROI)/baseTotalDays);	
				}*/
				if(myStartMonth == 1 && myStartDate > currentMonthDays)	{					
					intAmtValue = ((((amtValue*(beforeDays-1))+((amtValue+inpuVal)*(afterDays+1)))*ROI)/baseTotalDays);	
				}
				/*else if(myStartMonth == 2) {
					intAmtValue = ((((amtValue*beforeDays)+((amtValue+inpuVal)*afterDays))*ROI)/baseTotalDays).toFixed(2);	
				}*/
				else {
					intAmtValue = ((((amtValue*beforeDays)+((amtValue+inpuVal)*afterDays))*ROI)/baseTotalDays);						
				}					
								
				if(myStartMonth == 2) {
					intAmtValueNew+=  intAmtValue;		
					intAmtValueNew = Math.round(intAmtValueNew);					
				}
				else {
					intAmtValueNew+= intAmtValue;					
				}
				amtValue= amtValue+inpuVal;
				myStartMonth = myStartMonth + 1; 
				if (myStartMonth >= 12) {
            		myStartMonth = 0;
            		myStartYear = myStartYear + 1;
       			}					
			}
						
		}
		
		myStartMonth = myStartMonth+1;		
		
		var totalInt = Math.round(intAmtValueNew);		
		mat = Math.round(amtValue - inpuVal);			
    totalIntNew+= totalInt;
    
    let totalPrincipalAmount =  mat - totalInt;
    this.tableData.push(
      {'myStartMonth':myStartMonth,'totalInt':totalInt,'matAmount':mat,'principleAmount':totalPrincipalAmount}
    );
	}
		console.log(this.tableData);
    var finalMat =  ((inpuVal*rdPeriod)+totalIntNew);	
      //console.log(finalMat);
    this.maturityAmount = finalMat;
    this.totalInterst = totalIntNew;
    this.totalPaymentPrincipal = this.recurringDepositForm.value.initialAmount * this.recurringDepositForm.value.selectMonths
  }

}
