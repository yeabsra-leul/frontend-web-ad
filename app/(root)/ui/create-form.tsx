'use client';
import React, { useState } from "react";
import { ChannelField } from '@/app/(root)/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/(root)/ui/button';
import { createAds } from '@/app/(root)/lib/actions';
import { useFormState } from 'react-dom';
import { DatePicker } from "@nextui-org/date-picker";

function handleAddSecondInput(showHeadline4:boolean,showHeadline5:boolean,showAddHeadlineButton:boolean) {
  if (!showHeadline4 && !showHeadline5){
    showHeadline4 = true;
  }
  else if (showHeadline4 && !showHeadline5){
    showHeadline5 = true;
    showAddHeadlineButton = false;
  }
}

export default function Form({ channels }: { channels: ChannelField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAds, initialState);
  const [addHeadline, setHeadlines] = useState({
    showHeadline4:false,
    showHeadline5:false,
    showAddHeadlineButton:true
  })

  const handleAddHeadlines = () =>{ 
      if (!addHeadline.showHeadline4 && !addHeadline.showHeadline5){
        setHeadlines(() => { 
          return { 
            showHeadline4:true,
            showHeadline5:false,
            showAddHeadlineButton:true
          }; 
        });
      }
      else if (addHeadline.showHeadline4 && !addHeadline.showHeadline5){
        setHeadlines(() => { 
          return { 
            showHeadline4:true,
            showHeadline5:true,
            showAddHeadlineButton:false
          }; 
        });
      }
  }; 
  return (
    <form action={dispatch}>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Create Ads</h2>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">
            Save
          </Button>
        </div>
      </header>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[60%] space-y-6">
          <div className="grid">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adUrl">
                  URL*
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className='md:w-3/4'>
                  <input id="adUrl" name="url" placeholder="https://" 
                  aria-describedby="url-error" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
                </div>
                <div className='md:w-1/4'>
                  <Button className='float-right' type='button'>
                    Generate info below
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="url-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adUrl &&
                    state.errors.adUrl.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adLocation">
                  Location*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adLocation" name="location" aria-describedby="location-error" placeholder="Enter location" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="location-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adLocation &&
                    state.errors.adLocation.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adPhoneNumber">
                  Phone Number*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adPhoneNumber" name="phone" aria-describedby="phone-error" placeholder="xxx-xxx-xxxx" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adPhoneNumber &&
                    state.errors.adPhoneNumber.map((error: string) => (
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
                <select
                  id="adChannel"
                  name="channel"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="channel-error"
                >
                  <option value="" disabled>
                    Select a channel
                  </option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.name}>
                      {channel.name}
                    </option>
                  ))}
                </select>
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
                  Ad Date Range*
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className="md:w-1/2 inline-flex">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DatePicker
                      label="Start date"
                      id="adStartDate"
                      name="start"
                      className="max-w-[284px]"
                      classNames={{base:"bg-blue-50",popoverContent:"bg-blue-50"}}
                      color="danger"
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
                      classNames={{base:"bg-blue-50",popoverContent:"bg-blue-50"}}
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
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline1">
                  Headline 1*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline1" name="headline1" aria-describedby="headline1-error" placeholder="Enter the 1st headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="headline1-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adHeadline1 &&
                    state.errors.adHeadline1.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline2">
                  Headline 2
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline2" placeholder="Enter the 2nd headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 3
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline3" placeholder="Enter the 3rd headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            {addHeadline.showHeadline4 && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 4
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline3" placeholder="Enter the 4th headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>)
            }
            {addHeadline.showHeadline5 && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 5
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline3" placeholder="Enter the 5th headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>)
            }
            {addHeadline.showAddHeadlineButton && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <Button className='float-left' type='button' onClick={handleAddHeadlines}>
                  Add new headline
                </Button>
              </div>
            </div> )
            }
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adTargetAudience">
                  Target Audience*
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className='md:w-3/4'>
                  <input id="adTargetAudience" name="target" aria-describedby="target-error" placeholder="Enter Target Audience" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
                </div>
                <div className='md:w-1/4'>
                  <Button className='float-right' type='button'>
                    ReGenerate
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="target-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.adTargetAudience &&
                    state.errors.adTargetAudience.map((error: string) => (
                      <p className="-mt-6 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="image-upload">
                  Image Upload
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className="flex items-center justify-center h-32 w-full border-2 border-dashed border-gray-400 rounded-lg hover:border-gray-600 transition-colors cursor-pointer" />
              </div>
            </div>
            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                  Discription*
                </label>
              </div>
              <div className="md:w-3/4">
                <textarea id="adDescription" name="description" aria-describedby="description-error" placeholder="Enter the discription" className="min-h-[150px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
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
          </div>
        </div>
      </div>
    </form>
  );
}
