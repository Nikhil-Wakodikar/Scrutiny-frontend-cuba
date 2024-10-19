import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DefaultComponent } from './default/default.component';
import { ScrutinyFormComponent } from './scrutiny-form/scrutiny-form.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      { path: '', redirectTo: 'file-upload', pathMatch: 'full' },
      { path: 'file-upload', component: FileUploadComponent },
      { path: 'scrutiny-form', component: ScrutinyFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
