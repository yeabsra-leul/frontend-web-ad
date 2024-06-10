
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Advertisement } from './definitions';
import { cookies } from 'next/headers';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const FormSchema = z.object({
    id: z.string(),
      adUrl: z.string().url({message:'Please enter a valid url.'}),
      adLocation: z.string().min(1, { message: 'This is required' }),
      adPhoneNumber: z.string().min(1, { message: 'This is required' }),
      adChannel: z.string({
        invalid_type_error: 'Please select the channel.',
      }),
      adBudget: z.coerce
      .number()
      .gt(0, { message: 'Please enter an budget greater than $0.' }),
      adHeadline1: z.string().min(1, { message: 'This is required' }),
      adHeadline2: z.string(),
      adHeadline3: z.string(),
      adTargetAudience: z.string().min(1, { message: 'This is required' }),
      adStartDate: z.string().min(1, { message: 'This is required' }),
      adEndDate: z.string().min(1, { message: 'This is required' }),
      adDescription: z.string().min(1, { message: 'This is required' }),
      adSeoKeywords: z.string()
  });

  const CreateAd = FormSchema.omit({ id: true, adHeadline2: true, adHeadline3: true, adSeoKeywords: true});
  const UpdateAd = FormSchema.omit({ id: true, adHeadline2: true, adHeadline3: true, adSeoKeywords: true});

  export type State = {
    errors?: {
      adUrl?: string[];
      adLocation?: string[];
      adPhoneNumber?: string[];
      adChannel?: string[];
      adBudget?: string[];
      adHeadline1?: string[];
      adTargetAudience?: string[];
      adStartDate?: string[];
      adEndDate?: string[];
      adDescription?: string[];
    };
    message?: string | null;
  };

export async function createAd(prevState: State, formData: FormData) {
    
    // Validate form using Zod
    const validatedFields = CreateAd.safeParse({
      adUrl: formData.get('url'),
      adLocation: formData.get('location'),
      adPhoneNumber: formData.get('phone'),
      adChannel: formData.get('channel'),
      adBudget: formData.get('budget'),
      adHeadline1: formData.get('headline1'),
      adTargetAudience: formData.get('target'),
      adStartDate: formData.get('start'),
      adEndDate: formData.get('end'),
      adDescription: formData.get('description'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Ad.',
      };
    }
   
    // Prepare data for insertion into the database
    const { adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription }= validatedFields.data;
    const adSeoKeywords =  formData.get('recommanded');
    // Insert data into the database
    try {
      const res = await fetch(`${apiUrl}/ad/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords }),
      });
      
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Ad.',
      };
    }
  // Set the notification cookie
  cookies().set('notification_create_ad', 'The ad is created successfully!');
    // Revalidate the cache for the ads page and redirect the user.
    revalidatePath('/manage');
    redirect('/manage');
  }

  export async function updateAd(id: string, prevState: State, formData: FormData) {

    // Validate form using Zod
    const validatedFields = UpdateAd.safeParse({
      adUrl: formData.get('url'),
      adLocation: formData.get('location'),
      adPhoneNumber: formData.get('phone'),
      adChannel: formData.get('channel'),
      adBudget: formData.get('budget'),
      adHeadline1: formData.get('headline1'),
      adTargetAudience: formData.get('target'),
      adStartDate: formData.get('start'),
      adEndDate: formData.get('end'),
      adDescription: formData.get('description'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Ad.',
      };
    }
   
    // Prepare data for updating the database
    const { adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription }= validatedFields.data;
    const adSeoKeywords =  formData.get('recommanded');
    try {
      const res = await fetch(`${apiUrl}/ad/api/${id}/update`, {
        method: 'POST',
        body: JSON.stringify({id, adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience,adStartDate,adEndDate,adDescription,adSeoKeywords }),
      });
    } catch (error) {
      return {
        message: 'Database Error: Failed to Update Ad.',
      };
    }
   // Set the notification cookie
    cookies().set('notification_update_ad', 'The ad is updated successfully!');
    // Revalidate the cache for the ads page and redirect the user.
    revalidatePath('/manage');
    redirect('/manage');
  }