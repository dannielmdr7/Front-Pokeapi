import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NzPopoverModule,
    NzIconModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
