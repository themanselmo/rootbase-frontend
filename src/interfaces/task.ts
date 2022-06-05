import { asyncInterface } from './async';

export default interface task {
  id: number | null;
  name: string;
  status: string;
  due_date: string;
}

export interface asyncTask extends asyncInterface {
  tasks: task[];
}
