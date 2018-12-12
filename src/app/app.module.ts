import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TriangleDisplayComponent } from './triangle-display/triangle-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TriangleDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
