'use client';

import { useRef, useEffect } from "react";
import { useRightBar } from '@/app/components/RightBarContext';

export default function RightBar() {
  const { title, floors } = useRightBar();

  const current = useRef(0);
  const rafId = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  // 1. 사이드바가 무한히 늘어나지 않도록 max-w-[220px]와 w-52 설정을 추가했습니다.
  return (
    <div
      ref={elementRef}
      className={`fixed top-16 m-5 w-52 max-w-[220px] rounded-3xl font-dos select-none gap-2 items-center text-black text-xs sm:text-base h-fit p-4 pb-5 transition-transform ease-out
        ${floors.length === 0 ? "hidden" : "bg-[#ffffff] shade-small"}`}
    >
      {/* 2. Flex 자식들이 너비를 뚫고 나가는 것을 막기 위해 하위 컴포넌트들에 min-w-0을 추가했습니다. */}
      <div className="flex flex-col w-full text-center gap-2 items-center min-w-0">
        {/* 3. 타이틀도 길어질 수 있으므로 똑같이 말줄임(truncate)과 마우스 호버 툴팁(title)을 적용했습니다. */}
        <p className="text-lg xl:text-xl truncate w-full" title={title}>{title}</p>
        {floors.length === 0 ? (
          <div className="flex flex-col text-center gap-3 items-center" />
        ) : (
          floors.map(({ floor, label, targetId }, index) => (
            <div key={index} className="flex flex-col w-full items-center cursor-pointer hover:text-blue-500 min-w-0">
              <p className="h-0 border-t-1 w-[20%] border-black pb-2"></p>
              <a href={targetId} className="flex flex-row gap-2 w-full h-fit p-1 justify-center text-left text-xs lg:text-sm min-w-0">
                {floor.length > 0 && ( <p className="text-md h-fit flex-shrink-0">{floor}</p>)}
                <div className="flex flex-col text-xs lg:text-sm justify-center text-center min-w-0 w-full">
                  {/* 4. 여기에 truncate를 적용하여 긴 제목은 자동으로 ... 처리가 되며, 마우스를 올리면 전체 글자가 보입니다. */}
                  <p className="truncate w-full" title={label}>{label}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}