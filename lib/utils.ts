import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GetInitialSeoKeywords } from "./data";
import { Advertisement, ad_attribute } from "./definitions";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const convertToISO8601 = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const updateVersion = (oldVersion: string): string => {
  let versionArray = oldVersion.split('.');
  versionArray[2] = (parseInt(versionArray[2]) + 1).toString();
  return versionArray.join('.');
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberDigitFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export const assembleAd = (ad: Advertisement|null, formData: FormData, validatedData: any): Advertisement => {

  let adHeadline = validatedData.headline1;
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
  let imageId = formData.get('uploadedFileId')?.toString();
  let oldImageId = '';
  if (ad){
    oldImageId = ad.attributes?.filter((attr:any) => attr.type === 'image' && attr.version === ad.version)[0].value as string
  }
  
  let adData:Advertisement = {
    name: validatedData.name,
    url: validatedData.url,
    budget: validatedData.budget,
    startDateTime: convertToISO8601(validatedData.startDate),
    endDateTime: convertToISO8601(validatedData.endDate),
    expiredDateTime: "",
    media_ids: [],
    status: 'draft',
    version:'1.0.1',
    notes: validatedData.description,
  }
  adData.attributes = [];
  let ad_attr_location:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'location',
    subtype: "text",
    value:validatedData.location
  }
  let ad_attr_phone:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'phone',
    subtype: "text",
    value:validatedData.phone
  }
  let ad_attr_channel:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'channel',
    subtype: "text",
    value:validatedData.channel
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
    value:validatedData.target
  }
  let ad_attr_description:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'description',
    subtype: "text",
    value:validatedData.description
  }
  let ad_attr_keyword:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'keyword',
    subtype: "text",
    value:seo_keywords?seo_keywords:GetInitialSeoKeywords().toString()
  }
  let ad_attr_imageId:ad_attribute = {
    mandatory:true,
    version:"1.0.1",
    type:'image',
    subtype: "text",
    value: imageId?imageId:oldImageId
  }
  adData.attributes.push(ad_attr_location);
  adData.attributes.push(ad_attr_phone);
  adData.attributes.push(ad_attr_channel);
  adData.attributes.push(ad_attr_headline);
  adData.attributes.push(ad_attr_audience);
  adData.attributes.push(ad_attr_description);
  adData.attributes.push(ad_attr_keyword);
  adData.attributes.push(ad_attr_imageId);
 
  if(ad !== null){
    let updatedVersion = updateVersion(ad.version);
    adData.version = updatedVersion;
    adData.id = ad.id;
    adData.attributes.forEach(function(ad_attr){
      ad_attr.version = updatedVersion;
      if(ad && ad.attributes)
      ad_attr.id = ad.attributes.filter(x => x.type === ad_attr.type)[0].id;
    })
  }
  return adData;
};

export const assembleAdGroup = (adg: any|null, validatedData: any): any => {
  
  let adgData:any = {
    name: validatedData.name,
    notes: validatedData.notes,
    campaignId: validatedData.campaign,
    version:'1.0.1',
  }
  
  if(adg !== null){
    let updatedVersion = updateVersion(adg.version);
    adgData.version = updatedVersion;
    adgData.id = adg.id;
  }
  return adgData;
};
