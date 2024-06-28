'use client';
import CampaignForm from '@/components/ui/campaign-update';
import { fetchCampaign } from '@/lib/api';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [campaign, setCampaign] = useState<any | null>(null);
  useEffect(() => {
    fetchCampaign(id).then((data) => setCampaign(data.result));
  }, [id]);
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-300 font-bold">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium">Update Campaign</h2>
        </div>
      </header>
      {campaign && <CampaignForm campaign={campaign} />}
      
    </main>
  );
}
