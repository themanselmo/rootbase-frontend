import { asyncInterface } from './async';
import employee from './employee';

export default interface comment {
  id: number;
  content: string;
  created_at: string;
  employee: employee;
}

export interface asyncComment extends asyncInterface, comment {
  comments: comment[];
}
