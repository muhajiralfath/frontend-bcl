import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PagesAdminAppComponent} from "./pages-admin-app/pages-admin-app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DebtorListComponent} from "./debtor-list/debtor-list.component";
import {SubmissionListComponent} from "./submission-list/submission-list.component";
import {UmkmDetailComponent} from "./umkm-detail/umkm-detail.component";
import {BillsComponent} from "./bills/bills.component";
import {ProfilComponent} from "../pages-debtor/profil/profil.component";
import {ViewDebtorDetailComponent} from "./view-debtor-detail/view-debtor-detail.component";

const routes: Routes = [
  {
    path: "", component: PagesAdminAppComponent, children: [
      {path: "", redirectTo: "dashboard", pathMatch: "full"},
      {path: "dashboard", component: DashboardComponent},
      {path: "debtor-list", component: DebtorListComponent},
      {path: "view-debtor/:id", component: ViewDebtorDetailComponent},
      {path: "submission", component: SubmissionListComponent},
      {path: "umkm-detail", component: UmkmDetailComponent},
      {path: "bills", component: BillsComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesAdminRoutingModule { }
