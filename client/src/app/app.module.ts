import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule} from '@angular/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RegisterComponent } from './Register/Register.component';
import { FlashMessagesModule  } from 'angular2-flash-messages';
import { LoginComponent } from './login/login.component';
import {RouterModule,Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NewhotelComponent } from './newhotel/newhotel.component';
import { ValidateService } from './validate.service';

const appRoutes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HotelsComponent},
  {path:'register', component: RegisterComponent},
  {path:'newhotel', component: NewhotelComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    NewhotelComponent,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule, HttpModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)

  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
