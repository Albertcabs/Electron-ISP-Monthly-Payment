/// <reference types="vite/client" />
import { IList, ICustomerData } from '../../main/global';
export {};
declare global {
   interface Window {
      api: {
         readFile: () => IList;
         addPerson: (add: ICustomerData) => boolean;
         deletePerson: (deletePerson: string[]) => boolean;
         updateList: (updatePerson: ICustomerData) => boolean;
         payed: (payed: [string, number[]]) => boolean;
      };
   }
}
