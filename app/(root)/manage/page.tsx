"use client"
import Pagination from '@/components/ui/pagination';
import Search from '@mitech/shared-components/ui/search';
import AdsTable from '@/components/ui/ads-table';
import { CreateAd } from '@/components/ui/button';
import { Suspense, useEffect, useState } from 'react';
import { Metadata } from 'next';
import { GetFilteredAdsPages } from '@/lib/data';
import GanttChart from '@/components/ui/gantt-chart/gantt-chart';
import { fetchAds } from '@/lib/api';
import { Advertisement } from '@/lib/definitions';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [adsAll, setAds] = useState<Advertisement[]>([]);
  useEffect(() => {
    fetchAds().then(data => setAds(data.result.filter((ad:any) => ad.status !== 'deleted')));
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_stop_ad');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_stop_ad');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_post_ad');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_post_ad');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_delete_ad');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_delete_ad');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_create_ad');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_create_ad');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_update_ad');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_update_ad');
    }
  }, []);
  const totalPages = GetFilteredAdsPages(adsAll,query);
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
        <GanttChart adsAll={adsAll}/>          
        </div>
        </div>
    </div>    
  </div>
);
}
