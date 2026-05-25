"use client";

import { useState } from "react";
import PostBox from "./PostBox";
import { DoorClosed, DoorOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FloorSectionProps = {
  id: string;
  floorName: string;
  title: string;
  posts: any[];
  reverseTitleAlign?: boolean;
};

export default function FloorSection({
  id,
  floorName,
  title,
  posts,
  reverseTitleAlign = false,
}: FloorSectionProps) {
  // 기본적으로 문이 열린 상태(collapsed=false)로 시작하여 콘텐츠 노출
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section id={id} className="w-full mb-3.5 scroll-mt-20">
      {/* 층의 헤더 패널: 깔끔한 라인 아키텍처 디자인 */}
      <div
        className={`group flex flex-row px-4 w-full h-full py-3 gap-4 xl:gap-6 cursor-pointer select-none items-center 
          border-b border-stone-300 hover:border-black bg-transparent hover:bg-stone-100/20 transition-all duration-300
          ${reverseTitleAlign ? "flex-row-reverse text-right" : "flex-row text-left"}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {/* 원래의 Lucide 문 아이콘 복구 */}
        <div className="flex flex-row h-full overflow-hidden w-[15%] max-w-20 justify-center items-center flex-shrink-0">
          {collapsed ? (
            <DoorClosed size={48} strokeWidth={1} className="text-stone-850 transition-transform duration-200" />
          ) : (
            <DoorOpen size={48} strokeWidth={1} className="text-stone-850 transition-transform duration-200" />
          )}
        </div>

        {/* 층 정보 라벨 */}
        <div className="flex flex-col py-1 justify-center min-w-0 flex-grow">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold">{floorName}</p>
          <p className="text-lg sm:text-xl xl:text-2xl font-dos text-stone-800 group-hover:text-black transition-colors duration-200 mt-0.5">{title}</p>
        </div>
      </div>

      {/* 부드러운 높이 슬라이딩 아코디언 애니메이션 */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-1 py-1 sm:px-2">
              <PostBox posts={posts} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
