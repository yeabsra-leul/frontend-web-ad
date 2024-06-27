'use client';
import { fetchCampaignList,fetchGroup } from '@/lib/api';
import { Campaign } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import Form from '@/components/ui/form-update-group';
 
export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [adg, setAdg] = useState<any|null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    useEffect(() => {
        fetchCampaignList().then(data => setCampaigns(data.result.filter((adc:any) => adc.status !== 'deleted')));
    }, []); 
    useEffect(() => {
      fetchGroup(id).then(data => setAdg(data.result));
    }, [id]);
  return (
    <main>
       {adg &&<Form campaigns={campaigns} adg={adg}/>}
    </main>
  );
}

