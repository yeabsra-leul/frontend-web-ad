'use client';
import React, {useEffect, useState } from "react";
import Link from 'next/link';
import { z } from "zod";
import { Button, Textarea } from '@nextui-org/react';
import { assembleAdGroup } from "@/lib/utils";
import { createGroup } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const schema = z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      notes: z.string().min(1, { message: 'Note is required' }),
      campaign: z.string().min(1, { message: 'Please select a campaign' }),    
});

export default function Form({ campaigns }: { campaigns: any[] }) {

  const [formData, setFormData] = useState({ name: '', notes: '', campaign: ''});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const validatedData = schema.parse({
            ...formData,            
        });
        // Perform form submission, e.g., send the data to an API
        let adgData = assembleAdGroup(null,validatedData);
        const response = createGroup(adgData);;
        Cookies.set('notification_create_adgroup', 'The ad group is created successfully!');
        router.push('/group/manage');
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

  return (
    <form onSubmit={handleSubmit}>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Create Advertisement Group</h2>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/group/manage"
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
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adCampaign">
                  Campaign*
                </label>
              </div>
              <div className="md:w-3/4">
                <select
                  id="adCampaign"
                  name="campaign"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="campaign-error"
                  value={formData.campaign}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a campaign
                  </option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="campaign-error" aria-live="polite" aria-atomic="true">
                    {errors.campaign && <p className="-mt-6 text-sm text-red-500">{errors.campaign}</p>}
                </div>
              </div>
            </div>
            
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="adNotes">
                  Notes*
                </label>
              </div>
              <div className="md:w-3/4">
                <Textarea id="adNotes" 
                name="notes"
                aria-describedby="notes-error" 
                placeholder="Enter the note" 
                className="min-h-[150px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                value={formData.notes}
                onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="notes-error" aria-live="polite" aria-atomic="true">
                    {errors.notes && <p className="-mt-6 text-sm text-red-500">{errors.notes}</p>}
                </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </form>
  );
}
