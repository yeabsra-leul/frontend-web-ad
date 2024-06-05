'use client';
import React, { useState } from "react";
import { Advertisement, ChannelField } from '@/lib/definitions';
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";

export default function Form({ channels, ad }: { channels: ChannelField[], ad:Advertisement }) {

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

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adLocation">
                  Location:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.location}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adPhoneNumber">
                  Phone Number:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.phone}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adChannel">
                  Channel:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.channel}
              </div>
            </div>
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
                    From: {ad.start_date} To: {ad.end_date}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline1">
                  Headline 1:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.headline}
              </div>
            </div>
            {ad.headline2? (
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline2">
                  Headline 2:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.headline2}
              </div>
            </div>):null}

            {ad.headline3? (
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 3:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.headline3}
              </div>
            </div>):null}
            {ad.headline4? (
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                    Headline 4:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.headline4}
                </div>
              </div>):null}
            {ad.headline5? (
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                    Headline 5:
                  </label>
                </div>
                <div className="md:w-3/4">
                  {ad.headline5}
                </div>
              </div>): null}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adTargetAudience">
                  Target Audience:
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className='md:w-3/4'>
                  {ad.target_audience}
                </div>
              </div>
            </div>
            
            {ad.image_url? (
              <div>
                <hr /><br />
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="image-upload">
                      Images:
                    </label>
                  </div>
                  <div className="md:w-1/4 inline-flex">
                  <Image src={ad.image_url} alt={ad.image_url} width={500} height={500}/>
                  </div>
                </div>
              </div>): null}
            
            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                  Description:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.description}
              </div>
            </div>

            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adSeoKeywords">
                  SEO Keywords:
                </label>
              </div>
              <div className="md:w-3/4">
                {ad.seo_keywords}
              </div>
            </div>
          </div>
        </div>
      </div> </>
  );
}