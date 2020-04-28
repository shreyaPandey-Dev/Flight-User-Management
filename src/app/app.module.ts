import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './landing-page/header/header.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { ContentComponent } from './landing-page/content/content.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './landing-page/content/user-table/user-table.component';
import { HttpClientModule }    from '@angular/common/http';
import { AddUserModalComponent } from './landing-page/content/add-user-modal/add-user-modal.component';
import {SelectionModel} from '@angular/cdk/collections';
import { FligtsTableComponent } from './landing-page/content/fligts-table/fligts-table.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    LoginComponent,
    UserTableComponent,
    AddUserModalComponent,
    FligtsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SelectionModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
