import Image from 'next/image';
//import { lusitana } from '@/app/ui/fonts';
import Search from '@/components/ui/search';
import {
  Advertisement,
} from '@/lib/definitions';
//import { fetchFilteredAds } from '@/lib/data';
import { UpdateAd, StopAd, RepostAd } from '@/components/ui/button';
import { GetAllAds } from '@/lib/data';

export default async function AdsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  //const ads = await fetchFilteredAds(query, currentPage);
  const ads = GetAllAds();
  return (
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md p-2 md:pt-0">            
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Headline
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Url
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Budget
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Channel
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Start Date
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      End Date
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
