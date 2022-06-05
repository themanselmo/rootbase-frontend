import { asyncInterface } from './async';

export default interface employee {
  id: number;
  name: string;
  pin: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface asyncEmployee extends asyncInterface {
  employee: employee | null;
}
