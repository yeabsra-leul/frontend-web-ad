'use client';
import React, { useEffect, useState } from 'react';
import { Campaign } from '@/lib/definitions';
import Link from 'next/link';
import { DatePicker } from '@nextui-org/date-picker';
import { z } from 'zod';
import { parseDate, DateValue, CalendarDate } from '@internationalized/date';
import { Button, Textarea } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { updateCampaign } from '@/lib/api';
import { assembleCampaign } from '@/lib/campaignActions';

const schema = z.object({
  campaignName: z.string().min(1, { message: 'Name is required' }),
  campaignBudget: z
    .number()
    .min(0, { message: 'Budget must be a positive number' }),
  campaignStartDate: z.preprocess(
    (arg) => (arg === '' ? undefined : arg),
    z
      .date()
      .refine((date) => date !== undefined, {
        message: 'Start date is required'
      })
  ),
  campaignEndDate: z.preprocess(
    (arg) => (arg === '' ? undefined : arg),
    z
      .date()
      .refine((date) => date !== undefined, { message: 'End date is required' })
  ),
  campaignNotes: z.string()
});

export default function Form({ campaign }: { campaign: Campaign }) {
  const [formData, setFormData] = useState({
    name: campaign.name,
    budget: campaign.budget.toString(),
    start: campaign.startDateTime.split('T')[0],
    end: campaign.endDateTime.split('T')[0],
    notes: campaign.notes
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    // Create FormData from the form element
    const formDataObj = new FormData(formElement);

    try {
      const validatedData = schema.safeParse({
        campaignName: formData.name,
        campaignBudget: parseFloat(formData.budget),
        campaignStartDate: formData.start
          ? new Date(formData.start)
          : undefined,
        campaignEndDate: formData.end ? new Date(formData.end) : undefined,
        campaignNotes: formData.notes
      });
      // Perform form submission, e.g., send the data to an API
      let campaignData = assembleCampaign(campaign, formDataObj, validatedData);
      const response = updateCampaign(campaignData);
      Cookies.set(
        'notification_update_campaign',
        'The campaign is updated successfully!'
      );
      router.push('/campaigns/list');
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };
  const handleDateChange = (name: string, date: CalendarDate | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date ? date.toString() : ''
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[60%] space-y-6">
          <div className="grid">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  htmlFor="campaignName"
                >
                  Campaign Name*
                </label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="campaignName"
                  name="name"
                  aria-describedby="name-error"
                  placeholder="Enter name"
                  type="text"
                  value={formData.name}
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="name-error" aria-live="polite" aria-atomic="true">
                  {errors.campaignName && (
                    <p className="-mt-6 text-sm text-red-500">
                      {errors.campaignName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  htmlFor="campaignBudget"
                >
                  Budget*
                </label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="campaignBudget"
                  name="budget"
                  placeholder="$"
                  aria-describedby="budget-error"
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4"> </div>
              <div className="md:w-3/4">
                <div id="budget-error" aria-live="polite" aria-atomic="true">
                  {errors.campaignBudget && (
                    <p className="-mt-6 text-sm text-red-500">
                      {errors.campaignBudget}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  htmlFor="campaignNotesDescription"
                >
                  Notes
                </label>
              </div>
              <div className="md:w-3/4">
                <Textarea
                  id="campaignNotes"
                  name="notes"
                  placeholder="Campaign notes"
                  value={formData.notes}
                  className=""
                  onChange={handleChange}
                />
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
                      value={formData.start ? parseDate(formData.start) : null}
                      onChange={(date) => handleDateChange('start', date)}
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
                      value={formData.end ? parseDate(formData.end) : null}
                      onChange={(date) => handleDateChange('end', date)}
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
                    {errors.campaignStartDate && (
                      <p className="-mt-6 text-sm text-red-500">
                        {errors.campaignStartDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2 inline-flex">
                  <div id="end-error" aria-live="polite" aria-atomic="true">
                    {errors.campaignEndDate && (
                      <p className="-mt-6 text-sm text-red-500">
                        {errors.campaignEndDate}
                      </p>
                    )}
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
          <Button type="submit" color="primary">
            Save Update
          </Button>
        </div>
      </footer>
    </form>
  );
}
