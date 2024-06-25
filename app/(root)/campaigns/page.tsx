import CampaignForm from '@/components/ui/create-campaign-form';
import { GetAllChannels } from '@/lib/data';
 
export default async function Page() {
  const channels = GetAllChannels();
  return (
    <main className='mx-auto'>
      <CampaignForm channels={channels} />
    </main>
  );
}