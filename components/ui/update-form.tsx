'use client';
import React, { useState } from "react";
import { Advertisement, ChannelField } from '@/lib/definitions';
import Link from 'next/link';
import { updateAd } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { DatePicker } from "@nextui-org/date-picker";
import { FileUpload } from '@/components/ui/file-upload';
import {parseDate} from "@internationalized/date";
import { GetInitialSeoKeywords } from "@/lib/data";
import { Button} from "@nextui-org/react";

export default function Form({ channels, ad }: { channels: ChannelField[], ad:Advertisement }) {
  const initialState = { message: "", errors: {} };
  const updateAdWithId = updateAd.bind(null, ad.id);
  const [state, dispatch] = useFormState(updateAdWithId, initialState);
  const [addHeadline, setHeadlines] = useState({
    showHeadline4:false,
    showHeadline5:false,
    showAddHeadlineButton:true
  })
  const initialSeoKeywords = GetInitialSeoKeywords();
  const oldSeoKeywords = ad.seo_keywords.split(',');
  console.log(oldSeoKeywords);
  const [inputsRecommanded, setInputs] = useState(oldSeoKeywords);
  const [valueSeoInput, setValue] = useState('');

  const [seoButtons, setSeoButtons] = useState({
    disableAddButton:true,
    disableRefreshButton:true
  })
  const handleAddInput = () => {
    let onChangeValue = [...inputsRecommanded];
    onChangeValue.push(valueSeoInput);
    console.log(onChangeValue);
    setInputs(onChangeValue);
    setSeoButtons(() =>{
      return {
        disableAddButton:true,
        disableRefreshButton:false
      }
    })
  };

  const handleRefresh = () => {
    setValue("");
    setInputs(initialSeoKeywords);
    setSeoButtons(() =>{
      return {
        disableAddButton:true,
        disableRefreshButton:true
      }
    })
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value;
    setValue(inputValue);
    setSeoButtons(() =>{
      return {
        disableAddButton:false,
        disableRefreshButton:true
      }
    })
  }

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
          <h2 className="text-lg font-medium">Update Advertisement</h2>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/manage"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" color="primary">
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
                  <input 
                  id="adUrl" 
                  name="url" 
                  placeholder="https://" 
                  aria-describedby="url-error" 
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                  type="text" 
                  defaultValue={ad.url}/>
                </div>
                <div className='md:w-1/4'>
                  <Button className='float-right' type='button' color="primary">
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
                <input 
                id="adLocation" 
                name="location" 
                aria-describedby="location-error" 
                placeholder="Enter location" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                defaultValue={ad.location}/>
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
                <input 
                id="adPhoneNumber" 
                name="phone" 
                aria-describedby="phone-error" 
                placeholder="xxx-xxx-xxxx" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                defaultValue={ad.phone}/>
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
                  defaultValue={ad.channel}
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
                <input 
                id="adBudget" 
                name="budget" 
                placeholder="$" 
                aria-describedby="budget-error" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                defaultValue={ad.budget}/>
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
                      aria-describedby="start-error"
                      defaultValue={parseDate(ad.start_date)}
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
                      defaultValue={parseDate(ad.end_date)}
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
                <input 
                id="adHeadline1" 
                name="headline1" 
                aria-describedby="headline1-error" 
                placeholder="Enter the 1st headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                defaultValue={ad.headline}/>
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
                <input id="adHeadline2" 
                placeholder="Enter the 2nd headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 3
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline3" 
                placeholder="Enter the 3rd headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" />
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
                <input id="adHeadline4" 
                placeholder="Enter the 4th headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" />
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
                <input id="adHeadline5" 
                placeholder="Enter the 5th headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" />
              </div>
            </div>)
            }
            {addHeadline.showAddHeadlineButton && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <Button className='float-left' color="primary" type='button' onClick={handleAddHeadlines}>
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
                  <input 
                  id="adTargetAudience" 
                  name="target" 
                  aria-describedby="target-error" 
                  placeholder="Enter Target Audience" 
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                  type="text" 
                  defaultValue={ad.target_audience}/>
                </div>
                <div className='md:w-1/4'>
                  <Button className='float-right' color="primary" type='button'>
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
                  Image Upload (logo, square, rectangular)
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <FileUpload/>
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
                <textarea 
                id="adDescription" 
                name="description" 
                aria-describedby="description-error" 
                placeholder="Enter the discription" 
                className="min-h-[150px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                defaultValue={ad.description}
                />
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
            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adSeoKeywords">
                  SEO Keywords
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className="grid grid-rows-2 grid-flow-col gap-2 w-full">
                  <div className="inline-flex">
                    <div className='md:w-1/4 m-auto'>
                      <label htmlFor="adRecommandedSeo">Recommanded</label>
                    </div>
                    <div className='md:w-3/4 inline-flex'>
                      <input 
                      id="adRecommandedSeo" 
                      name="recommanded" 
                      type="text" 
                      defaultValue={ad.seo_keywords}
                      value={inputsRecommanded} 
                      readOnly 
                      className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                      />
                      <Button disabled={seoButtons.disableRefreshButton} color="primary" className='float-right ml-4 disabled:bg-gray-200 disabled:text-gray-500' type='button' onClick={handleRefresh}>
                        Refresh
                      </Button>
                    </div>
                  </div>
                 <div className="inline-flex">
                    <div className='md:w-3/4'>
                      <input 
                      id="adSeoKeywords" 
                      name="seo" 
                      placeholder="keyword1, keyword2, ..." 
                      className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                      type="text" 
                      value={valueSeoInput}
                      onChange={event => handleInputChange(event)}
                      />
                    </div>
                    <div className='md:w-1/4'>
                      <Button disabled={seoButtons.disableAddButton} color="primary" className='float-right disabled:bg-gray-200 disabled:text-gray-500' type='button' onClick={handleAddInput}>
                        Add New SEO Keywords
                      </Button>
                    </div>                  
                 </div>
                </div>                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
