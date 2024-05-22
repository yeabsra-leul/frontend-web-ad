import {
    ChannelField,
  } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { Advertisement } from './definitions';

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

  export function GetAllAds(){
    const ads:Advertisement[] = [{id:'1', headline:'The best drink', url:'http://www.drink.com', location:'address1', phone:'800-000-0001', 
                                channel: 'Google', budget:'20000', start_date:'2024-01-01', end_date:'2024-04-30', target_audience:'teenager', 
                                seo_keywords:'sample1,sample2, drink', description:'drink for teenager'},
                                {id:'2', headline:'The best food', url:'http://www.food.com', location:'address2', phone:'800-000-0002', 
                                channel: 'Facebook', budget:'30000', start_date:'2024-02-01', end_date:'2024-03-31', target_audience:'yang people ', 
                                seo_keywords:'sample1,sample2,food', description:'food for yang people'},
                                {id:'3', headline:'The best car', url:'http://www.car.com', location:'address3', phone:'800-000-0003', 
                                channel: 'Twitter', budget:'300000', start_date:'2024-01-11', end_date:'2024-05-31', target_audience:'Business guys ', 
                                seo_keywords:'sample1,sample2,car', description:'car for business guys'},
                                {id:'4', headline:'The best bowl', url:'http://www.bowl.com', location:'address4', phone:'800-000-0004', 
                                channel: 'LinkedIn', budget:'60000', start_date:'2024-01-16', end_date:'2024-05-26', target_audience:'house wife ', 
                                seo_keywords:'sample1,sample2,bowl', description:'bowl for house wife'},];
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