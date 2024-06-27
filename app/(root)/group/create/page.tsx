'use client'
import { fetchCampaignList } from '@/lib/api';
import { Campaign} from '@/lib/definitions';
import { useEffect, useState } from 'react';
import Form from '@/components/ui/form-create-group';
 
export default function Page() {
const [campaigns, setCampaigns] = useState<Campaign[]>([]);
useEffect(() => {
    fetchCampaignList().then(data => setCampaigns(data.result.filter((ad:any) => ad.status !== 'deleted')));
}, []); 
  return (
    <main className='mx-auto'>
      <Form campaigns={campaigns} />
    </main>
  );
}

