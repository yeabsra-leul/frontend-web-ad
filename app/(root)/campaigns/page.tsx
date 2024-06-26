'use client'
import CampaignForm from '@/components/ui/create-campaign-form';
import { fetchChannels } from '@/lib/api';
import { useEffect, useState } from 'react';
 
export default function Page() {
  const [channels, setChannels] = useState<any[]>([]);
  useEffect(() => {
    fetchChannels().then(data => setChannels(data.result));
  }, []);
  return (
    <main className='mx-auto'>
      <CampaignForm channels={channels} />
    </main>
  );
}