import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {MusicComponent} from './components/music/music.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home' },
  { path: '', component: LandingPageComponent, data: {animation: 'Home'}, },
  { path: 'projects', component:  ProjectsComponent, data: {animation: 'Projects'},},
  { path: 'about', component: AboutComponent, data: {animation: 'About'}, },
  { path: 'contact', component: ContactComponent},
  { path: 'music', component: MusicComponent, data: {animation: 'Music'},},
  { path: 'secret-santa', component: MainComponent,},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
