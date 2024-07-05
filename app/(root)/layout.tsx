import '../globals.css';
import Navbar from '@mitech/shared-components/ui/navbars/navbar-2';
import Sidebar from '@mitech/shared-components/ui/sidebars/sidebar-2';

export const metadata = {
  title: 'Welcome to Mitech Marketing',
  description:
    'Mitech Marketing is a digital marketing agency that specializes in SEO, PPC, and social media marketing.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside className="w-1/5 bg-[#ff7f00] text-white p-4">
        <Sidebar />
      </aside>
      <main className="w-full">
        <div className="container mx-auto px-4 mb-8">
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  )
}
