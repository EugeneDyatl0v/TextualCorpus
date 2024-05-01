import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./Components/home-page/home-page.component";
import {EditTextComponent} from "./Components/edit-text/edit-text.component";
import {SyntaxComponent} from "./Components/syntax/syntax.component";
import {DependencyOfTextComponent} from "./Components/dependency-of-text/dependency-of-text.component";
import {NormalFormsCountsComponent} from "./Components/normal-forms-counts/normal-forms-counts.component";
import {FormsInfoComponent} from "./Components/forms-info/forms-info.component";
import {SearchPageComponent} from "./Components/search-page/search-page.component";
import {ChatComponent} from "./Components/chat/chat.component";

const routes: Routes = [
  {
    path: 'texts',
    component: HomePageComponent,
    title: 'Texts Library'
  },
  {
    path: 'texts/:id',
    component: EditTextComponent,
    title: 'Edit Text'
  },
  {
    path: 'syntax',
    component: SyntaxComponent,
    title: 'Text Syntax'
  },
  {
    path: 'syntax/:id',
    component: DependencyOfTextComponent,
    title: 'Text Dependencies'
  },
  {
    path: 'texts/:id/words',
    component: NormalFormsCountsComponent,
    title: 'Morph'
  },
  {
    path: 'texts/:id/words/:word',
    component: FormsInfoComponent,
    title: 'About Forms'
  },
  {
    path: 'search',
    component: SearchPageComponent,
    title:'Search'
  },
  {
    path: 'chat',
    component: ChatComponent,
    title: 'Chat'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
