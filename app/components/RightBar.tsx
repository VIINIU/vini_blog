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

  return (
    <div
      ref={elementRef}
      className={`fixed top-16 m-5 w-auto rounded-3xl font-dos select-none gap-2 items-center text-black text-xs sm:text-base h-fit p-4 pb-5 transition-transform ease-out
        ${floors.length === 0? "hidden" : "bg-[#ffffff] shade-small"}`}
    >
      <div className="flex flex-col w-full text-center gap-2 items-center">
        <p className="text-lg xl:text-xl">{title}</p>
        {floors.length === 0 ? (
          <div className="flex flex-col text-center gap-3 items-center" />
        ) : (
          floors.map(({ floor, label, targetId }, index) => (
            <div key={index} className="flex flex-col w-full items-center cursor-pointer hover:text-blue-500">
              <p className="h-0 border-t-1 w-[20%] border-black pb-2"></p>
              <a href={targetId} className="flex flex-row gap-2 w-full h-fit p-1 justify-center text-left text-xs lg:text-sm">
                {floor.length > 0 && ( <p className="text-md h-fit">{floor}</p>)}
                <div className="flex flex-col text-xs lg:text-sm justify-center text-center">
                  <p>{label}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
