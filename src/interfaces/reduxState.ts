import { asyncComment } from './comment';
import { asyncEmployee } from './employee';
import { asyncGarden } from './garden';
import { asyncOrganization } from './organization';
import { asyncTask } from './task';

export interface reduxState {
  authOrg: asyncOrganization;
  authEmp: asyncEmployee;
  orgEmployees: asyncEmployee;
  gardens: asyncGarden;
  tasks: asyncTask;
  comments: asyncComment;
}
