import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { HomeComponent } from './ram/home/home.component';
import { ContactComponent } from './ram/contact/contact.component';
import { CalculatorComponent } from './ram/calculator/calculator.component';
import { PageNotFoundComponentComponent } from './ram/page-not-found-component/page-not-found-component.component';
import { HomeLoanComponent } from './ram/calculator/home-loan/home-loan.component';
import { CarLoanComponent } from './ram/calculator/car-loan/car-loan.component';
import { PersonalLoanComponent } from './ram/calculator/personal-loan/personal-loan.component';
import { FdComponent } from './ram/calculator/fd/fd.component';
import { PpfComponent } from './ram/calculator/ppf/ppf.component';
import { SimpleInterestComponent } from './ram/calculator/simple-interest/simple-interest.component';
import { RecurringDepositComponent } from './ram/calculator/recurring-deposit/recurring-deposit.component';

import { ChartsModule } from 'ng2-charts';
import { IncomeTaxComponent } from './ram/calculator/income-tax/income-tax.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    CalculatorComponent,
    PageNotFoundComponentComponent,
    HomeLoanComponent,
    CarLoanComponent,
    PersonalLoanComponent,
    FdComponent,
    PpfComponent,
    SimpleInterestComponent,
    RecurringDepositComponent,
    IncomeTaxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot([
      {path:'home', component:HomeComponent},
      {path:'calculator', component:CalculatorComponent},
      {path:'calculator/home-loan-emi', component:HomeLoanComponent},
      {path:'calculator/car-loan-emi', component:CarLoanComponent},
      {path:'calculator/personal-loan', component:PersonalLoanComponent},
      {path:'calculator/fixed-deposit', component:FdComponent},
      {path:'calculator/public-provident-fund', component:PpfComponent},
      {path:'calculator/simple-interest', component:SimpleInterestComponent},
      {path:'calculator/recurring-deposit', component:RecurringDepositComponent},
      {path:'calculator/calculate-income-tax-on-salary', component:IncomeTaxComponent},
      {path:'contact-us', component:ContactComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponentComponent, pathMatch: 'full' },
    ]),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
