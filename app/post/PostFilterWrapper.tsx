"use client";

import { useSearchParams } from "next/navigation";
import PostFilter from "./PostFilter";

export default function PostFilterWrapper({ posts }: { posts: any[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const project = searchParams.get("project");

  return (
    <PostFilter
      posts={posts}
      initialCategory={category}
      initialProject={project}
    />
  );
}
