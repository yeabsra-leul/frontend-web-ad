
'use server';

import { z } from 'zod';
//import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { signIn } from '@/auth';

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
  });

  const CreateAd = FormSchema.omit({ id: true, adHeadline2: true, adHeadline3: true });
  const UpdateAd = FormSchema.omit({ id: true, adHeadline2: true, adHeadline3: true });

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

  // export async function authenticate(
  //   prevState: string | undefined,
  //   formData: FormData,
  // ) {
  //   try {
  //     await signIn('credentials', formData);
  //   } catch (error) {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case 'CredentialsSignin':
  //           return 'Invalid credentials.';
  //         default:
  //           return 'Something went wrong.';
  //       }
  //     }
  //     throw error;
  //   }
  // }


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
    //const { adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1, adHeadline2,adHeadline3,adTargetAudience,adDescription }= validatedFields.data;
   
    // Insert data into the database
    try {
    //   await sql`
    //     INSERT INTO ads (url, location, phone, channel,budget,headline1,targetAudience)
    //     VALUES (${adUrl}, ${adLocation}, ${adPhoneNumber}, ${adChannel}, ${adBudget},${adHeadline1},${adHeadline2},${adHeadline3},${adTargetAudience},${adDescription})
    //   `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Ad.',
      };
    }
   
    // Revalidate the cache for the ads page and redirect the user.
    revalidatePath('/');
    redirect('/');
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
   
    // Prepare data for insertion into the database
    //const { adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1, adHeadline2,adHeadline3,adTargetAudience,adDescription }= validatedFields.data;
   
    // Update the database data
    try {
    //   await sql`
    //     UPDATE ads 
    //     Set ...
    //     WHERE id = ${id}
    //   `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Update Ad.',
      };
    }
   
    // Revalidate the cache for the ads page and redirect the user.
    revalidatePath('/manage');
    redirect('/manage');
  }