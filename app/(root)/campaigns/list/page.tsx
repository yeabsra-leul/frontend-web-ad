"use client"
import Pagination from '@/components/ui/pagination';
import Search from '@mitech/shared-components/ui/search';
import CampaignListTable from '@/components/ui/campaign-table';
import { useEffect, useState } from 'react';
import { GetFilteredCampaignPages } from '@/lib/data';
import { fetchCampaignList } from '@/lib/api';
import { Campaign } from '@/lib/definitions';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusIcon, PencilIcon, StopIcon, EyeIcon, TrashIcon, ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  useEffect(() => {
    fetchCampaignList().then(data => setCampaigns(data.result.filter((ad:any) => ad.status !== 'deleted')));
  }, []);  
  useEffect(() => {
    const message = Cookies.get('notification_delete_campaign');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_delete_campaign');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_create_campaign');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_create_campaign');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_update_campaign');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_update_campaign');
    }
  }, []);
  const totalPages = GetFilteredCampaignPages(campaigns,query);
return ( 
  <div className="w-full">     
      <header className="flex items-center justify-between px-6 py-4 bg-gray-300 font-bold">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Campaign List</h2>
        </div>        
      </header>
      <div className='w-full max-w-[85%] justify-center items-center m-auto'>
        <div className="mt-4 flex items-center justify-center gap-2 md:mt-8">
          <Search placeholder="Search campaign" />
          <Link href="/campaigns/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="hidden md:block">Create New Campaign</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </div>
        <CampaignListTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
  </div>
);
}
