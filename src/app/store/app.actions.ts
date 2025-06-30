import { createAction, props } from '@ngrx/store';
import { Board } from '../../components/board/board';
import { IList, ITask } from './app-state.model';

export const loadBoards = createAction('[Board] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardId: string; listTitle: string; task: ITask }>()
);

export const addList = createAction(
  '[Board] Add List',
  props<{ boardId: string; title: string }>() 
);