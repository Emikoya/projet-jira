import { createReducer, on } from '@ngrx/store';
import { addTask } from './app.actions';
import { AppState, IBoard, initialState, IList, ITask } from './app-state.model';


export const boardsReducer = createReducer(
  initialState,
  on(addTask, (state, { boardId, listTitle, task }): AppState => {
    const updatedBoards: IBoard[] = state.boards.map((board): IBoard => {
      if (board.id !== boardId) return board;

      const updatedLists: IList[] = board.lists.map((list): IList => {
        if (list.title !== listTitle) return list;

        const updatedTasks: ITask[] = [...list.tasks, task];
        return { ...list, tasks: updatedTasks };
      });

      return { ...board, lists: updatedLists };
    });

    return {
      ...state,
      boards: updatedBoards
    };
  })
);
