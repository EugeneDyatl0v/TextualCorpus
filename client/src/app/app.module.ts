import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { EditTextComponent } from './Components/edit-text/edit-text.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SyntaxComponent } from './Components/syntax/syntax.component';
import { DependencyOfTextComponent } from './Components/dependency-of-text/dependency-of-text.component';
import { NormalFormsCountsComponent } from './Components/normal-forms-counts/normal-forms-counts.component';
import { FormsInfoComponent } from './Components/forms-info/forms-info.component';
import { SearchPageComponent } from './Components/search-page/search-page.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EditTextComponent,
    SyntaxComponent,
    DependencyOfTextComponent,
    NormalFormsCountsComponent,
    FormsInfoComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatFormFieldModule,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatButton,
    MatAutocompleteModule,
    MatTooltip,
    FormsModule,
    MatFormField,
    MatIcon,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatCheckbox,
    MatInput
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
