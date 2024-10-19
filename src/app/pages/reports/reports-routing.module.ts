import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDefaultComponent } from './report-default/report-default.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const routes: Routes = [
  {
    path: '', component: ReportDefaultComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ReportListComponent },
      { path: 'details', component: ReportDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
