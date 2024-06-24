import {
    ChannelField,TaskDuration,
  } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Advertisement, Task } from './definitions';

  export function GetAllTasks(adsAll:Advertisement[]){
    const tasks: Task[]  = [];
    //const allAds = GetAllAds();
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
    //const allAds = GetAllAds();
    console.log(adsAll);
    adsAll.forEach(ad => {
      var taskD:TaskDuration = {"id":"","start":"","end":"","task":"","name":"", "channel":"", "url":"", "budget":0};
      taskD.id = ad.id;
      taskD.start = ad.startDateTime?.split('T')[0];
      taskD.end = ad.endDateTime?.split('T')[0];
      taskD.task = ad.id;  
      taskD.name = ad.name;
      taskD.url = ad.url;
      taskD.channel = ad.attributes?.filter((attr:any) => attr.type === 'channel' && attr.version === ad.version)[0].value as string;
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
    adsAll:Advertisement[],
    query: string,
    currentPage: number,
    sortColumn: string,
    sortOrder: string) 
  {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      noStore();
      try {
        //const ads = GetAllAds();
        const filteredAds = adsAll.filter(ad=>ad.name.toLowerCase().includes(query.toLowerCase()) 
        //|| ad.location.toLowerCase().includes(query.toLowerCase())
        //|| ad.phone.toLowerCase().includes(query.toLowerCase())
        || ad.url.toLowerCase().includes(query.toLowerCase())
        //|| ad.channel.toLowerCase().includes(query.toLowerCase())
        || ad.startDateTime?.toLowerCase().includes(query.toLowerCase())
        || ad.endDateTime?.toLowerCase().includes(query.toLowerCase())
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
      //const ads = GetAllAds();
      const filteredAds = adsAll.filter(ad=>ad.name.toLowerCase().includes(query.toLowerCase()) 
      //|| ad.location.toLowerCase().includes(query.toLowerCase())
      //|| ad.phone.toLowerCase().includes(query.toLowerCase())
      || ad.url.toLowerCase().includes(query.toLowerCase())
      //|| ad.channel.toLowerCase().includes(query.toLowerCase())
      || ad.startDateTime?.toLowerCase().includes(query.toLowerCase())
      || ad.endDateTime?.toLowerCase().includes(query.toLowerCase())
      )
      const totalPages = Math.ceil(Number(filteredAds.length) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of ads.');
    }
  }
  