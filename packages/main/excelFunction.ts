const xlsx = require('xlsx');

import { IList, ICustomerData } from './global';

const monthMap = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
];

function readExcelFile() {
   const file = './Book1.xlsx';
   const wb = xlsx.readFile(file);

   // get workSheet
   let ws = wb.Sheets[wb.SheetNames];

   const { s, e } = xlsx.utils.decode_range(ws['!ref']);
   return { wb, ws, s, e };
}

function cellData(row: number, col: number) {
   return xlsx.utils.encode_cell({ r: row, c: col });
}

function reWrite(wb: unknown) {
   xlsx.writeFile(wb, './Book1.xlsx');
}

function dateFormat(dte: number[]) {
   let day = '';
   if (dte[1] < 10) {
      day = '0' + String(dte[1]);
   } else {
      day = String(dte[1]);
   }
   const dueDate = `${monthMap[dte[0]]} ${day} ${dte[2]}`;
   return dueDate;
}
const resetPaidExcel = () => {
   const { ws, wb } = readExcelFile();
   const value = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
   });

   // reset all paid costumer on first day of the month
   for (let x = 1; x < value.length; ++x) {
      console.log('jjj', ws[cellData(x, 8)].v);
      if (ws[cellData(x, 8)].v === String(2)) {
         ws[cellData(x, 8)].v = 0;
      }
   }
   reWrite(wb);
};

export function readExcel(): IList {
   const { ws, wb } = readExcelFile();

   // get workbook
   const values = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
   });

   let head: string[] = [];
   const names: string[] = [];
   const body: string[][] = [];

   const dueDate = new Array(values.length - 1).fill(0);
   const getDay = new Date().getDate();
   const getMonth = new Date().getMonth();

   //reset all paid costumer on first day of the month
   if (getDay === 1) {
      for (let x = 1; x < values.length; ++x) {
         if (ws[cellData(x, 8)].v === String(2)) {
            ws[cellData(x, 8)].v = 0;
         }
      }
      reWrite(wb);
   }
   values.forEach((val: string[], i: number) => {
      // get the header value in excell
      if (i === 0) {
         head = val;
      }

      // get the Body value in excell
      if (i > 0) {
         // get the body value
         body.push(val.slice(0, 6));

         // get all names
         names.push(val[1]);

         const month = Number(val[6]);
         const day = Number(val[7]);
         const dueDateData = Number(val[8]);

         if (dueDateData === 2) {
            dueDate[i - 1] = dueDateData;
         } else {
            dueDate[i - 1] =
               getDay > day && month === getMonth + 1 ? 1 : dueDateData;
         }
      }
   });

   return { head, body, names, dueDate };
}

export const writeRowExcel = (arrObject: ICustomerData) => {
   // get workbook
   const isDone = true;
   const arr: string[] = [];
   const data = Object.values(arrObject);

   // month for arr[6] ,day for arr[7], and year for arr[x]
   for (let x = 0; x < 7; x++) {
      if (x < 6) {
         // for arr[0]  to arr[5]
         if (x === 3) {
            // for due date
            arr.push(dateFormat(data[x]));
         } else {
            arr.push(data[x]);
         }
      } else {
         arr.push(data[3][0]); // for month
         arr.push(data[3][1]); // for day
         arr.push('0'); // duedate Data
      }
   }

   const { ws, wb } = readExcelFile();
   const values = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
      range: 1,
   });
   values.push(arr);

   const body = values.sort((a: any[], b: any[]) => {
      return a[7] - b[7];
   });

   xlsx.utils.sheet_add_aoa(ws, body, { origin: 'A2' });
   xlsx.writeFile(wb, './Book1.xlsx');
   return isDone;
};

export const deleteRowExcel = (data: string[]) => {
   // get workbook
   const { wb, ws, s, e } = readExcelFile();
   // read or get arr data from excel file
   const value = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
   });
   const index = value.findIndex(
      (cv: string[]) => cv[0] === data[0] && cv[1] === data[1]
   );
   if (index <= e.r && index > 0) {
      // copy its cell value from prev
      for (var R = index; R < e.r; ++R) {
         for (var C = s.c; C <= e.c; ++C) {
            ws[cellData(R, C)] = ws[cellData(R + 1, C)];
         }
      }

      e.r--;
      // move the final range for worksheet
      ws['!ref'] = xlsx.utils.encode_range(s, e);
      // write the new value file
      reWrite(wb);
   }
   return true;
};

export const updateRowExcel = (update: ICustomerData) => {
   const data = Object.values(update);
   const { wb, ws } = readExcelFile();

   const value = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
   });

   const index = value.findIndex((cv: unknown[]) => {
      return cv[0] === data[0];
   });

   ws[cellData(index, 1)].v = data[1];
   ws[cellData(index, 2)].v = data[2];
   ws[cellData(index, 3)].v = dateFormat(data[3]);
   ws[cellData(index, 4)].v = data[4];
   ws[cellData(index, 5)].v = data[5];
   ws[cellData(index, 6)].v = data[3][0];
   ws[cellData(index, 7)].v = data[3][1];

   reWrite(wb);

   return true;
};

export const paidExcel = (paid: [string, number[]]) => {
   const { wb, ws } = readExcelFile();

   const value = xlsx.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
   });

   const index = value.findIndex((cv: unknown[]) => {
      return cv[0] === paid[0];
   });
   ws[cellData(index, 3)].v = dateFormat(paid[1]);
   ws[cellData(index, 6)].v = paid[1][0];
   ws[cellData(index, 7)].v = paid[1][1];
   ws[cellData(index, 8)].v = 2;
   reWrite(wb);
   return true;
};
