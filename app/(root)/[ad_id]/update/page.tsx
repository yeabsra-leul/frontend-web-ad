'use client';
import Form from '@/components/ui/update-form';
import { fetchAd } from '@/lib/api';
import { GetAllChannels } from '@/lib/data';
import { useEffect, useState } from 'react';
 
export default function Page({ params }: { params: { ad_id: string } }) {
    const id = params.ad_id;
    const channels = GetAllChannels();
    const [ad, setAd] = useState<any|null>(null);
    useEffect(() => {
      fetchAd(id).then(data => setAd(data.result));
    }, [id]);
  return (
    <main>
       {ad &&<Form channels={channels} ad={ad}/>}
    </main>
  );
}

