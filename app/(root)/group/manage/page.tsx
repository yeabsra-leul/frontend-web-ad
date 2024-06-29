"use client"
import Pagination from '@/components/ui/pagination';
import Search from '@mitech/shared-components/ui/search';
import { CreateAdGroup } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { GetFilteredAdGroupPages } from '@/lib/data';
import { fetchCampaignList, fetchGroupList } from '@/lib/api';
import { Campaign } from '@/lib/definitions';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import AdGroupTable from '@/components/ui/ad-group-table';
import {Spinner} from "@nextui-org/react";

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
  const [campaignId, setCampaignId] = useState<string>('');
  const [campaignName, setCampaignName] = useState<string>('');
  const [adGroupAll, setAdGroupAll] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const message = Cookies.get('notification_create_adgroup');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_create_adgroup');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_update_adgroup');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_update_adgroup');
    }
  }, []);
  useEffect(() => {
    const message = Cookies.get('notification_delete_adgroup');
    function showToast() {
      toast.success(message);
    }
    if (message) {
      setTimeout(showToast, 1000);
      Cookies.remove('notification_delete_adgroup');
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowLoading(true);
    const selectedOption = event.target.selectedOptions[0];
    const campaignName = selectedOption.value;
    const campaignId = selectedOption.getAttribute('data-id') as string;
    if(campaignId !== ''){
      setCampaignId(campaignId);
      setAdGroupAll([]);
      fetchGroupList(campaignId).then(data => setAdGroupAll(data.result)).finally(() => setShowLoading(false));
    }
    if(campaignName !== ''){
      setCampaignName(campaignName);
    }
  };
  const totalPages = GetFilteredAdGroupPages(adGroupAll,query);
return ( 
  <div className="w-full">
     <header className="flex items-center justify-between px-6 py-8 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Manage Ad Group</h2>
        </div>       
      </header>
    <div className='w-full max-w-[80%] justify-center items-center m-auto'>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8">
      <select
          id="adChannel"
          name="channel"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="channel-error"
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a campaign
          </option>
          {campaigns.map((campaign: Campaign) => (
            <option key={campaign.id} value={campaign.name} data-id={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
        <CreateAdGroup />
      </div>
    </div>
    {campaignId !== '' && <div className='w-full max-w-[80%] justify-center items-center m-auto'>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8">
        <Search placeholder="Search ad..." />
      </div>
      {showLoading && <Spinner label="Loading ad groups..." color="default" />}
      {!showLoading && <AdGroupTable query={query} currentPage={currentPage} campaignId={campaignId} campaignName={campaignName}/>}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>}     
  </div>
);
}
