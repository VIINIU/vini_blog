"use client";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen pb-50 w-full items-center justify-center font-dos text-black text-4xl">
      <img src={'/images/ankyungmandu.png'} width = '100px'/>
      <p>404 Not Found</p>
    </div>
  );
}
