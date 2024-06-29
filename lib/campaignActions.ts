
'use client';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { Campaign } from './definitions';
import { createCampaign, updateCampaign } from './api';
import Cookies from 'js-cookie';
import { convertToISO8601, updateVersion } from './utils';

const FormSchema = z.object({
    id: z.string(),
    campaignName: z.string().min(1, { message: 'Please enter a name' }),      
    campaignBudget: z.coerce.number().gt(0, { message: 'Please enter an budget greater than $0.' }),   
    campaignStartDate: z.string().min(1, { message: 'This is required' }),
    campaignEndDate: z.string().min(1, { message: 'This is required' }),
    campaignNotes: z.string(),   
  });

  const CreateCampaignAction = FormSchema.omit({ id: true });
  const UpdateCampaignAction = FormSchema.omit({ id: true });

  export type State = {
    errors?: {
      campaignName?: string[];
      campaignBudget?: string[];      
      campaignStartDate?: string[];
      campaignEndDate?: string[];
      campaignNotes?: string[];
    };
    message?: string | null;
  };

export function createCampaignAction(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateCampaignAction.safeParse({
      campaignName: formData.get('name'),
      campaignBudget: formData.get('budget'),      
      campaignStartDate: formData.get('start'),
      campaignEndDate: formData.get('end'),
      campaignNotes: formData.get('notes'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Campaign.',
      };
    }
    
    let campaignData = assembleCampaign(null,formData,validatedFields)
    try {
      createCampaign(campaignData);
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Campaign.',
      };
    }
    Cookies.set('notification_create_campaign', 'The campaign is created successfully!');    
    redirect('/campaigns/list');
  }

  export function updateCampaignAction(campaign: Campaign, prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = UpdateCampaignAction.safeParse({
      campaignName: formData.get('name'),
      campaignBudget: formData.get('budget'),      
      campaignStartDate: formData.get('start'),
      campaignEndDate: formData.get('end'),
      campaignNotes: formData.get('notes'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Campaign.',
      };
    }
   
    let campaignData = assembleCampaign(campaign,formData,validatedFields);
    try {
      updateCampaign(campaignData);
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Update Campaign.',
      };
    }
    Cookies.set('notification_update_campaign', 'The campaign is updated successfully!');    
    redirect('/campaigns/list');
  }

  export const assembleCampaign = (campaign: Campaign | null, formData: FormData, validatedFields: any): Campaign => {
    const { campaignName, campaignBudget, campaignStartDate, campaignEndDate, campaignNotes }= validatedFields.data;   
  
    let campaignData:Campaign = {
      name: campaignName,      
      budget: campaignBudget,
      startDateTime: convertToISO8601(campaignStartDate),
      endDateTime: convertToISO8601(campaignEndDate),
      status: 'draft',
      version:'1.0.1',
      notes: campaignNotes,
    }    
    
    if(campaign !== null){
      let updatedVersion = updateVersion(campaign.version);
      campaignData.version = updatedVersion;
      campaignData.id = campaign.id;
    }
    return campaignData;
  };
