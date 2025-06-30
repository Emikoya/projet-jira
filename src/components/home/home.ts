import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, IBoard } from '../../app/store/app-state.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private store = inject(Store<AppState>);

  boards$ = this.store.select(state => state.app.boards);
}