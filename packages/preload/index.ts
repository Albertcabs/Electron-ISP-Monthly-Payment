import { contextBridge, ipcRenderer } from 'electron';
import { ICustomerData } from '../main/global';

contextBridge.exposeInMainWorld('api', {
   readFile: () => ipcRenderer.invoke('readFile'),
   addPerson: (add: ICustomerData) => ipcRenderer.invoke('addPerson', add),
   deletePerson: (deletePerson: string[]) =>
      ipcRenderer.invoke('deletePerson', deletePerson),
   updateList: (updatePerson: ICustomerData) =>
      ipcRenderer.invoke('updateList', updatePerson),
   payed: (payed: [string, number[]]) => ipcRenderer.invoke('payed', payed),
});
