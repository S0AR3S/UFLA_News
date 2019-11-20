import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { PublisherPage } from './publisher.page';

const routes: Routes = [
  {
    path: '',
    component: PublisherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublisherPage]
})
export class PublisherPageModule {}
