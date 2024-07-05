'use client';
import Form from '@/components/ui/form-update';
import { fetchAd, fetchChannels } from '@/lib/api';
import { ChannelField } from '@/lib/definitions';
import { useEffect, useState } from 'react';
 
export default function Page({ params }: { params: { ad_id: string } }) {
    const id = params.ad_id;
    const [ad, setAd] = useState<any|null>(null);
    const [channels, setChannels] = useState<ChannelField[]>([]);
    useEffect(() => {
      fetchChannels().then(data => setChannels(data.result));
    }, []);
    useEffect(() => {
      fetchAd(id).then(data => setAd(data.result));
    }, [id]);
  return (
    <main>
       {ad &&<Form channels={channels} ad={ad}/>}
    </main>
  );
}

