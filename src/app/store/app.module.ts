import { StoreModule } from '@ngrx/store';
import { boardsReducer } from './app.reducer';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    StoreModule.forRoot({ app: boardsReducer })
  ]
})
export class AppStoreModule { }