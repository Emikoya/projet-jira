import { Component, computed, input, signal, OnInit, OnDestroy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { List } from '../list/list';
import { AppState, IBoard } from '../../app/store/app-state.model';
import { addList, addTask } from '../../app/store/app.actions';

@Component({
  selector: 'app-board',
  imports: [List, JsonPipe],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board implements OnInit, OnDestroy {
  boardId = input<string | null>(null);
  boards$: Observable<IBoard[]>;
  
  // Signal pour stocker les boards
  private boardsSignal = signal<IBoard[]>([]);
  private subscription?: Subscription;

  constructor(private store: Store<AppState>) {
    this.boards$ = this.store.select(state => state.app.boards);
  }

  ngOnInit() {
    // S'abonner aux changements du store
    this.subscription = this.boards$.subscribe(boards => {
      console.log('Boards reçus du store:', boards); // Debug
      this.boardsSignal.set(boards || []); // Assurer que c'est un tableau
    });
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Computed avec protection supplémentaire
  lists = computed(() => {
    const targetBoardId = this.boardId() || '1';
    const boards = this.boardsSignal();
    
    // Vérification que boards est bien un tableau
    if (!Array.isArray(boards)) {
      console.warn('Boards is not an array:', boards, typeof boards);
      return [];
    }
    
    const currentBoard = boards.find(board => board.id === targetBoardId);
    return currentBoard ? currentBoard.lists : [];
  });

  // Computed pour récupérer le board actuel (si nécessaire)
  currentBoard = computed(() => {
    const targetBoardId = this.boardId() || '1';
    const boards = this.boardsSignal();
    
    if (!Array.isArray(boards)) {
      return null;
    }
    
    return boards.find(board => board.id === targetBoardId) || null;
  });

  currentBoardName = computed(() => {
    const boards = this.boardsSignal();
    const targetBoardId = this.boardId() || '1';
    
    // Vérification que boards est bien un tableau
    if (!Array.isArray(boards)) {
      return 'Chargement...';
    }
    
    const board = boards.find(b => b.id === targetBoardId);
    return board?.name ?? 'Board non trouvé';
  });

  // Méthodes pour modifier le store
  addList(title: string) {
    const targetBoardId = this.boardId() || '1';
    this.store.dispatch(addList({ boardId: targetBoardId, title }));
  }

  // Track function pour @for
  trackList(index: number, list: any) {
    return list.title || index;
  }

  onTaskAdded(
    list: { title: string; tasks: { title: string; libelle: string }[] },
    task: { title: string; libelle: string }
  ) {
    const targetBoardId = this.boardId() || '1';
    this.store.dispatch(addTask({
      boardId: targetBoardId,
      listTitle: list.title,
      task
    }));
  }
}