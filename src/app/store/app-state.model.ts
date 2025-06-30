export interface ITask {
  title: string;
  libelle: string;
}

export interface IList {
  title: string;
  tasks: ITask[];
}

export interface IBoard {
  id: string;          
  name: string;
  lists: IList[];
}

export interface BoardState {
  boards: IBoard[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  app: BoardState;
}

export const initialState: BoardState = {
    boards: [
      {
        id: '1',
        name: 'Board Principal',
        lists: [
          {
            title: 'À faire',
            tasks: [
              { title: 'Angular', libelle: 'Apprendre Angular' },
              { title: 'Exo Jira', libelle: 'Faire exercice Jira' }
            ]
          },
          { title: 'En cours', tasks: [] },
          {
            title: 'Fait',
            tasks: [
              { title: 'Node.js', libelle: 'Apprendre Node.js' }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Tableau',
        lists: [
          {
            title: 'À faire',
            tasks: [
              { title: 'Cours React', libelle: 'Faire tuto React' }
            ]
          }
        ]
      }
    ],
    loading: false,
    error: null
};