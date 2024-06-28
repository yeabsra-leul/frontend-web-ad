'use client';
import CampaignDetail from '@/components/ui/campaign-details';
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
          <h2 className="text-lg font-medium">Campaign Detail</h2>
        </div>
      </header>
      {campaign && <CampaignDetail campaign={campaign} />}
      <footer className="flex items-center justify-center px-6">
        <div className="flex justify-between px-6 w-1/2">
          <Link
            href="/campaigns/list"
            className="flex h-10 items-center rounded-lg px-4 border-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Go back to List
          </Link>
          <Link
            href={`/campaigns/update/${id}`}
            className="flex h-10 items-center rounded-lg px-4 border-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Edit
          </Link>          
        </div>
      </footer>
    </main>
  );
}
