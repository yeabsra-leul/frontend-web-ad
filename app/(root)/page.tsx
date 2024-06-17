import Pagination from '@/components/ui/pagination';
import Search from '@mitech/shared-components/ui/search';
import AdsTable from '@/components/ui/ads-table';
import { CreateAd } from '@/components/ui/button';
import { Metadata } from 'next';
import { GetFilteredAdsPages } from '@/lib/data';
import GanttChart from '@/components/ui/gantt-chart/gantt-chart';
 
export const metadata: Metadata = {
  title: 'Manage Ads',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await GetFilteredAdsPages(query);
return ( 
  <div className="w-full">
     <header className="flex items-center justify-between px-6 py-8 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Manage Ads</h2>
        </div>       
      </header>
    <div className='w-full max-w-[80%] justify-center items-center m-auto'>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8">
        <Search placeholder="Search ad..." />
        <CreateAd />
      </div>
      <AdsTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>   
    <br /><hr />
    <div className='w-full max-w-[80%] justify-center items-center m-auto pb-40'>
      <div className="mt-4 items-center justify-center gap-2 md:mt-8">
        <div className='row'><p className='ml-3 font-bold'>AD Campaign Gantt Chart</p></div>
        <div className="row">
          <GanttChart />          
        </div>
        </div>
    </div>    
  </div>
);
}
