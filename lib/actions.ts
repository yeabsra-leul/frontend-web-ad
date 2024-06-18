
'use client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Advertisement, ad_attribute } from './definitions';
import { GetInitialSeoKeywords } from './data';
import { createAdvertisement, updateAdvertisement } from './api';
import Cookies from 'js-cookie';
import { convertToISO8601, updateVersion } from './utils';

const FormSchema = z.object({
    id: z.string(),
      adName: z.string().min(1, { message: 'This is required' }),
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
      adName?: string[];
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

export function createAd(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateAd.safeParse({
      adName: formData.get('name'),
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
    
    let adData = assembleAd(null,formData,validatedFields)
    try {
      createAdvertisement(adData);
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Ad.',
      };
    }
    Cookies.set('notification_create_ad', 'The ad is created successfully!');
    // Revalidate the cache for the ads page and redirect the user.
    //revalidatePath('/manage');
    redirect('/manage');
  }

  export function updateAd(ad: Advertisement, prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = UpdateAd.safeParse({
      adName: formData.get('name'),
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
   
    let adData = assembleAd(ad,formData,validatedFields);
    try {
      updateAdvertisement(adData);
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Update Ad.',
      };
    }
    Cookies.set('notification_update_ad', 'The ad is updated successfully!');
    // Revalidate the cache for the ads page and redirect the user.
    redirect('/manage');
  }

  const assembleAd = (ad: Advertisement|null, formData: FormData, validatedFields: any): Advertisement => {
    const { adName, adUrl, adLocation, adPhoneNumber, adChannel, adBudget, adHeadline1,adTargetAudience, adStartDate, adEndDate, adDescription }= validatedFields.data;
    let adHeadline = adHeadline1;
    if (formData.get('headline2') !== null && formData.get('headline2')?.toString().length !== 0 ) {
      adHeadline += ', ' + formData.get('headline2');
    }
    if (formData.get('headline3') !== null && formData.get('headline3')?.toString().length !== 0 ) {
      adHeadline += ', ' + formData.get('headline3');
    }
    if (formData.get('headline4') !== null && formData.get('headline4')?.toString().length !== 0 ) {
      adHeadline += ', ' + formData.get('headline4');
    }
    if (formData.get('headline5') !== null && formData.get('headline5')?.toString().length !== 0 ) {
      adHeadline += ', ' + formData.get('headline5');
    }
    let seo_keywords = formData.get('recommanded')?.toString();
  
    let adData:Advertisement = {
      name: adName,
      url: adUrl,
      budget: adBudget,
      startDateTime: convertToISO8601(adStartDate),
      endDateTime: convertToISO8601(adEndDate),
      expiredDateTime: "",
      media_ids: [],
      status: 'draft',
      version:'1.0.1',
      notes: adDescription,
    }
    adData.attributes = [];
    let ad_attr_location:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'location',
      subtype: "text",
      value:adLocation
    }
    let ad_attr_phone:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'phone',
      subtype: "text",
      value:adPhoneNumber
    }
    let ad_attr_channel:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'channel',
      subtype: "text",
      value:adChannel
    }
    let ad_attr_headline:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'headline',
      subtype: "text",
      value:adHeadline
    }
    let ad_attr_audience:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'audience',
      subtype: "text",
      value:adTargetAudience
    }
    let ad_attr_description:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'description',
      subtype: "text",
      value:adDescription
    }
    let ad_attr_keyword:ad_attribute = {
      mandatory:true,
      version:"1.0.1",
      type:'keyword',
      subtype: "text",
      value:seo_keywords?seo_keywords:GetInitialSeoKeywords().toString()
    }
    adData.attributes.push(ad_attr_location);
    adData.attributes.push(ad_attr_phone);
    adData.attributes.push(ad_attr_channel);
    adData.attributes.push(ad_attr_headline);
    adData.attributes.push(ad_attr_audience);
    adData.attributes.push(ad_attr_description);
    adData.attributes.push(ad_attr_keyword);
    if(ad !== null){
      let updatedVersion = updateVersion(ad.version);
      adData.version = updatedVersion;
      adData.id = ad.id;
      adData.attributes.forEach(function(ad_attr){
        ad_attr.version = updatedVersion;
      })
    }
    return adData;
  };