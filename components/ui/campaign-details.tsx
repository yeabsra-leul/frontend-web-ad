'use client';

import React, { useEffect, useState } from "react";

export default function CampaignDetail({ campaign }: { campaign:any }) {  
  
  return (
         
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[80%] space-y-6">
          <div className="grid">
          <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignName">
                  Campaign Name
                </label>
              </div>
              <div className="md:w-3/4">
                {campaign.name}
              </div>
            </div>            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignBudget">
                  Budget
                </label>
              </div>
              <div className="md:w-3/4">
                {campaign.budget}
              </div>
            </div>            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignNotesDescription">
                  Notes
                </label>
              </div>
              <div className="md:w-3/4">
                {campaign.notes}
              </div>
            </div>                
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                  Campaign Date Range
                </label>
              </div>
              <div className="md:w-3/4 inline-flex gap-5">
                <div className="md:w-1/2 inline-flex">
                  From: {campaign.startDateTime.split('T')[0]}  To: {campaign.endDateTime.split('T')[0]}                  
                </div>
              </div>
            </div>      
          </div>          
        </div>
      </div>
      
  );
}