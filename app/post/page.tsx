// app/post/page.tsx
import { getAllPosts } from "../lib/posts";
import Image from "next/image";
import logo from "../../public/logo_big.png";
import SetRightBarClient from "../components/SetRightBarClient";
import { Suspense } from "react";
import PostFilterWrapper from "./PostFilterWrapper"; 
type Floor = { floor: string; label: string; targetId: string };

export default async function PostPage() {
  const posts = await getAllPosts();
  const floors: Floor[] = [];

  return (
    <div className="flex flex-col w-full items-center">
      <SetRightBarClient floors={floors} />
      <div className="flex flex-col items-center justify-center w-fit">
        <Image
          className="hidden sm:block w-full h-auto object-contain"
          src={logo}
          alt="설명"
        />
      </div>

      <div className="flex flex-col w-full h-fit justify-center items-center px-2">
        <Suspense fallback={<div>Loading...</div>}>
          <PostFilterWrapper posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
