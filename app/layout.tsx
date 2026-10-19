import './globals.css';
import { Metadata, Viewport } from 'next';
import Footer from '@/app/components/Footer';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Header from '@/app/components/Header';
import LeftBar from '@/app/components/LeftBar';
import RightBar from '@/app/components/RightBar';
import { RightBarProvider } from '@/app/components/RightBarContext';
import ServiceWorkerRegistration from '@/app/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: {
    default: "VINI BLOG",     
    template: "%s | VINI BLOG", 
  },
  description: "VINI의 Tech blog",
  applicationName: 'VINI BLOG',
  appleWebApp: { capable: true, title: 'VINI BLOG', statusBarStyle: 'default' },
  icons: { apple: '/icons/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#fafaf9' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col text-black font-dos bg-background h-fit" suppressHydrationWarning>
        <ServiceWorkerRegistration />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <RightBarProvider> 
          <Header />
          <div className="pt-16  select-none  flex flex-col gap-[20px] min-h-screen w-full items-center">
            <div className="flex flex-row justify-center h-full w-full gap-[3%] px-[2%]">
              <div className="hidden md:flex flex-col min-w-[20%] h-fit justify-center items-center">
                <LeftBar />
              </div>
              <main className="flex flex-col px-5 max-w-3xl sm:px-0 w-full min-h-screen font-dos items-center text-black text-xs sm:text-base h-fit">
                {children}
              </main>
              <div className="hidden md:flex flex-col min-w-[20%] h-fit justify-center items-center">
                <RightBar />
              </div>
            </div>
            <Footer />
          </div>
        </RightBarProvider>
      </body>
    </html>
  );
}
