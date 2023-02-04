import React, { useEffect } from 'react';

import { ListContext } from '../components/App';
import newDateFormat from '../function/newDateFormat';
import dateFormat from '../function/dateFormat';

import { ICustomerData } from '../../../main/global';

const initDta: ICustomerData = {
   IDNum: '',
   customerName: '',
   startDate: '',
   dueDate: [0, 0, 0],
   payment: '',
   price: 0,
};

import getNextMonth from '../function/getNextMonth';
import getDueDate from '../function/getDueDate';

// useForm functional component

export const useForm = (dateValue: number[]) => {
   const { data, setData } = React.useContext(ListContext);
   const { thisMonth, nextMonth } = newDateFormat();
   const [dVal, setDVal] = React.useState<ICustomerData>(initDta);
   const [haveChanges, setHaveChanges] = React.useState(false);

   // load default value
   // load default Values
   React.useEffect(() => {
      if (data.key.length > 1) {
         setDVal({
            IDNum: data.key[0],
            customerName: data.key[1],
            startDate: data.key[2],
            dueDate: getNextMonth(data.key[2]),
            payment: data.key[4],
            price: data.key[5],
         });
      } else {
         const ID =
            'A' +
            data.customerName.length +
            Math.floor(Math.random() * 10000 + 100000);

         setData({ ...data, newCustomer: ID.slice(0, 7) });
         setDVal({
            IDNum: ID.slice(0, 7),
            customerName: '',
            startDate: dateFormat(thisMonth),
            dueDate: nextMonth,
            payment: 'Monthly',
            price: 1000,
         });
      }
   }, []);

   // Load initial value of  form
   useEffect(() => {
      if (dateValue.length !== 0) {
         setHaveChanges(true); //check if have changes
         setDVal({
            ...dVal,
            startDate: dateFormat(dateValue),
            dueDate: getDueDate(dateValue),
         });
      }
   }, [dateValue]);

   function toTitleCase(str: string) {
      return str
         .split(/\s+/)
         .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
         .join(' ');
   }

   // onChange
   const onChange = async (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      setHaveChanges(true); //check if have changes
      let str = toTitleCase(event.target.value);
      if ('customerName' === event.target.name) {
         setDVal({
            ...dVal,
            [event.target.name]: str,
         });
      } else {
         setDVal({
            ...dVal,
            [event.target.name]: event.target.value,
         });
      }
   };

   // call back function for submit
   async function loginUserCallback() {
      // create id
      let isDone = false;

      try {
         if (data.key.length > 1) {
            isDone = await window.api.updateList(dVal);
         } else {
            isDone = await window.api.addPerson(dVal);
         }
      } catch (error: any) {
         alert('opps!!Something went wrong');
         console.log(error.message);
      }

      if (isDone) {
         setData({ ...data, key: [], showComp: 'none', reload: true });
         setHaveChanges(false);
      }
   }

   // onSubmit
   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (haveChanges) await loginUserCallback();
   };

   // return values
   return {
      onChange,
      onSubmit,
      dVal,
      setDVal,
   };
};
