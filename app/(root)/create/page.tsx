import Form from '@/components/ui/create-form';
import { GetAllChannels } from '@/lib/data';
 
export default async function Page() {
  const channels = GetAllChannels();
  return (
    <main>
      <Form channels={channels} />
    </main>
  );
}

