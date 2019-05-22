import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { ArticleComponent } from './components/article/article.component';
import { MenuComponent } from './components/menu/menu.component';
import { ArticleCollectionComponent } from './components/article/article-collection/article-collection.component';
import { ArticleCreationComponent } from './components/article/article-creation/article-creation.component';
import { SimulationComponent } from './components/simulation/simulation.component';
import { SimulationCollectionComponent } from './components/simulation/simulation-collection/simulation-collection.component';
import { SimulationPlayerComponent } from './components/simulation/simulation-player/simulation-player.component';
import { StatusBarComponent } from './components/account/status-bar/status-bar.component';
import { HomeAccountComponent } from './components/account/home-account/home-account.component';
import { InfoAccountComponent } from './components/account/info-account/info-account.component';
import { LoginAccountComponent } from './components/account/login-account/login-account.component';
import { RegisterAccountComponent } from './components/account/register-account/register-account.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { StatisticHomeComponent } from './components/statistic/statistic-home/statistic-home.component';
import { CourseCollectionComponent } from './components/course/course-collection/course-collection.component';
import { GameComponent } from './components/games/game/game.component';
import { PlayComponent } from './components/games/play/play.component';
import { HomeComponent } from './components/home/home.component';
import { HomeGameComponent } from './components/games/home-game/home-game.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    ArticleComponent,
    MenuComponent,
    ArticleCollectionComponent,
    ArticleCreationComponent,
    SimulationComponent,
    SimulationCollectionComponent,
    SimulationPlayerComponent,
    StatusBarComponent,
    HomeAccountComponent,
    InfoAccountComponent,
    LoginAccountComponent,
    RegisterAccountComponent,
    ContactFormComponent,
    StatisticHomeComponent,
    CourseCollectionComponent,
    GameComponent,
    PlayComponent,
    HomeComponent,
    HomeGameComponent
  ],
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
