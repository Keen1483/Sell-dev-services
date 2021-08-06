import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { CampaniesComponent } from './components/campanies/campanies.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroSectionComponent,
    CampaniesComponent,
    ServicesComponent,
    TestimonialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
