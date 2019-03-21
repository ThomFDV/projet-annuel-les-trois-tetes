import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from "./default/default.component";
import {ArticleComponent} from "./article/article.component";
import {ArticleCollectionComponent} from "./article/article-collection/article-collection.component";

const routes: Routes = [
  { path : 'articles/collection', component: ArticleCollectionComponent },
  { path : 'articles/nouveau', component: ArticleComponent },
  { path : '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
