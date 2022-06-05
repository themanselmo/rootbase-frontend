import { asyncInterface } from './async';
import employee from './employee';
import garden from './garden';
import task from './task';

export default interface organization {
  id: number;
  name: string;
  employees: employee[];
  gardens: garden[];
  tasks: task[];
}

export interface asyncOrganization extends asyncInterface {
  organization: organization;
}
