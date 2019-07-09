import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './components/default/default.component';
import {ArticleCollectionComponent} from './components/article/article-collection/article-collection.component';
import {ArticleCreationComponent} from './components/article/article-creation/article-creation.component';
import {SimulationCollectionComponent} from './components/simulation/simulation-collection/simulation-collection.component';
import {SimulationPlayerComponent} from './components/simulation/simulation-player/simulation-player.component';
import {HomeAccountComponent} from './components/account/home-account/home-account.component';
import {InfoAccountComponent} from './components/account/info-account/info-account.component';
import {LoginAccountComponent} from './components/account/login-account/login-account.component';
import {RegisterAccountComponent} from './components/account/register-account/register-account.component';
import {ContactFormComponent} from './components/contact/contact-form/contact-form.component';
import {StatisticHomeComponent} from './components/statistic/statistic-home/statistic-home.component';
import {CourseCollectionComponent} from './components/theme/course-collection/course-collection.component';
import {PlayComponent} from './components/games/play/play.component';
import {HomeComponent} from './components/home/home.component';
import {HomeGameComponent} from './components/games/home-game/home-game.component';
import {GameCreationComponent} from './components/games/game-creation/game-creation.component';
import {ArticleComponent} from "./components/article/article.component";
import {ThemeCollectionComponent} from "./components/theme/theme-collection/theme-collection.component";
import {CourseCreationComponent} from "./components/theme/course-creation/course-creation.component";
import {CourseComponent} from "./components/theme/course/course.component";

const routes: Routes = [
  { path : 'games/home', component: HomeGameComponent },
  { path : 'games/nouveau', component: GameCreationComponent },
  { path : 'games/:id', component: PlayComponent },
  { path : 'theme/collection', component: ThemeCollectionComponent},
  { path : 'theme/:id', component: CourseCollectionComponent},
  { path : 'theme/:id/newcourse', component: CourseCreationComponent},
  { path : 'theme/:themeId/course/:courseId', component: CourseComponent},
  { path : 'contact', component: ContactFormComponent },
  { path : 'statistics', component: StatisticHomeComponent },
  { path : 'account', component: HomeAccountComponent },
  { path : 'login', component: LoginAccountComponent },
  { path : 'register', component: RegisterAccountComponent },
  { path : 'account/info', component: InfoAccountComponent },
  { path : 'articles/collection', component: ArticleCollectionComponent },
  { path : 'article/:id', component: ArticleComponent },
  { path : 'articles/nouveau', component: ArticleCreationComponent },
  { path : 'simulation/collection', component: SimulationCollectionComponent },
  { path : 'simulation/mise-en-situation-1', component: SimulationPlayerComponent },
  { path : '', component: HomeComponent },
  { path : '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
