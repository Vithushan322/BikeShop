import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { SharedModule } from './modules/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { OffersComponent } from './components/dashboard/offers/offers.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { SuppliersComponent } from './components/dashboard/suppliers/suppliers.component';
import { BikeCardComponent } from './components/dashboard/inventory/bike-card/bike-card.component';
import { CreateBikeComponent } from './components/dashboard/inventory/create-bike/create-bike.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { EditBikeComponent } from './components/dashboard/inventory/edit-bike/edit-bike.component';
import { PhotoEditorComponent } from './components/shared/photo-editor/photo-editor.component';
import { ComingSoonComponent } from './components/shared/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    InventoryComponent,
    OffersComponent,
    AnalyticsComponent,
    SuppliersComponent,
    BikeCardComponent,
    CreateBikeComponent,
    ConfirmationModalComponent,
    EditBikeComponent,
    PhotoEditorComponent,
    ComingSoonComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
