'use client';
import { UpdateAdGroup, DeleteAdGroup } from '@/components/ui/button';
import { fetchGroupList } from '@/lib/api';
import {GetFilteredAdGroups, GetFilteredAds } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function AdGroupTable({
  query,
  currentPage,
  campaignId,
  campaignName,
}: {
  query: string,
  currentPage: number,
  campaignId:string,
  campaignName:string,
}) {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [adGroupAll, setAdGroupAll] = useState<any[]>([]);
  useEffect(() => {
    fetchGroupList(campaignId).then(data => setAdGroupAll(data.result));
  }, [campaignId]);
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
  const adGroups = GetFilteredAdGroups(adGroupAll, query, currentPage, sortColumn,sortOrder);
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
                    <th scope="col" onClick={() => handleSort("campaign")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Canpaign{sortSvg("campaign")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("notes")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Notes{sortSvg("notes")}</p> 
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
                  {adGroups.map((adg) => (
                    <tr key={adg.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">                        
                          <p>{adg.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {campaignName}
                      </td>
                     
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {adg.notes}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                        <div className="flex gap-3">                       
                        {adg.id && <UpdateAdGroup id={adg.id} />}
                        </div>
                      </td>                     
                      <td className="whitespace-nowrap py-3 pl-2 pr-2 w-0.5">
                        <div className="flex gap-3">                         
                          {adg.id &&<DeleteAdGroup id={adg.id} />}
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
