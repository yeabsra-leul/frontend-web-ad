'use client';
import React, {useEffect, useState } from "react";
import Link from 'next/link';
import { DatePicker } from "@nextui-org/date-picker";
import { GetInitialSeoKeywords } from "@/lib/data";
import ImageUploader from '@/components/ui/media-uploader';
import { z } from "zod";
import { parseDate, DateValue, CalendarDate } from '@internationalized/date';
import { Button, Textarea } from '@nextui-org/react';
import { assembleAd } from "@/lib/utils";
import { createAdvertisement } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const schema = z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      url: z.string().url({message:'Please enter a valid url.'}),
      location: z.string().min(1, { message: 'Location is required' }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      channel: z.string().min(1, { message: 'Please select a channel' }),
      budget: z.number().min(0, { message: "Budget must be a positive number" }),
      headline1: z.string().min(1, { message: 'Headline1 is required' }),
      target: z.string().min(1, { message: 'Target is required' }),
      startDate: z.preprocess((arg) => arg === '' ? undefined : arg, z.date().refine((date) => date !== undefined, { message: "Start date is required" })),
      endDate: z.preprocess((arg) => arg === '' ? undefined : arg, z.date().refine((date) => date !== undefined, { message: "End date is required" })),
      description: z.string().min(1, { message: 'Description is required' }),
      image: z.string().min(1, { message: 'Image is required' }),
});

export default function Form({ channels }: { channels: any[] }) {

  const [formData, setFormData] = useState({ name: '', url: '', location: '', phone: '', channel: '', budget: '', headline1: '', target: '', start: '', end: '', description: '', image:''});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    // Create FormData from the form element
    const formDataObj = new FormData(formElement);
    if (uploadedFile) {
      formDataObj.append('uploadedFileId', uploadedFile.id);
    }
    console.log('Form data:', Array.from(formDataObj.entries()));
    try {
        const validatedData = schema.parse({
            ...formData,
            startDate: formData.start ? new Date(formData.start) : undefined,
            endDate: formData.end ? new Date(formData.end) : undefined,
            budget: formData.budget !== '' ? parseFloat(formData.budget) : undefined,
        });
        // Perform form submission, e.g., send the data to an API
        let adData = assembleAd(null,formDataObj,validatedData);
        const response = createAdvertisement(adData);;
        Cookies.set('notification_create_ad', 'The ad is created successfully!');
        router.push('/manage');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorDetails: { [key: string]: string } = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    errorDetails[err.path[0]] = err.message;
                }
            });
            setErrors(errorDetails);
        }
    }
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
      ...prevData,
      [name]: value,
  }));
  setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
  }));
};
const handleDateChange = (name: string, date: CalendarDate | null) => {
  setFormData((prevData) => ({
      ...prevData,
      [name]: date ? date.toString() : '',
  }));
  setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
  }));
};
  const [addHeadline, setHeadlines] = useState({
    showHeadline4:false,
    showHeadline5:false,
    showAddHeadlineButton:true
  })
  const initialSeo = GetInitialSeoKeywords();
  const [inputsRecommanded, setInputs] = useState(initialSeo);
  const [valueSeoInput, setValue] = useState('');

  const [seoButtons, setSeoButtons] = useState({
    disableAddButton:true,
    disableRefreshButton:true
  })
  const handleAddInput = () => {
    let onChangeValue = [...inputsRecommanded];
    onChangeValue.push(valueSeoInput);
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
    setInputs(initialSeo);
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

  const [uploadedFile, setUploadedFile] = useState<any | null>(null);

  const handleUploadComplete = (file: any) => {
    setUploadedFile(file);
      setFormData((prevData) => ({
        ...prevData,
        ["image"]: file.id,
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        ["image"]: '',
    }));
  };
  useEffect(() => {
    console.log('uploaded file updated:', uploadedFile);
  }, [uploadedFile]);
  return (
    <form onSubmit={handleSubmit}>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Create Advertisement</h2>
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
                  Name*
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adName" 
                name="name" 
                aria-describedby="name-error" 
                placeholder="Enter namae" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                value={formData.name}
                onChange={handleChange} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    {errors.name && <p className="-mt-6 text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adUrl">
                  URL*
                </label>
              </div>
              <div className="md:w-3/4 inline-flex">
                <div className='md:w-3/4'>
                  <input id="adUrl" 
                  name="url" 
                  placeholder="https://" 
                  aria-describedby="url-error" 
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                  type="text" 
                  value={formData.url}
                  onChange={handleChange} />
                </div>
                <div className='md:w-1/4'>
                  <Button className='float-right' color="primary" type='button'>
                    Generate info below
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="url-error" aria-live="polite" aria-atomic="true">
                    {errors.url && <p className="-mt-6 text-sm text-red-500">{errors.url}</p>}
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
                <input id="adLocation" 
                name="location" 
                aria-describedby="location-error" 
                placeholder="Enter location" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                value={formData.location}
                onChange={handleChange} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="location-error" aria-live="polite" aria-atomic="true">
                    {errors.location && <p className="-mt-6 text-sm text-red-500">{errors.location}</p>}
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
                <input id="adPhoneNumber" 
                name="phone" 
                aria-describedby="phone-error" 
                placeholder="xxx-xxx-xxxx" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                value={formData.phone}
                onChange={handleChange}/>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                    {errors.phone && <p className="-mt-6 text-sm text-red-500">{errors.phone}</p>}
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
                  value={formData.channel}
                  onChange={handleChange}
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
                    {errors.channel && <p className="-mt-6 text-sm text-red-500">{errors.channel}</p>}
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
                <input id="adBudget" 
                name="budget" 
                placeholder="$" 
                aria-describedby="budget-error" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                value={formData.budget}
                onChange={handleChange}/>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="budget-error" aria-live="polite" aria-atomic="true">
                    {errors.budget && <p className="-mt-6 text-sm text-red-500">{errors.budget}</p>}
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
                      value={formData.start ? parseDate(formData.start) : null} 
                      onChange={(date) => handleDateChange("start", date)} 
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
                      value={formData.end ? parseDate(formData.end) : null} 
                      onChange={(date) => handleDateChange("end", date)} 
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
                      {errors.start && <p className="-mt-6 text-sm text-red-500">{errors.start}</p>}
                  </div>
                </div>
                <div className="md:w-1/2 inline-flex">
                  <div id="end-error" aria-live="polite" aria-atomic="true">
                      {errors.end && <p className="-mt-6 text-sm text-red-500">{errors.end}</p>}
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
                <input id="adHeadline1" 
                name="headline1" 
                aria-describedby="headline1-error" 
                placeholder="Enter the 1st headline" 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                type="text" 
                value={formData.headline1}
                onChange={handleChange}/>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="headline1-error" aria-live="polite" aria-atomic="true">
                    {errors.headline1 && <p className="-mt-6 text-sm text-red-500">{errors.headline1}</p>}
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
                <input id="adHeadline2" name="headline2" placeholder="Enter the 2nd headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline3">
                  Headline 3
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline3" name="headline3" placeholder="Enter the 3rd headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>
            {addHeadline.showHeadline4 && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline4">
                  Headline 4
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline4" name="headline4" placeholder="Enter the 4th headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
              </div>
            </div>)
            }
            {addHeadline.showHeadline5 && (
              <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adHeadline5">
                  Headline 5
                </label>
              </div>
              <div className="md:w-3/4">
                <input id="adHeadline5" name="headline5" placeholder="Enter the 5th headline" className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" />
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
                  <input id="adTargetAudience" 
                  name="target" 
                  aria-describedby="target-error" 
                  placeholder="Enter Target Audience" 
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                  type="text" 
                  value={formData.target}
                  onChange={handleChange}
                  />
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
                    {errors.target && <p className="-mt-6 text-sm text-red-500">{errors.target}</p>}
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
              <ImageUploader onUploadComplete={handleUploadComplete} imageLink=""/>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="target-error" aria-live="polite" aria-atomic="true">
                    {errors.image && <p className="-mt-6 text-sm text-red-500">{errors.image}</p>}
                </div>
              </div>
            </div>
            <hr /><br />
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adDescription">
                  Description*
                </label>
              </div>
              <div className="md:w-3/4">
                <Textarea id="adDescription" 
                name="description" 
                aria-describedby="description-error" 
                placeholder="Enter the description" 
                className="min-h-[150px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                value={formData.description}
                onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {errors.description && <p className="-mt-6 text-sm text-red-500">{errors.description}</p>}
                </div>
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
                      <input id="adRecommandedSeo" name="recommanded" type="text" value={inputsRecommanded} readOnly className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
                      <Button disabled={seoButtons.disableRefreshButton} color="primary" className='float-right ml-4 disabled:bg-gray-200 disabled:text-gray-500' type='button' onClick={handleRefresh}>
                        Refresh
                      </Button>
                    </div>
                  </div>
                 <div className="inline-flex">
                    <div className='md:w-3/4'>
                      <input id="adSeoKeywords" name="seo" placeholder="keyword1, keyword2, ..." 
                      className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                      type="text" 
                      value={valueSeoInput}
                      onChange={event => handleInputChange(event)}
                      />
                    </div>
                    <div className='md:w-1/4'>
                      <Button disabled={seoButtons.disableAddButton} color="primary" className='float-right disabled:bg-gray-200 disabled:text-gray-500' type='button' onClick={handleAddInput}>
                        New SEO Keywords
                      </Button>
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
