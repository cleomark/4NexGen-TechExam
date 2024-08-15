import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { CategoryService } from '../category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ListComponent,
    CreateComponent,
    UpdateComponent,
  ],
  providers: [CategoryService],
  exports: [ListComponent, CreateComponent, UpdateComponent],
})
export class CategoryModule {}
