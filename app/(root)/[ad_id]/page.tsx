import Form from '@/components/ui/ad-details';
import { GetAllChannels, GetAdById } from '@/lib/data';
 
export default async function Page({ params }: { params: { ad_id: string } }) {
    const id = params.ad_id;
    const [channels,ad] = await Promise.all([GetAllChannels(),GetAdById(id)]);
  return (
    <main>
      <Form channels={channels} ad={ad}/>
    </main>
  );
}
