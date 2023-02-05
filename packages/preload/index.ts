import { contextBridge, ipcRenderer } from 'electron';
import { ICustomerData } from '../main/global';

contextBridge.exposeInMainWorld('api', {
   readFile: () => ipcRenderer.invoke('readFile'),
   addPerson: (add: ICustomerData) => ipcRenderer.invoke('addPerson', add),
   deletePerson: (deletePerson: string[]) =>
      ipcRenderer.invoke('deletePerson', deletePerson),
   updateList: (updatePerson: ICustomerData) =>
      ipcRenderer.invoke('updateList', updatePerson),
   paid: (paid: [string, number[]]) => ipcRenderer.invoke('paid', paid),
});
