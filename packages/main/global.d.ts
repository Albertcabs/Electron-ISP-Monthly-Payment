export interface IList {
   head: string[];
   body: string[][];
   names: string[];
   dueDate: number[];
}

export interface ICustomerData {
   IDNum: string;
   customerName: string;
   startDate: string;
   dueDate: number[];
   payment: string;
   price: number;
}
