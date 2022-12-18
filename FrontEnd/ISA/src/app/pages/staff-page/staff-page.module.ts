import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { RouterModule, Routes } from '@angular/router';
import { BloodDonorListModule } from 'src/app/features/blood-donor-list/blood-donor-list.module';
import { StaffProfileModule } from 'src/app/features/staff-profile/staff-profile';



@NgModule({
  declarations: [
    StaffPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BloodDonorListModule,
    StaffProfileModule
  ]
})
export class StaffPageModule { }
