import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../board/board';
import { AppState } from '../../app/store/app-state.model';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-details',
  imports: [Board],
  templateUrl: './board-details.html',
  styleUrl: './board-details.css'
})
export class BoardDetails {

  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);

  boardId = this.route.snapshot.paramMap.get('id');
  currentBoard$: Observable<Board | undefined>;

  constructor() {
    this.currentBoard$ = this.store.select(state => state.app.boards).pipe(
      map(boards => boards.find((b: { id: string | null; }) => b.id === this.boardId))
    );
  }
}
