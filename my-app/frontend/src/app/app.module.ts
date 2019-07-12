import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultComponent} from './components/default/default.component';
import {ArticleComponent} from './components/article/article/article.component';
import {MenuComponent} from './components/menu/menu.component';
import {ArticleCollectionComponent} from './components/article/article-collection/article-collection.component';
import {ArticleCreationComponent} from './components/article/article-creation/article-creation.component';
import {SimulationComponent} from './components/simulation/simulation.component';
import {SimulationCollectionComponent} from './components/simulation/simulation-collection/simulation-collection.component';
import {SimulationPlayerComponent} from './components/simulation/simulation-player/simulation-player.component';
import {StatusBarComponent} from './components/account/status-bar/status-bar.component';
import {HomeAccountComponent} from './components/account/home-account/home-account.component';
import {InfoAccountComponent} from './components/account/info-account/info-account.component';
import {LoginAccountComponent} from './components/account/login-account/login-account.component';
import {RegisterAccountComponent} from './components/account/register-account/register-account.component';
import {ContactFormComponent} from './components/contact/contact-form/contact-form.component';
import {StatisticHomeComponent} from './components/statistic/statistic-home/statistic-home.component';
import {CourseCollectionComponent} from './components/theme/course-collection/course-collection.component';
import {GameComponent} from './components/games/game/game.component';
import {PlayComponent} from './components/games/play/play.component';
import {HomeComponent} from './components/home/home.component';
import {HomeGameComponent} from './components/games/home-game/home-game.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {CommonModule} from '@angular/common';
import {TokenStorageService} from './services/token-storage.service';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatRadioModule,
  MatSelectModule, MatSliderModule
} from '@angular/material';
import {NgxSummernoteModule} from "ngx-summernote";
import {MatIconModule} from '@angular/material/icon';
import {GameCreationComponent} from './components/games/game-creation/game-creation.component';
import {ThemeCollectionComponent} from './components/theme/theme-collection/theme-collection.component';
import {CourseCreationComponent} from './components/theme/course-creation/course-creation.component';
import {CourseComponent} from './components/theme/course/course.component';

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
    GameComponent,
    PlayComponent,
    HomeComponent,
    HomeGameComponent,
    GameCreationComponent,
    ThemeCollectionComponent,
    CourseCollectionComponent,
    CourseCreationComponent,
    CourseComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    NgxSummernoteModule,
  ],
  providers: [UserService, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
