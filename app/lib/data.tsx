import {
    ChannelField,
  } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

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