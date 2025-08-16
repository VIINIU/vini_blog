"use client";

import { useState, useEffect } from "react";
import PostBox from "../components/PostBox";

type CardProps = {
  title: string;
  category: string[];
  project: string[];
  pinned: string;
  date: string;
  image: string;
  preview: string;
  slug: string; 
};

type PostFilterProps = {
  posts: CardProps[];
  initialCategory?: string | null;
  initialProject?: string | null;
};

export default function PostFilter({ posts, initialCategory = null, initialProject = null }: PostFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<string | null>(initialProject);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedProject(initialProject);
  }, [initialCategory, initialProject]);

  const categories = Array.from(new Set(posts.flatMap(p => p.category).filter(Boolean)));
  const projects = Array.from(new Set(posts.flatMap(p => p.project).filter(Boolean)));

  const filteredPosts = posts.filter(post => {
    const matchCategory = selectedCategory ? post.category.includes(selectedCategory) : true;
    const matchProject = selectedProject ? post.project.includes(selectedProject) : true;
    return matchCategory && matchProject;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 border-b-1 p-2 items-center">
        <div className="w-full h-full text-xl">Posts</div>
          <div className="flex flex-col w-fit gap-1">
            <select className="pl-2 pt-1 pb-0.5 rounded-full bg-gray-100" value={selectedCategory || ""} onChange={e => setSelectedCategory(e.target.value || null)}>
              <option className="h-full" value="">Category</option>
              {categories.map(c => <option key={c} className="h-full" value={c}>{c}</option>)}
            </select>
            <select className="pl-2 pt-1 pb-0.5 rounded-full bg-gray-100" value={selectedProject || ""} onChange={e => setSelectedProject(e.target.value || null)}>
              <option className="h-full" value="">Project</option>
              {projects.map(p => <option key={p} className="h-full" value={p}>{p}</option>)}
            </select>
          </div>
      </div>
      <PostBox posts={filteredPosts} />
    </div>
  );
}
