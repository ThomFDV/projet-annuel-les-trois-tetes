import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {ArticleCollectionComponent} from './article/article-collection/article-collection.component';
import {ArticleCreationComponent} from './article/article-creation/article-creation.component';
import {SimulationCollectionComponent} from './simulation/simulation-collection/simulation-collection.component';
import {SimulationPlayerComponent} from './simulation/simulation-player/simulation-player.component';
import {HomeAccountComponent} from './account/home-account/home-account.component';
import {InfoAccountComponent} from './account/info-account/info-account.component';
import {LoginAccountComponent} from './account/login-account/login-account.component';
import {RegisterAccountComponent} from './account/register-account/register-account.component';
import {ContactFormComponent} from './contact/contact-form/contact-form.component';
import {StatisticHomeComponent} from './statistic/statistic-home/statistic-home.component';
import {CourseCollectionComponent} from './course/course-collection/course-collection.component';
import {PlayComponent} from './play/play.component';

const routes: Routes = [
  { path : 'play', component: PlayComponent },
  { path : 'courses/collection', component: CourseCollectionComponent },
  { path : 'contact', component: ContactFormComponent },
  { path : 'statistics', component: StatisticHomeComponent },
  { path : 'account', component: HomeAccountComponent },
  { path : 'login', component: LoginAccountComponent },
  { path : 'register', component: RegisterAccountComponent },
  { path : 'account/info', component: InfoAccountComponent },
  { path : 'articles/collection', component: ArticleCollectionComponent },
  { path : 'articles/nouveau', component: ArticleCreationComponent },
  { path : 'simulation/collection', component: SimulationCollectionComponent },
  { path : 'simulation/mise-en-situation-1', component: SimulationPlayerComponent },
  { path : '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
