import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ScrutinyFormComponent } from './scrutiny-form/scrutiny-form.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    FileUploadComponent,
    ScrutinyFormComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDropzoneModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
