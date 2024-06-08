import fs from 'fs';
import path from 'path';
import { Advertisement } from './definitions';

const adsFilePath = path.join(process.cwd(), 'data', 'ads.json');

export function getAds(): Advertisement[] {
  const fileContents = fs.readFileSync(adsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAdById(id: string): Advertisement | null {
  const ads = getAds();
  return ads.find(ad => ad.id === id) || null;
}

export function createAdvertisement(adUrl:string, adLocation:string, adPhoneNumber:string, adChannel:string, adBudget:number, 
    adHeadline1:string,adTargetAudience:string,adStartDate:string,adEndDate:string,adDescription:string,adSeoKeywords:string): Advertisement {
  const ads = getAds();
  const newAd:Advertisement = {
    id: (ads.length + 1).toString(),
    url: adUrl,
    location: adLocation,
    phone: adPhoneNumber,
    channel: adChannel,
    budget: adBudget,
    headline: adHeadline1,
    target_audience: adTargetAudience,
    start_date: adStartDate,
    end_date: adEndDate,
    description: adDescription,
    seo_keywords: adSeoKeywords
  };
  console.log(ads,newAd);
  ads.push(newAd);
  fs.writeFileSync(adsFilePath, JSON.stringify(ads, null, 2));
  return newAd;
}

export function updateAdvertisement(id: string, adUrl:string, adLocation:string, adPhoneNumber:string, adChannel:string, adBudget:number, 
    adHeadline1:string,adTargetAudience:string,adStartDate:string,adEndDate:string,adDescription:string,adSeoKeywords:string): Advertisement | null {
  const ads = getAds();
  const adIndex = ads.findIndex(ad => ad.id === id);
  if (adIndex !== -1) {
    ads[adIndex] = { id, url: adUrl,
        location: adLocation,
        phone: adPhoneNumber,
        channel: adChannel,
        budget: adBudget,
        headline: adHeadline1,
        target_audience: adTargetAudience,
        start_date: adStartDate,
        end_date: adEndDate,
        description: adDescription,
        seo_keywords: adSeoKeywords};
    fs.writeFileSync(adsFilePath, JSON.stringify(ads, null, 2));
    return ads[adIndex];
  }
  return null;
}