// main.js
// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import {
   readExcel,
   writeRowExcel,
   deleteRowExcel,
   updateRowExcel,
   payedExcel,
} from './excelFunction';

// import installExtension, {
//    REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';

import * as path from 'path';

const createWindow = () => {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 900,
      height: 650,
      icon: path.join(__dirname, './icon.ico'),
      autoHideMenuBar: true,
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, '../preload/index.cjs'),
         sandbox: false,
      },
   });

   // real excel file

   ipcMain.handle('readFile', async () => readExcel());

   ipcMain.handle('addPerson', async (event, addPerson) => {
      return writeRowExcel(addPerson);
   });

   ipcMain.handle('deletePerson', async (event, deletePerson) => {
      return deleteRowExcel(deletePerson);
   });

   ipcMain.handle('updateList', async (event, updateList) => {
      return updateRowExcel(updateList);
   });

   ipcMain.handle('payed', async (event, payed) => {
      return payedExcel(payed);
   });

   // and load the index.html of the app.
   mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

   // monitor the changes in development
   // Open the DevTools.
   //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   createWindow();
   // installExtension(REACT_DEVELOPER_TOOLS)
   //    .then((name) => console.log(`Added Extension:  ${name}`))
   //    .catch((err) => console.log('An error occurred: ', err));

   app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
