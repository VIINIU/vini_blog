"use client";

import { useSearchParams } from 'next/navigation';
import { getAllPosts } from "../lib/posts";
import PostFilter from "./PostFilter";

export default function PostListPage({ allPosts }: { allPosts: any[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const project = searchParams.get('project');

  let filtered = allPosts;

  if (category) filtered = filtered.filter(p => p.category.includes(category));
  if (project) filtered = filtered.filter(p => p.project.includes(project));

  return <PostFilter posts={filtered} initialCategory={category} initialProject={project} />;
}
