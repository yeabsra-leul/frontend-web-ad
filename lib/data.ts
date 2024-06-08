import {
    ChannelField,TaskDuration,
  } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Advertisement, Task } from './definitions';

export async function fetchChannels() {
    noStore();
    try {
    //   const data = await sql<ChannelField>`
    //     SELECT
    //       id,
    //       name
    //     FROM channels
    //     ORDER BY name ASC
    //   `;
      //const channels = data.row;
      //return channels;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all channels.');
    }
  }

  export function GetAllTasks(adsAll:Advertisement[]){
    const tasks: Task[]  = [];
    const allAds = adsAll;
    allAds.forEach(ad => {
      var task:Task = {"id":0,"name":""};
      task.id = +ad.id;
      task.name = ad.headline;
      tasks.push(task);
    });
    return tasks;
  }

  export function GetAllTaskDurations(adsAll:Advertisement[]){
    const taskDuration: TaskDuration[]  = [];
    const allAds = adsAll;
    allAds.forEach(ad => {
      var taskD:TaskDuration = {"id":0,"start":"","end":"","task":0,"headline":"", "channel":"", "url":"", "budget":0};
      taskD.id = +ad.id;
      taskD.start = ad.start_date;
      taskD.end = ad.end_date;
      taskD.task = +ad.id;  
      taskD.headline = ad.headline;
      taskD.url = ad.url;
      taskD.channel = ad.channel;
      taskD.budget = ad.budget;
      taskDuration.push(taskD);
    });
    return taskDuration;
  }

  export function GetAllChannels(){
    const channels:ChannelField[] = [{id:'1',name:'Google'},{id:'2',name:'Facebook'},{id:'3',name:'Twitter'},{id:'4',name:'LinkedIn'}];
    return channels;
  }

  export function GetInitialSeoKeywords(){
    const initialSeoKeywords:string[] = ["Sample1","Sample2"];;
    return initialSeoKeywords;
  }
  
  const ITEMS_PER_PAGE = 6;
  export function GetFilteredAds(
    ads:Advertisement[],
    query: string,
    currentPage: number,
    sortColumn: string,
    sortOrder: string) 
  {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      noStore();
      try {
        const filteredAds = ads.filter(ad=>ad.headline.toLowerCase().includes(query.toLowerCase()) 
        || ad.location.toLowerCase().includes(query.toLowerCase())
        || ad.phone.toLowerCase().includes(query.toLowerCase())
        || ad.url.toLowerCase().includes(query.toLowerCase())
        || ad.channel.toLowerCase().includes(query.toLowerCase())
        || ad.start_date.toLowerCase().includes(query.toLowerCase())
        || ad.end_date.toLowerCase().includes(query.toLowerCase())
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

  export function GetFilteredAdsPages(ads:Advertisement[], query: string) {
    noStore();
    try {
      const filteredAds = ads.filter(ad=>ad.headline.toLowerCase().includes(query.toLowerCase()) 
      || ad.location.toLowerCase().includes(query.toLowerCase())
      || ad.phone.toLowerCase().includes(query.toLowerCase())
      || ad.url.toLowerCase().includes(query.toLowerCase())
      || ad.channel.toLowerCase().includes(query.toLowerCase())
      || ad.start_date.toLowerCase().includes(query.toLowerCase())
      || ad.end_date.toLowerCase().includes(query.toLowerCase())
      )
      const totalPages = Math.ceil(Number(filteredAds.length) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of ads.');
    }
  }
  