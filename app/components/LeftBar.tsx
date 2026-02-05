'use client';

import { useRef, useEffect } from "react";

import Image from 'next/image';
import MyPic from '../../public/images/shushulun.jpg';

export default function LeftBar() {
  
  const current = useRef(0);
  const rafId = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      current.current = window.scrollY * 0.1;
    };

    const animate = () => {
      if (Math.abs(current.current) > 1) {
        current.current *= 0.5; 
        if (elementRef.current) {
          elementRef.current.style.transform = `translateY(${current.current}px)`;
        }
      } else {
        current.current = 0;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);


  return (
    <div
      ref={elementRef}
      className="fixed top-16 w-fit font-dos select-none gap-2 items-center text-black text-xs sm:text-base h-fit p-3 transition-transform ease-out"
    >
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="relative w-[70%] aspect-square rounded-t-full overflow-hidden">
          <Image
            src={MyPic}
            alt="설명"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center text-center gap-1 text-sm">
          <p className='text-base'>집주인</p>
          <p className='h-0 border-b-1 w-5 border-black'></p>
          <p>서유빈(Yubin Seo)</p> 
        </div>
        <div className="flex flex-col items-center text-center gap-1 text-sm">
          <p className='text-base'>관심분야</p>
          <p className='h-0 border-b-1 w-5 border-black'></p>
          <div className='flex flex-col items-center'>
            <p><a href="https://viniu.info/post?category=LINUX" target="_blank" className=" hover:text-blue-400">LINUX</a><br/><a href="https://viniu.info/post?category=ESP32" target="_blank" className=" hover:text-blue-400">Embeded System</a></p>
          </div>
        </div>
        <div className="flex flex-col items-center text-left gap-2 text-sm">
          <p className='text-base'>연락처</p>
          <p className='h-0 border-b-1 w-5 border-black'></p>
          <div className='flex flex-col items-center text-sm gap-1'>
            <ul className="custom-bullet">
              <li><a href="https://github.com/viiniu" target="_blank" className="text-decoration-line: underline hover:text-blue-400">GitHub</a></li>
            </ul>
            <ul className="custom-bullet">
              <li><a href="https://kr.linkedin.com/in/viniu" target="_blank" className="text-decoration-line: underline hover:text-blue-400">Linkedin</a></li>
            </ul>
            <ul className="custom-bullet">
              <li><a href="https://www.instagram.com/vini___u/" target="_blank" className="text-decoration-line: underline hover:text-blue-400">Instagram</a></li>
            </ul>
            <ul className="custom-bullet">
              <li><a href="https://raw.githubusercontent.com/VIINIU/vini_blog_db/refs/heads/main/images/YubinSeo_Resume_2026.pdf" target="_blank" className="text-decoration-line: underline hover:text-blue-400">Check My Resume</a></li>
            </ul>
          </div>
        </div>
    </div></div>

  );
}

