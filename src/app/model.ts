export interface Item {
    id: string;
    name: string;
    status: ItemStatus;
  }
  export enum ItemStatus {
    Complete = 'Complete',
    InProgress = 'In Progress',
    Todo = 'To Do'
  }
  