'use client';
import { UpdateAd, StopAd, RepostAd, AdDetails } from '@/components/ui/button';
import {GetFilteredAds } from '@/lib/data';
import { useState } from 'react';

export default function AdsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [sortColumn, setSortColumn] = useState("headline");
  const [sortOrder, setSortOrder] = useState("asc");
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
  const ads = GetFilteredAds(query, currentPage, sortColumn,sortOrder);
  return (
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md p-2 md:pt-0">            
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" onClick={() => handleSort("headline")} className="px-4 py-5 font-medium sm:pl-6">
                      <p className='inline-flex cursor-pointer font-bold'>Headline{sortSvg("headline")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("url")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Url{sortSvg("url")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("location")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Location{sortSvg("location")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("phone")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Phone{sortSvg("phone")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("budget")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Budget{sortSvg("budget")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("channel")}  className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Channel{sortSvg("channel")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("start_date")} className="px-3 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>Start Date{sortSvg("start_date")}</p> 
                    </th>
                    <th scope="col" onClick={() => handleSort("end_date")} className="px-4 py-5 font-medium">
                      <p className='inline-flex cursor-pointer font-bold'>End Date{sortSvg("end_date")}</p> 
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {ads.map((ad) => (
                    <tr key={ad.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">                        
                          <p>{ad.headline}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.url}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.location}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.phone}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.budget}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.channel}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {ad.start_date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {ad.end_date}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex gap-3">
                          <AdDetails id={ad.id} />
                          <UpdateAd id={ad.id} />
                          <StopAd id={ad.id} />
                          <RepostAd id={ad.id} />
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
