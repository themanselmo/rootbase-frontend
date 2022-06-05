import { asyncInterface } from './async';

export default interface garden {
  id: number;
  crop: null;
  name: string;
  organization_id: number;
}

export interface asyncGarden extends asyncInterface {
  gardens: garden[];
}
