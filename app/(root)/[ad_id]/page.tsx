'use client';
import Form from '@/components/ui/ad-details';
import { GetAllChannels } from '@/lib/data';
import { Advertisement } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { ad_id: string } }) {
    const id = params.ad_id;
    const channels = GetAllChannels();
    const [ad, setAd] = useState<Advertisement | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/ad/api/${params.ad_id}`);
        if (res.ok) {
          const data = await res.json();
          setAd(data);
        } else {
          setAd(null);
        }
      };
  
      fetchData();
    }, [params.ad_id]);
  return (
    <main>
      {ad &&<Form channels={channels} ad={ad}/>}
    </main>
  );
}