'use client';
import React, { useState } from "react";
import { ChannelField } from '@/lib/definitions';
import Link from 'next/link';
import { createAd } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/react";
import CheckboxModal from "./select-ads-modal";


export default function CampaignForm({ channels }: { channels: ChannelField[] }) {
  const initialState = { message: "", errors: {} };
  const [selectedAds, setSelectedAds] = useState<{id: string; name: string}[]>([]);
  const [state, dispatch] = useFormState(createAd, initialState);    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSaveModal = (selectedCheckboxes: { id: string; name: string }[]) => {
    setSelectedAds(selectedCheckboxes); // Update state with selected checkboxes
    setIsModalOpen(false); // Close the modal after saving selections
  };
  
  return (
    <form action={dispatch}>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Create Campaign</h2>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" color="primary" >
            Save
          </Button>
        </div>
      </header>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[60%] space-y-6">
          <div className="grid">
          <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adName">
                  Campaign Name*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="campaignName" name="name" aria-describedby="name-error" placeholder="Enter name" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adName &&
                    state.errors.adName.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                  Campaign Target*
                </label>
              </div>
              <div className="md:w-3/4">
                <textarea id="adDescription" name="description" aria-describedby="description-error" placeholder="Enter the description" className="min-h-[150px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="description-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adDescription &&
                    state.errors.adDescription.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adChannel">
                  Channel*
                </label>
              </div>
              <div className="md:w-3/4">
                {channels.map((channel) => (
                  <label key={channel.id} className="block text-gray-500 mb-1 md:mb-0 pr-4">
                    <input type="checkbox" className="mr-3" value={channel.name} />{channel.name}
                  </label>                
                ))}
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="channel-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adChannel &&
                    state.errors.adChannel.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adBudget">
                  Budget*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adBudget" name="budget" placeholder="$" aria-describedby="budget-error" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="budget-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adBudget &&
                    state.errors.adBudget.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                  Campaign Date Range*
                </label>
              </div>
              <div className="md:w-3/4 inline-flex gap-5">
                <div className="md:w-1/2 inline-flex">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DatePicker
                      label="Start date"
                      id="adStartDate"
                      name="start"
                      className="max-w-[284px]"
                      aria-describedby="start-error"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 inline-flex">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DatePicker
                      label="End date"
                      id="adEndDate"
                      name="end"
                      className="max-w-[284px]"
                      aria-describedby="end-error"
                    />
                  </div>
                </div>
              </div>
            </div>     
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"></div>
              <div className="md:w-3/4 inline-flex">
                <div className="md:w-1/2 inline-flex">
                  <div id="start-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.adStartDate &&
                      state.errors.adStartDate.map((error: string) => (
                        <p className="-mt-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="md:w-1/2 inline-flex">
                  <div id="end-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.adEndDate &&
                      state.errors.adEndDate.map((error: string) => (
                        <p className="-mt-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                  Include Ads*
                </label>
              </div>
              <div className="md:w-3/4">
                {selectedAds &&                   
                  <div className="md:w-3/4">                  
                    <ul>
                      {selectedAds.map((selectedAd) => (<li key={selectedAd.id}>{selectedAd.id}-{selectedAd.name}</li>))}
                    </ul>
                  </div>
                } 
                <Button className='float-left' color="primary" type='button' onClick={openModal}>
                  Choose from existing Ads
                </Button>
                <CheckboxModal isOpen={isModalOpen} onRequestClose={closeModal} onSave={handleSaveModal}/>
                <a href="/ad/create" target="_blank">
                  <Button className='float-right' color="primary" type='button'>
                    Create a new Ad
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}