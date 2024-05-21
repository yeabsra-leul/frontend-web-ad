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
                                channel: 'Google', budget:'20000', start_date:'20240101', end_date:'20240430', target_audience:'teenager', seo_keywords:'sample1, sample2'},
                                {id:'2', headline:'The best food', url:'http://www.food.com', location:'address2', phone:'800-000-0002', 
                                channel: 'Facebook', budget:'30000', start_date:'20240201', end_date:'20240331', target_audience:'yang people ', seo_keywords:'sample1, sample2'},
                                {id:'3', headline:'The best car', url:'http://www.car.com', location:'address3', phone:'800-000-0003', 
                                channel: 'Twitter', budget:'300000', start_date:'20240111', end_date:'20240531', target_audience:'Business guys ', seo_keywords:'sample1, sample2'},
                                {id:'4', headline:'The best bowl', url:'http://www.bowl.com', location:'address4', phone:'800-000-0004', 
                                channel: 'LinkedIn', budget:'60000', start_date:'20240116', end_date:'20240526', target_audience:'house wife ', seo_keywords:'sample1, sample2'},];
    return ads;
  }