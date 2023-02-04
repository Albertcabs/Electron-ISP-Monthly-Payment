import { monthMap } from '../types/Customer.type';
const getNextMonth = (dateArr: string) => {
   let month = 0;
   let day = 0;
   let year = 0;
   if (dateArr.length === 10) {
      month = monthMap.findIndex((val) => val === dateArr.slice(0, 3));
      day = Number(dateArr.slice(4, 5));
      year = Number(dateArr.slice(5, 10));
   } else {
      month = monthMap.findIndex((val) => val === dateArr.slice(0, 3));
      day = Number(dateArr.slice(4, 6));
      year = Number(dateArr.slice(7, 11));
   }

   // get nextMonth
   let nextMonth = [0, 0, 0];
   //check  if month is from Febuary to November
   if (month !== 11 && month !== 0) {
      nextMonth = [month + 1, day, year];
   } else if (month === 11) {
      //check  if month is December
      nextMonth = [0, day, year + 1];
   } else {
      // check if  month is january and check day 28 to day 29

      if (day > 28) {
         const getfeb2829 = new Date(year, 2, 0).getDate();
         nextMonth = [1, getfeb2829, year];
      } else {
         nextMonth = [1, day, year];
      }
   }

   return nextMonth;
};

export default getNextMonth;
