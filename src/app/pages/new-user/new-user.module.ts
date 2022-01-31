import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    NewUserComponent
  ],
  imports: [
    CommonModule,
    NewUserRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule
  ]
})
export class NewUserModule { }
