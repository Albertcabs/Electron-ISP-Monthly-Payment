import { widT } from '../types/Customer.type';
type TableHeadPros = {
   tHead: string[];
   tHeadHeight: number;
};
const TableHead = ({ tHead, tHeadHeight }: TableHeadPros) => {
   return (
      <div className='hide-SmScr z-0 min-h-max w-full text-slate-100 '>
         {tHead.length > 0 ? (
            <div
               style={{ height: `${tHeadHeight + 'px'}` }}
               className='z-20 flex   w-full bg-slate-900 text-center sm:text-xs md:text-sm  '
            >
               <section
                  style={{ width: `${widT[0]}` }}
                  className='m-auto border-r border-slate-600   '
               >
                  No.
               </section>
               {tHead.map((val, i) => {
                  return (
                     <section
                        key={i}
                        style={{
                           width: `${widT[i + 1]}`,
                        }}
                        className='m-auto border-r border-slate-600 '
                     >
                        {val}
                     </section>
                  );
               })}
               <section style={{ width: `${widT[7]}` }} className=' m-auto '>
                  Action
               </section>
            </div>
         ) : null}
      </div>
   );
};

export default TableHead;
