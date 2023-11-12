import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './shared/authguard.guard';
import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { OffersComponent } from './components/dashboard/offers/offers.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { SuppliersComponent } from './components/dashboard/suppliers/suppliers.component';
import { CreateBikeComponent } from './modals/create-bike/create-bike.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '', component: InventoryComponent
      },
      {
        path: 'inventory', component: InventoryComponent
      },
      {
        path: 'analytics', component: AnalyticsComponent
      },
      {
        path: 'offers', component: OffersComponent
      },
      {
        path: 'suppliers', component: SuppliersComponent
      },
      {
        path: 'create-bike', component: CreateBikeComponent
      }
    ]
  },
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [authGuard]
  },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
