import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import LeftBar from '@/app/components/LeftBar';
import RightBar from '@/app/components/RightBar';

import { RightBarProvider } from '@/app/components/RightBarContext'; // 새로 만든 Context Provider 임포트

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col text-black font-dos bg-background h-fit">
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
