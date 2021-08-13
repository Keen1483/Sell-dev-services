import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IntroSectionDetailsComponent } from './components/intro-section/intro-section-details/intro-section-details.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { LearnMoreComponent } from './components/services/learn-more/learn-more.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeViewComponent
  },
  {
    path: 'intro-section/get-in-touch',
    component: IntroSectionDetailsComponent
  },
  {
    path: 'services/:name',
    component: LearnMoreComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
