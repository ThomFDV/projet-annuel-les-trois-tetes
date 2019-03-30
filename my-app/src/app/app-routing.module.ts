import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {ArticleCollectionComponent} from './article/article-collection/article-collection.component';
import {ArticleCreationComponent} from './article/article-creation/article-creation.component';

const routes: Routes = [
  { path : 'articles/collection', component: ArticleCollectionComponent },
  { path : 'articles/nouveau', component: ArticleCreationComponent },
  { path : '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
