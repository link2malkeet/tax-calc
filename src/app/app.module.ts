import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonServicesModule } from './common/services/common-services.module';
import { ComponentsModule } from './common/components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    CommonServicesModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
