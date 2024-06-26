'use client';
import { fetchCampaignList } from '@/lib/api';
import { GetFilteredCampaign } from '@/lib/data';
import { Campaign } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function CampaignListTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [campaignAll, setCampaign] = useState<Campaign[]>([]);
  useEffect(() => {
    fetchCampaignList().then(data => setCampaign(data.result.filter((campaign:any) => campaign.status !== 'deleted')));
  }, []);
  const handleSort = (column:string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const sortSvg = (column:string) =>
    sortColumn === column ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        {sortOrder === "desc" ? (
          <path d="M7 10l5 5 5-5z" />
        ) : (
          <path d="M7 14l5-5 5 5z" />
        )}

        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;
  const campaignList = GetFilteredCampaign(campaignAll, query, currentPage, sortColumn,sortOrder);
  return (
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md p-2 md:pt-0">            
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" onClick={() => handleSort("name")} className="px-4 py-5 font-medium sm:pl-6">
                      <p className='inline-flex cursor-pointer font-bold'>Name{sortSvg("name")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("budget")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Budget{sortSvg("budget")}</p> 
                    </th>                    
                    <th scope="col" onClick={() => handleSort("startDateTime")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Start Date{sortSvg("startDateTime")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("endDateTime")} className="px-4 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>End Date{sortSvg("endDateTime")}</p> 
                    </th>
                    <th scope="col" className="relative py-3 pl-2 pr-2 w-0.5">
                      <span className="sr-only">Detail</span>
                    </th>
                    <th scope="col" className="relative py-3 pl-2 pr-2 w-0.5">
                      <span className="sr-only">Edit</span>
                    </th>                    
                    <th scope="col" className="relative py-3 pl-2 pr-2 w-0.5">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {campaignList.map((campaign) => (
                    <tr key={campaign.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">                        
                          <p>{campaign.name}</p>
                        </div>
                      </td>                      
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {campaign.budget}
                      </td>                      
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {campaign.startDateTime?.split('T')[0]}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {campaign.endDateTime?.split('T')[0]}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                        <div className="flex gap-3">
                          {campaign.id && 'View' }                      
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                        <div className="flex gap-3">                       
                        {campaign.id && 'Update'}
                        </div>
                      </td>                      
                      <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                        <div className="flex gap-3">                         
                          {campaign.id  && 'Delete'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
