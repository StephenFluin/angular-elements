import { NgModule } from '@angular/core';

import { NgDirectivesModule } from '../../directives/ng_directives'
import { PostListComponent } from "./post-list.component";


@NgModule({
  imports: [
    NgDirectivesModule
  ],
  declarations: [
    PostListComponent
  ],
})
export class AppModule { }

