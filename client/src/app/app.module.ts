import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { EditTextComponent } from './Components/edit-text/edit-text.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
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
import { TranslateModule } from '@ngx-translate/core';
import { ChatComponent } from './Components/chat/chat.component';
import {ChatService} from "./service/chat.service";
import { NgxSsrTimeoutModule } from '@ngx-ssr/timeout';
import { MessageComponent } from './Components/chat/message/message.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent, MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EditTextComponent,
    SyntaxComponent,
    DependencyOfTextComponent,
    NormalFormsCountsComponent,
    FormsInfoComponent,
    SearchPageComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    NgxSsrTimeoutModule.forRoot({timeout: 500}),
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
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
  ],
  providers: [
    ChatService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
