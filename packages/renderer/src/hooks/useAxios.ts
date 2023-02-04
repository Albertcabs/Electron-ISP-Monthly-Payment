import { useState, useEffect } from 'react';

const useAxios = (reload: boolean) => {
   const [resHead, setResHead] = useState<any[]>([]);
   const [resBody, setResBody] = useState<any[]>([]);
   const [names, setNames] = useState<any[]>([]);
   const [dueDate, setDueDate] = useState<any[]>([]);

   const [errMessage, setErrMessage] = useState('');
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         const response = await window.api.readFile();
         const { head, body, names, dueDate } = response;
         setResHead(head);
         setResBody(body);
         setNames(names);
         setDueDate(dueDate);
      } catch (err: any) {
         setErrMessage(err.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      //let isMounted = true;
      const controller = new AbortController();
      // call the function

      fetchData();

      // useEffect cleanup function

      return () => controller.abort();
      // eslint-disable-next-line
   }, [reload]);

   return { errMessage, loading, resHead, resBody, names, dueDate };
};

export default useAxios;
