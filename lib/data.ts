import {
  Campaign,
  TaskDuration,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Advertisement, Task } from './definitions';

export function GetAllTasks(adsAll:Advertisement[]){
  const tasks: Task[]  = [];
  adsAll.forEach(ad => {
    var task:Task = {"id":"","name":""};
    task.id = ad.id;
    task.name = ad.name;
    tasks.push(task);
  });
  return tasks;
}

export function GetAllTaskDurations(adsAll:Advertisement[]){
  const taskDuration: TaskDuration[]  = [];
  adsAll.forEach(ad => {
    var taskD:TaskDuration = {"id":"","start":"","end":"","task":"","name":"", "channel":"", "url":"", "budget":0};
    taskD.id = ad.id;
    taskD.start = ad.startDateTime.split('T')[0];
    taskD.end = ad.endDateTime.split('T')[0];
    taskD.task = ad.id;  
    taskD.name = ad.name;
    taskD.url = ad.url;
    taskD.channel = ad.attributes?.filter((attr:any) => attr.type === 'channel' && attr.version === ad.version)[0].value as string;
    taskD.budget = ad.budget;
    taskDuration.push(taskD);
  });
  return taskDuration;
}

export function GetInitialSeoKeywords(){
  const initialSeoKeywords:string[] = ["Sample1","Sample2"];;
  return initialSeoKeywords;
}

const ITEMS_PER_PAGE = 6;
export function GetFilteredAds(
  adsAll:Advertisement[],
  query: string,
  currentPage: number,
  sortColumn: string,
  sortOrder: string) 
{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
    try {
      const filteredAds = adsAll.filter(ad=>ad.name.toLowerCase().includes(query.toLowerCase()) 
      || ad.url.toLowerCase().includes(query.toLowerCase())
      || ad.startDateTime.toLowerCase().includes(query.toLowerCase())
      || ad.endDateTime.toLowerCase().includes(query.toLowerCase())
      )
      const start = Math.min(filteredAds.length - 1, offset);
      const end = Math.min(filteredAds.length, offset + ITEMS_PER_PAGE);
      const filteredResult = filteredAds.slice(start, end);
      const sortedFilteredResult = [...filteredResult].sort((a, b) => {
        if (sortColumn) {
          if (sortOrder === "asc") {
            return (a[sortColumn as keyof Advertisement] || '' ) < (b[sortColumn as keyof Advertisement] || '' )  ? -1 : 1;
          } else {
            return (a[sortColumn as keyof Advertisement] || '' )> (b[sortColumn as keyof Advertisement] || '') ? -1 : 1;
          }
        } else {
          return 0;
        }
      });
      return sortedFilteredResult;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch ads.');
    }
}

export function GetFilteredAdsPages(adsAll:Advertisement[],query: string) {
  noStore();
  try {
    const filteredAds = adsAll.filter(ad=>ad.name.toLowerCase().includes(query.toLowerCase()) 
    || ad.url.toLowerCase().includes(query.toLowerCase())
    || ad.startDateTime.toLowerCase().includes(query.toLowerCase())
    || ad.endDateTime.toLowerCase().includes(query.toLowerCase())
    )
    const totalPages = Math.ceil(Number(filteredAds.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of ads.');
  }
}

export function GetFilteredCampaign(
  campaignList:Campaign[],
  query: string,
  currentPage: number,
  sortColumn: string,
  sortOrder: string) 
{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
    try {
      const filteredCampaignList = campaignList.filter(campaign=>campaign.name.toLowerCase().includes(query.toLowerCase())       
      || campaign.startDateTime.toLowerCase().includes(query.toLowerCase())
      || campaign.endDateTime.toLowerCase().includes(query.toLowerCase())
      )
      const start = Math.min(filteredCampaignList.length - 1, offset);
      const end = Math.min(filteredCampaignList.length, offset + ITEMS_PER_PAGE);
      const filteredResult = filteredCampaignList.slice(start, end);
      const sortedFilteredResult = [...filteredResult].sort((a, b) => {
        if (sortColumn) {
          if (sortOrder === "asc") {
            return (a[sortColumn as keyof Campaign] || '' ) < (b[sortColumn as keyof Campaign] || '' )  ? -1 : 1;
          } else {
            return (a[sortColumn as keyof Campaign] || '' )> (b[sortColumn as keyof Campaign] || '') ? -1 : 1;
          }
        } else {
          return 0;
        }
      });
      return sortedFilteredResult;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch campaigns.');
    }
}

export function GetFilteredCampaignPages(campaignList:Campaign[],query: string) {
  noStore();
  try {
    const filteredCampaigns = campaignList.filter(campaign=>campaign.name.toLowerCase().includes(query.toLowerCase()) 
    || campaign.startDateTime.toLowerCase().includes(query.toLowerCase())
    || campaign.endDateTime.toLowerCase().includes(query.toLowerCase())
    )
    const totalPages = Math.ceil(Number(filteredCampaigns.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of campaigns.');
  }
}


export function GetFilteredAdGroups(
  adGroupAll:any[],
  query: string,
  currentPage: number,
  sortColumn: string,
  sortOrder: string) 
{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
    try {
      const filteredAdGroups = adGroupAll.filter(adg=>adg.name.toLowerCase().includes(query.toLowerCase()) 
      || adg.notes.toLowerCase().includes(query.toLowerCase())
      )
      const start = Math.min(filteredAdGroups.length - 1, offset);
      const end = Math.min(filteredAdGroups.length, offset + ITEMS_PER_PAGE);
      const filteredResult = filteredAdGroups.slice(start, end);
      const sortedFilteredResult = [...filteredResult].sort((a, b) => {
        if (sortColumn) {
          if (sortOrder === "asc") {
            return (a[sortColumn as keyof any] || '' ) < (b[sortColumn as keyof any] || '' )  ? -1 : 1;
          } else {
            return (a[sortColumn as keyof any] || '' )> (b[sortColumn as keyof any] || '') ? -1 : 1;
          }
        } else {
          return 0;
        }
      });
      return sortedFilteredResult;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch ad groups.');
    }
}

export function GetFilteredAdGroupPages(adGroupAll:any[],query: string) {
  noStore();
  try {
    const filteredAdGroups = adGroupAll.filter(adg=>adg.name.toLowerCase().includes(query.toLowerCase()) 
    || adg.notes.toLowerCase().includes(query.toLowerCase())
    )
    const totalPages = Math.ceil(Number(filteredAdGroups.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of ad groups.');
  }
}