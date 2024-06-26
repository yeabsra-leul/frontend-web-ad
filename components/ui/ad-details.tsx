'use client';
import React, { useEffect, useState } from "react";
import { Advertisement, ChannelField, ad_attribute } from '@/lib/definitions';
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { fetchImage } from "@/lib/api";

export default function Form({ channels, ad }: { channels: ChannelField[], ad:any }) {
  const [imageLink, setImageLink] = useState<string>('');
  const imageId = ad.attributes.filter((attr:any) => attr.type === 'image' && attr.version === ad.version)[0].value;
  useEffect(() => {
    fetchImage(imageId).then(data => setImageLink(data.result.link));
  }, [imageId]);
  return (
    <> <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-medium">Advertisement Details</h2>
      </div>
      <div className="flex justify-end gap-4">
          <Link
            href="/ad/manage"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back
          </Link>
        </div>
    </header>
    <div className="flex justify-center py-8">
        <div className="w-full max-w-[60%] space-y-6">
          <div className="grid">
          <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adName">
                  Name:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.name}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adUrl">
                  URL:
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className='md:w-3/4'>
                  {ad.url}
                </div>
              </div>
            </div>
            {ad.attributes.filter((attr:any) => attr.type === 'headline' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline">
                    Headline:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'headline' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }
            {ad.attributes.filter((attr:any) => attr.type === 'location' && attr.version === ad.version)[0] && 
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adLocation">
                    Location:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'location' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }
            {ad.attributes.filter((attr:any) => attr.type === 'phone' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adPhoneNumber">
                    Phone Number:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'phone' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }
            {ad.attributes.filter((attr:any) => attr.type === 'channel' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adChannel">
                    Channel:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'channel' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adBudget">
                  Budget:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.budget}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                  Ad Date Range:
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className="md:w-1/2 inline-flex">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    From: {ad.startDateTime.split('T')[0]} To: {ad.endDateTime.split('T')[0]}
                  </div>
                </div>
              </div>
            </div>           
            {ad.attributes.filter((attr:any) => attr.type === 'audience' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adTargetAudience">
                    Target Audience:
                  </label>
                </div>
                <div className="md:w-3/4 inline-flex">
                  <div className='md:w-3/4'>
                    {ad.attributes.filter((attr:any) => attr.type === 'audience' && attr.version === ad.version)[0].value}
                  </div>
                </div>
              </div>
            }
            
            {ad.attributes.filter((attr:any) => attr.type === 'image' && attr.version === ad.version)[0] && 
              <div>
                <hr /><br />
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="image-upload">
                      Images:
                    </label>
                  </div>
                  <div className="md:w-1/4 inline-flex">
                  <Image src={imageLink} alt={ad.attributes.filter((attr:any) => attr.type === 'image')[0].value} width={500} height={500}/>
                  </div>
                </div>
              </div>
            }
            
            <hr /><br />
            {ad.attributes.filter((attr:any) => attr.type === 'description' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                    Description:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'description' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }

            <hr /><br />
            {ad.attributes.filter((attr:any) => attr.type === 'keyword' && attr.version === ad.version)[0] &&
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adSeoKeywords">
                    SEO Keywords:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.attributes.filter((attr:any) => attr.type === 'keyword' && attr.version === ad.version)[0].value}
                </div>
              </div>
            }
          </div>
        </div>
      </div> </>
  );
}