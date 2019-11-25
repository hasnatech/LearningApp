import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpellingComponent } from './game/spelling/spelling.component';
import { DragSpellingComponent } from './game/drag-spelling/drag-spelling.component';
import { ResultComponent } from './game/result/result.component';

const routes: Routes = [{
  path:"",
  component:HomeComponent
},{
  path:"spelling/1",
  component:SpellingComponent
},{
  path:"drag-spelling",
  component:DragSpellingComponent
},{
  path:"result",
  component:ResultComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
