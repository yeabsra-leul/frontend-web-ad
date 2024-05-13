import Form from '@/components/ui/create-form';
//import { fetchChannels } from '@/lib/data';
 
export default async function Page() {
  const channels = [{id:'1',name:'Google'},{id:'2',name:'Facebook'},{id:'3',name:'Twitter'},{id:'4',name:'LinkedIn'}];
  //console.log(channels);
  return (
    <main>
      <Form channels={channels} />
    </main>
  );
}

