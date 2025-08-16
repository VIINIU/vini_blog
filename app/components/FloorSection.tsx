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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section id={id} className="w-full">
      <div
        className={`flex flex-row px-2 w-full border-b border-black h-full py-2 gap-3 xl:gap-5 cursor-pointer select-none ${
          reverseTitleAlign ? "justify-end" : "justify-start"
        } items-center`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {reverseTitleAlign ? (
          <>
            <div className="flex flex-col text-xl xl:text-2xl text-right py-2">
              <p>{floorName}</p>
              <p>{title}</p>
            </div>
            <div className="flex flex-row h-full w-[15%] overflow-hidden max-w-20 justify-center items-center">
              {collapsed ? <DoorClosed size={48} strokeWidth={1} /> : <DoorOpen size={48} strokeWidth={1} />}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row h-full overflow-hidden w-[15%] max-w-20 justify-center items-center">
              {collapsed ? <DoorClosed size={48} strokeWidth={1} /> : <DoorOpen size={48} strokeWidth={1} />}
            </div>
            <div className="flex flex-col text-xl xl:text-2xl py-2">
              <p>{floorName}</p>
              <p>{title}</p>
            </div>
          </>
        )}
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <PostBox posts={posts} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
