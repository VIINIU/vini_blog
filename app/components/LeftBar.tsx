'use client';

import Image from 'next/image';
import MyPic from '../../public/images/shushulun.jpg';
import { useMomentumScroll } from '@/app/lib/useMomentumScroll';

export default function LeftBar() {
  // 공통 커스텀 훅을 사용하여 관성 스크롤 로직을 재사용하고 중복을 제거한 상태를 유지
  const elementRef = useMomentumScroll(0.45, 0.05);

  return (
    <div
      ref={elementRef}
      className="fixed top-20 w-52 font-dos select-none text-stone-700 h-fit p-3 transition-all duration-300
        bg-transparent border-none shadow-none"
    >
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="relative w-[130px] h-[130px] rounded-t-full overflow-hidden">
          <Image
            src={MyPic}
            alt="Host 서유빈"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center gap-1 text-sm">
          <p className="text-base text-stone-850 font-bold">집주인</p>
          <p className="h-0 border-b-1 w-5 border-black"></p>
          <p>서유빈(Yubin Seo)</p> 
        </div>

        <div className="flex flex-col items-center text-center gap-1 text-sm">
          <p className="text-base text-stone-850 font-bold">관심분야</p>
          <p className="h-0 border-b-1 w-5 border-black"></p>
          <div className="flex flex-col items-center">
            <p>
              <a href="https://viniu.info/post?category=LINUX" target="_blank" className="hover:text-blue-500 transition-colors duration-200">LINUX</a>
              <br />
              <a href="https://viniu.info/post?category=ESP32" target="_blank" className="hover:text-blue-500 transition-colors duration-200">Embedded System</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-left gap-2 text-sm">
          <p className="text-base text-stone-850 font-bold text-center">Contact Me on..</p>
          <p className="h-0 border-b-1 w-5 border-black text-center"></p>
          <div className="flex flex-col items-start text-sm gap-1 w-full pl-6">
            <ul className="custom-bullet">
              <li>
                <a href="https://github.com/viiniu" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors duration-200">
                  GitHub
                </a>
              </li>
            </ul>
            <ul className="custom-bullet">
              <li>
                <a href="https://kr.linkedin.com/in/viniu" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors duration-200">
                  Linkedin
                </a>
              </li>
            </ul>
            <ul className="custom-bullet">
              <li>
                <a href="https://www.instagram.com/vini___u/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors duration-200">
                  Instagram
                </a>
              </li>
            </ul>
            <ul className="custom-bullet">
              <li>
                <a href="https://raw.githubusercontent.com/VIINIU/vini_blog_db/refs/heads/main/images/YubinSeo_Resume_2026.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors duration-200">
                  Check My Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
