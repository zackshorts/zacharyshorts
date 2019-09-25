import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SecretSantaComponent } from './components/secret-santa/secret-santa.component';
import { ProjectsComponent } from './components/projects/projects.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatStepperModule, MatTooltipModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SecretSantaComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    NgxSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
