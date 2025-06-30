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

export interface AppState {
  app: any;
  boards: IBoard[];
  loading: boolean;
  error: string | null;
}

export const initialState: AppState = {
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
  error: null,
  app: undefined
};