import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import {HttpClientModule} from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Angular-Google-Maps module config
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7djY4SsgQhkQsyNjfVrSp9I1ZebtLIhE'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
