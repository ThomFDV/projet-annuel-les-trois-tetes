import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { ArticleComponent } from './article/article.component';
import { MenuComponent } from './menu/menu.component';
import { ArticleCollectionComponent } from './article/article-collection/article-collection.component';
import { ArticleCreationComponent } from './article/article-creation/article-creation.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SimulationCollectionComponent } from './simulation/simulation-collection/simulation-collection.component';
import { SimulationPlayerComponent } from './simulation/simulation-player/simulation-player.component';
import { StatusBarComponent } from './account/status-bar/status-bar.component';
import { HomeAccountComponent } from './account/home-account/home-account.component';
import { InfoAccountComponent } from './account/info-account/info-account.component';

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
    InfoAccountComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
