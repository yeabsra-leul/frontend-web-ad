'use client'
import { fetchChannels } from '@/lib/api';
import { ChannelField } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import Form from '@/components/ui/form-create';
 
export default function Page() {
  const [channels, setChannels] = useState<any[]>([]);
  useEffect(() => {
    fetchChannels().then(data => setChannels(data.result));
  }, []);
  return (
    <main className='mx-auto'>
      <Form channels={channels} />
    </main>
  );
}

