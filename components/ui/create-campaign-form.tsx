'use client';
import React from "react";
import Link from 'next/link';
import { createCampaignAction } from '@/lib/campaignActions';
import { useFormState } from 'react-dom';
import { DatePicker } from "@nextui-org/date-picker";
import { Button, Textarea} from "@nextui-org/react";

export default function CampaignForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCampaignAction, initialState); 
  
  return (
    <form action={dispatch}>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-300 font-bold">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Create Campaign</h2>
        </div>        
      </header>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[60%] space-y-6">
          <div className="grid">
          <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignName">
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
                  {state.errors?.campaignName &&
                    state.errors.campaignName.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignBudget">
                  Budget*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="campaignBudget" name="budget" placeholder="$" aria-describedby="budget-error" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="budget-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.campaignBudget &&
                    state.errors.campaignBudget.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="campaignNotesDescription">
                  Notes
                </label>
              </div>
              <div className="md:w-3/4">
                <Textarea id="campaignNotes" name="notes" placeholder="Campaign notes" className="" />
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
                      id="campaignStartDate"
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
                      id="campaignEndDate"
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
                    {state.errors?.campaignStartDate &&
                      state.errors.campaignStartDate.map((error: string) => (
                        <p className="-mt-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="md:w-1/2 inline-flex">
                  <div id="end-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.campaignEndDate &&
                      state.errors.campaignEndDate.map((error: string) => (
                        <p className="-mt-6 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>                 
          </div>          
        </div>
      </div>
      <footer className="flex items-center justify-center px-6">
        <div className="flex justify-between px-6 w-1/2">
        <Link
          href="/campaigns/list"
          className="flex h-10 items-center rounded-lg px-4 border-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" color="primary" >Save</Button>
        </div>
      </footer>
    </form>
  );
}