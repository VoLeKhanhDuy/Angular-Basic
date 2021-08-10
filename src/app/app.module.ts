import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormatDataPipe } from './pipes/format-data.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { FormsModule } from '@angular/forms';
import { TemFormComponent } from './form/template-driven-form/tem-form/tem-form.component';
import { TemplateDrivenFormComponent } from './form/template-driven-form/template-driven-form.component';

@NgModule({
  declarations: [AppComponent, FormatDataPipe, TemFormComponent, TemplateDrivenFormComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
