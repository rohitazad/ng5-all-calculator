import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.css']
})
export class IncomeTaxComponent implements OnInit {
  incomeTaxForm: FormGroup;

  hraexemptionInnerHTML;
  nettaxableincomeInnerHTML;
  incometaxpayableInnerHTML;
  incometaxpayableboldInnerHTML;
  totalIncomeMySalary;
  deductionsAmount;
  showToResult:boolean = false;

  // Constant Values
  STANDARD_DEDUCTION_RATE_ON_INCOME_FROM_LET_OUT_PROPERTY = 30 / 100;
  MAXIMUM_BASIC_DEDUCTIONS_US_80C = 150000;
  MAXIMUM_DEDUCTION_FOR_INTEREST_ON_DEPOSITS_IN_SAVING_ACCOUNT_US_80TTA = 10000;
  MAXIMUM_DEDUCTION_ON_DONATION_TO_CHARITY_US_80G = 9999999;
  MAXIMUM_DEDUCTION_ON_INTEREST_ON_EDUCATIONAL_LOAN_US_80E = 9999999;
  MAXIMUM_DEDUCTION_ON_MEDICAL_INSURANCE_PREMIUM_US_80D = 9999999;

  // let Values
  minimum_income_amount = undefined;
  maximum_income_amount = undefined;
  tax_rate = undefined;
  maximum_deduction_on_interest_paid_on_home_loan = undefined;
  basic_salary_received = document.getElementById('basic_salary_received');
  income_from_let_out_house_property = document.getElementById('income_from_let_out_house_property');
  basic_salary_percentage_for_hra_for_city = 50 / 100;
  Basic_salary_deduction_from_total_rent_paid = 10 / 100;
  assesmentYear = "";
  taxpayer = '';



  constructor(private fb: FormBuilder) {

  }


  ngOnInit() {
    this.incomeTaxForm = this.fb.group({
      grossSalary: ['', [Validators.required]],
      incomeFromOtherSources: ['', []],
      incomeFromInterest: ['', []],
      incomeFromLetOutHouseProperty: ['', []],
      interestPaidOnHomeLoan: ['', []],
      interestPaidOnHomeLoanLetOut: ['', []],
      basicDeductions80c: ['', []],
      interestOnDepositsInSavingAccount80tta: ['', []],
      donationToCharity80g: ['', []],
      medicalInsurancePremium80d: ['', []],
      interestOnEducationalLoan80e: ['', []],
      basicSalaryReceived: ['', []],
      dearnessAllowanceReceived: ['', []],
      hraReceived: ['', []],
      totalRentPaid: ['', []],
      metrocity: ['yes', []],
      assessmentYear: ['2018-2019', []],
      taxPayerPerson: ['Male', []]

    })
  }

  calulateIncomeTax() {
    this.taxpayer = this.incomeTaxForm.value.taxPayerPerson;
    this.assesmentYear = this.incomeTaxForm.value.assessmentYear;
    this.basicSalaryFromHra(this.incomeTaxForm.value.metrocity); //Basic Salary Percentage Form HRA - Is 


    this.totalTaxPayableBasedOnSlab();

    console.log('yes click to tax');
    console.log(this.incomeTaxForm.value);
    console.log('hraexemptionInnerHTML', this.hraexemptionInnerHTML);
    console.log('nettaxableincomeInnerHTML', this.nettaxableincomeInnerHTML);
    console.log('incometaxpayableInnerHTML', this.incometaxpayableInnerHTML);
    console.log('incometaxpayableboldInnerHTML', this.incometaxpayableboldInnerHTML);
    console.log('totalIncomeMySalary', this.totalIncomeMySalary);
    console.log('deductionsAmount', this.deductionsAmount);
    //   ;
    // ;
    // ;
    // ;
    // ;
    // ;
    this.showToResult = true;

  }

  //Total Income
  totalIncome() {
    //let to calculate Total Income
    let gross_salary = this.incomeTaxForm.value.grossSalary;
    let income_from_interest = this.incomeTaxForm.value.incomeFromInterest;
    let income_from_other_sources = this.incomeTaxForm.value.incomeFromOtherSources;
    let income_from_let_out_house_property = this.incomeTaxForm.value.incomeFromLetOutHouseProperty;
    let interest_paid_on_home_loan_let_out = this.incomeTaxForm.value.interestPaidOnHomeLoanLetOut;
    let interest_paid_on_home_loan = this.incomeTaxForm.value.interestPaidOnHomeLoan;

    //Based on Assessment year "maximum_deduction_on_interest_paid_on_home_loan" will change
    if (this.assesmentYear == "2018-2019") {
      this.maximum_deduction_on_interest_paid_on_home_loan = 200000;
    }
    else if (this.assesmentYear == "2017-2018") {
      this.maximum_deduction_on_interest_paid_on_home_loan = 9999999;
    }
    else if (this.assesmentYear == "2016-2017") {
      this.maximum_deduction_on_interest_paid_on_home_loan = 9999999;
    }

    //Formula For Total Income
    var total_income = (gross_salary) + (income_from_interest) + (income_from_other_sources) - (Math.min((this.maximum_deduction_on_interest_paid_on_home_loan), ((interest_paid_on_home_loan) + (interest_paid_on_home_loan_let_out) + ((this.STANDARD_DEDUCTION_RATE_ON_INCOME_FROM_LET_OUT_PROPERTY - 1) * (income_from_let_out_house_property)))));

    //Total Income
    this.totalIncomeMySalary = this.delimitNumbers(Math.round(total_income));
    console.log('this.totalIncomeMySalary', this.totalIncomeMySalary);
    return total_income;


  }


  //Deduction
  totalDeducation() {
    //Variables to calculate Deduction
    var basic_deductions_80c = this.incomeTaxForm.value.basicDeductions80c;
    var interest_on_deposits_in_saving_account_80tta = this.incomeTaxForm.value.interestOnDepositsInSavingAccount80tta;
    var donation_to_charity_80g = this.incomeTaxForm.value.donationToCharity80g;
    var medical_insurance_premium_80d = this.incomeTaxForm.value.medicalInsurancePremium80d;
    var interest_on_educational_loan_80e = this.incomeTaxForm.value.interestOnEducationalLoan80e;

    //Formula For Deduction
    var deductions = Number(basic_deductions_80c) + Number(interest_on_deposits_in_saving_account_80tta) + Number(donation_to_charity_80g) + Number(medical_insurance_premium_80d) + Number(interest_on_educational_loan_80e)

    //Total Deduction
    this.deductionsAmount = this.delimitNumbers(Math.round(deductions));
    return deductions;
  }

  //HRA Exemption
  totalhraExemption() {
    //Variables to calculate HRA Exemption
    var basic_salary_received = this.incomeTaxForm.value.basicSalaryReceived;
    var hra_received = this.incomeTaxForm.value.hraReceived;
    var total_rent_paid = this.incomeTaxForm.value.totalRentPaid;
    var dearness_allowance_received = this.incomeTaxForm.value.dearnessAllowanceReceived;

    //Formula For HRA Exemption
    var hraexemption = Math.min((Number(this.basic_salary_percentage_for_hra_for_city) * Number(basic_salary_received)), Number(hra_received), Number(total_rent_paid) - ((Number(basic_salary_received) + Number(dearness_allowance_received)) * Number(this.Basic_salary_deduction_from_total_rent_paid)));

    //HRA Exemption should not show -ve Value
    if (hraexemption < 0) {
      hraexemption = 0;
      this.hraexemptionInnerHTML = hraexemption;
    }
    else {
      this.hraexemptionInnerHTML = this.delimitNumbers(Math.round(hraexemption));
    }

    return hraexemption;
  }

  //Slab Calculation
  totalTaxPayableBasedOnSlab() {
    //Loop for Slab Calculation
    var totalTaxableIncomeValue = this.totalTaxableIncome();
    var Tax = 0;
    for (var slab = 1; slab <= 4 && totalTaxableIncomeValue > 0; slab++) {
      this.taxValueBasedOnSlab(this.taxpayer, this.assesmentYear, slab);
      if (totalTaxableIncomeValue > this.minimum_income_amount) {
        var slabtax = Math.max(Math.min((this.maximum_income_amount), (totalTaxableIncomeValue)) - (this.minimum_income_amount), 0) * (this.tax_rate);
        Tax += slabtax;
      }
    }

    console.log('totalTaxableIncomeValue', totalTaxableIncomeValue);


    //Tax Rebate if Income between 300000 and 350000
    if (((totalTaxableIncomeValue <= 350000)) && (this.taxpayer !== "Super Senior Citizen") && (this.assesmentYear == "2018-2019")) {
      Tax = Math.max((Tax - 2500), 0);
    } else if (((totalTaxableIncomeValue <= 500000)) && (this.taxpayer !== "Super Senior Citizen") && (this.assesmentYear == "2017-2018")) {
      Tax = Math.max((Tax - 5000), 0);
    }
    else if (((totalTaxableIncomeValue <= 500000)) && (this.taxpayer !== "Super Senior Citizen") && (this.assesmentYear == "2016-2017")) {
      Tax = Math.max((Tax - 2000), 0);
    }

    //Surcharge if Income between 5000000 and 10000000
    if (((totalTaxableIncomeValue > 5000000) && (totalTaxableIncomeValue <= 10000000)) && (this.assesmentYear == "2018-2019")) {
      if ((Tax * 0.1) > ((totalTaxableIncomeValue - 5000000) * (70 / 100))) {
        Tax = Math.min(Tax + (70 / 100 * (totalTaxableIncomeValue - 5000000)), Tax * 110 / 100);
      } else {
        Tax = Tax * 110 / 100;
      }
    }
    if ((totalTaxableIncomeValue > 10000000) && (this.assesmentYear !== "2016-2017")) {
      if ((Tax * 0.15) > ((totalTaxableIncomeValue - 10000000) * (70 / 100))) {
        if (this.assesmentYear == "2018-2019") {
          Tax = Math.min(((Tax - ((totalTaxableIncomeValue - 10000000) * (30 / 100))) * (110 / 100)) + (totalTaxableIncomeValue - 10000000), Tax * 115 / 100);
        } else {

          Tax = Math.min(Tax + (70 / 100 * (totalTaxableIncomeValue - 10000000)), Tax * 115 / 100);
        }

      } else {
        Tax = Tax * 115 / 100;
      }
    }
    if ((totalTaxableIncomeValue > 10000000) && (this.assesmentYear == "2016-2017")) {
      if ((Tax * 0.12) > ((totalTaxableIncomeValue - 10000000) * (70 / 100))) {
        Tax = Math.min(Tax + (70 / 100 * (totalTaxableIncomeValue - 10000000)), Tax * 112 / 100);
      } else {
        Tax = Tax * 112 / 100;
      }
    }

    //Income Tax Payable
    this.incometaxpayableInnerHTML = this.delimitNumbers(Math.round(Tax * (103 / 100)));
    this.incometaxpayableboldInnerHTML = this.delimitNumbers(Math.round(Tax * (103 / 100)));

  }

  //Comma Separator
  delimitNumbers(str) {
    // var x = str;
    // x = x.toString();
    // var lastThree = x.substring(x.length - 3);
    // var otherNumbers = x.substring(0, x.length - 3);
    // if (otherNumbers != '')
    //   lastThree = ',' + lastThree;
    // var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    // return res;
    return str
  }
  //Net Taxable Income
  totalTaxableIncome() {

    //Formula For Net Taxable Income
    var nettaxableincome = this.totalIncome() - this.totalhraExemption() - this.totalDeducation();
    console.log('nettaxableincome', nettaxableincome);

    //HRA Exemption should not show -ve Value
    if (nettaxableincome < 0) {
      nettaxableincome = 0;
      this.nettaxableincomeInnerHTML = nettaxableincome;
    }
    else {
      //Net Taxable Income
      this.nettaxableincomeInnerHTML = this.delimitNumbers(Math.round(nettaxableincome));
    }
    return nettaxableincome;
  }

  //Basic Salary Percentage Form HRA - Is Metro or Non Metro
  basicSalaryFromHra(IsCity) {
    if (IsCity == 'yes') {
      this.basic_salary_percentage_for_hra_for_city = 50 / 100;
    } else if (IsCity == 'no') {
      this.basic_salary_percentage_for_hra_for_city = 40 / 100;
    }
  }
  //Tax Slab Values
  taxValueBasedOnSlab(taxpayer, assesmentYears, slab) {
    if (slab == 1) {
      if (assesmentYears == "2018-2019") {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 250000;
          this.tax_rate = 0;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 300000;
          this.tax_rate = 0;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 250000;
          this.tax_rate = 0;
        }
      }
      else if ((assesmentYears == "2017-2018") || (assesmentYears == "2016-2017")) {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 250000;
          this.tax_rate = 0;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 300000;
          this.tax_rate = 0;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 0;
          this.maximum_income_amount = 250000;
          this.tax_rate = 0;
        }
      }
    }
    if (slab == 2) {
      if (assesmentYears == "2018-2019") {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 250000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 5 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 300000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 5 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 250000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 0;
        }
      }
      else if ((assesmentYears == "2017-2018") || (assesmentYears == "2016-2017")) {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 250000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 10 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 300000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 10 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 250000;
          this.maximum_income_amount = 500000;
          this.tax_rate = 0;
        }
      }
    }
    if (slab == 3) {
      if (assesmentYears == "2018-2019") {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
      }
      else if ((assesmentYears == "2017-2018") || (assesmentYears == "2016-2017")) {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 500000;
          this.maximum_income_amount = 1000000;
          this.tax_rate = 20 / 100;
        }
      }
    }
    if (slab == 4) {
      if (assesmentYears == "2018-2019") {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
      }
      else if ((assesmentYears == "2017-2018") || (assesmentYears == "2016-2017")) {
        if ((taxpayer == "Male") || (taxpayer == "Female")) {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
        else if (taxpayer == "Senior Citizen") {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
        else if (taxpayer == "Super Senior Citizen") {
          this.minimum_income_amount = 1000000;
          this.maximum_income_amount = 999999999;
          this.tax_rate = 30 / 100;
        }
      }
    }
  }




}
