import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailComponent } from './card-detail.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CardDetailComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzSpinModule,
    NzCheckboxModule,
    FormsModule,
    NzButtonModule
  ],
  exports:[
    CardDetailComponent
  ]
})
export class CardDetailModule { }
