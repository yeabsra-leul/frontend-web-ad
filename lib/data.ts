import {
  ChannelField,
  TaskDuration,
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

export function GetAllTasks(){
  const tasks: Task[]  = [];
  const allAds = GetAllAds();
  allAds.forEach(ad => {
    var task:Task = {"id":0,"name":""};
    task.id = +ad.id;
    task.name = ad.headline;
    tasks.push(task);
  });

  return tasks;
}
export function GetAllTaskDurations(){
  const taskDuration: TaskDuration[]  = [];
  const allAds = GetAllAds();
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

export function GetAllAds(){
  const ads:Advertisement[] = [{id:'1', headline:'The sweet drink', url:'http://www.drink.com', location:'address1', phone:'800-000-0001', 
                              channel: 'Google', budget:20000, start_date:'2024-01-01', end_date:'2024-01-13', target_audience:'teenager', 
                              seo_keywords:'sample1,sample2, drink,sweet', description:'drink for teenager'},
                              {id:'2', headline:'The most delicious food', url:'http://www.food.com', location:'address2', phone:'800-000-0002', 
                              channel: 'Facebook', budget:30000, start_date:'2024-02-01', end_date:'2024-02-15', target_audience:'yang people ', 
                              seo_keywords:'sample1,sample2,food,delicious', description:'food for yang people'},
                              {id:'3', headline:'The electric car', url:'http://www.car.com', location:'address3', phone:'800-000-0003', 
                              channel: 'Twitter', budget:300000, start_date:'2024-01-11', end_date:'2024-02-19', target_audience:'Business guys ', 
                              seo_keywords:'sample1,sample2,car,electric', description:'car for business guys'},
                              {id:'4', headline:'The big bowl', url:'http://www.bowl.com', location:'address4', phone:'800-000-0004', 
                              channel: 'LinkedIn', budget:60000, start_date:'2024-01-16', end_date:'2024-03-16', target_audience:'house wife ', 
                              seo_keywords:'sample1,sample2,bowl,big', description:'bowl for house wife'},
                              {id:'5', headline:'The clearest tv', url:'http://www.tv.com', location:'address5', phone:'800-000-0005', 
                              channel: 'Google', budget:90000, start_date:'2024-02-16', end_date:'2024-03-09', target_audience:'old guys ', 
                              seo_keywords:'sample1,sample2,tv,clear', description:'tv for old guys'},
                              {id:'6', headline:'The cheapest laptop', url:'http://www.laptop.com', location:'address6', phone:'800-000-0006', 
                              channel: 'Facebook', budget:100000, start_date:'2024-02-19', end_date:'2024-03-26', target_audience:'student ', 
                              seo_keywords:'sample1,sample2,laptop,cheap', description:'laptop for student'},
                              {id:'7', headline:'The fashionable sun glass', url:'http://www.sunglass.com', location:'address7', phone:'800-000-0007', 
                              channel: 'Twitter', budget:4000, start_date:'2024-01-01', end_date:'2024-01-26', target_audience:'driver ', 
                              seo_keywords:'sample1,sample2,sun glass, fashionable', description:'sun glass for driver'},
                              {id:'8', headline:'The foldable phone', url:'http://www.phone.com', location:'address8', phone:'800-000-0008', 
                              channel: 'LinkedIn', budget:80000, start_date:'2024-01-20', end_date:'2024-02-20', target_audience:'student ', 
                              seo_keywords:'sample1,sample2,phone,foldable', description:'phone for student'},
                            ];
  return ads;
}

export function GetAllChannels(){
  const channels:ChannelField[] = [{id:'1',name:'Google'},{id:'2',name:'Facebook'},{id:'3',name:'Twitter'},{id:'4',name:'LinkedIn'}];
  return channels;
}

export function GetInitialSeoKeywords(){
  const initialSeoKeywords:string[] = ["Sample1","Sample2"];;
  return initialSeoKeywords;
}

export async function GetAdById(id: string) {
  noStore();
  try {
    // const data = await sql<Advertisement>`
    //   SELECT
    //     ads.id,
    //     ads.headline,
    //     ads.url,
    //     ads.location,
    //     ads.phone,
    //     ads.budget,
    //     ads.channel,
    //     ads.start_date,
    //     ads.end_date,
    //     ads.target_audience,
    //     ads.image_url,
    //     ads.description,
    //     ads.seo_keywords,
    //   FROM ads
    //   WHERE ads.id = ${id};
    // `;

    // const ad = data.rows.map((ad:Advertisement) => ({
    //   ...ad,
    // }));
    // console.log(ad); // Invoice is an empty array []
    // return ad[0];
    const ads = GetAllAds();
    const ad = ads.find(ad => ad.id == id);
    if (ad === undefined) {
      throw new TypeError('The value was promised to always be there!');
    }
    return ad;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ad.');
  }
}

const ITEMS_PER_PAGE = 6;
export function GetFilteredAds(
  query: string,
  currentPage: number,
  sortColumn: string,
  sortOrder: string) 
{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
    try {
      const ads = GetAllAds();
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

export async function GetFilteredAdsPages(query: string) {
  noStore();
  try {
    const ads = GetAllAds();
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
