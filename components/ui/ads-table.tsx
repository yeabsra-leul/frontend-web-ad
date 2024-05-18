import Image from 'next/image';
//import { lusitana } from '@/app/ui/fonts';
import Search from '@/components/ui/search';
import {
  Advertisement,
} from '@/lib/definitions';
//import { fetchFilteredAds } from '@/lib/data';
import { UpdateAd, StopAd, RepostAd } from '@/components/ui/button';

export default async function AdsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  //const ads = await fetchFilteredAds(query, currentPage);
  const ads:Advertisement[] = [{id:'1', headline:'The best drink', url:'http://www.drink.com', location:'address1', phone:'800-000-0001', 
                                channel: 'Google', budget:'20000', start_date:'20240101', end_date:'20240430', target_audience:'teenager', seo_keywords:'sample1, sample2'},
                                {id:'2', headline:'The best food', url:'http://www.food.com', location:'address2', phone:'800-000-0002', 
                                channel: 'Facebook', budget:'30000', start_date:'20240201', end_date:'20240331', target_audience:'yang people ', seo_keywords:'sample1, sample2'},
                                {id:'3', headline:'The best car', url:'http://www.car.com', location:'address3', phone:'800-000-0003', 
                                channel: 'Twitter', budget:'300000', start_date:'20240111', end_date:'20240531', target_audience:'Business guys ', seo_keywords:'sample1, sample2'},
                                {id:'4', headline:'The best bowl', url:'http://www.bowl.com', location:'address4', phone:'800-000-0004', 
                                channel: 'LinkedIn', budget:'60000', start_date:'20240116', end_date:'20240526', target_audience:'house wife ', seo_keywords:'sample1, sample2'},];
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
