"use client";

import { useState, useEffect } from "react";
import PostBox from "../components/PostBox";
import { Tag, Folder, RefreshCw } from "lucide-react";

type CardProps = {
  title: string;
  category: string[];
  project: string[];
  pinned: boolean;
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

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  const hasFilter = selectedCategory !== null || selectedProject !== null;

  return (
    <div className="flex flex-col w-full gap-6 select-none">
      {/* 필터 조작 컨트롤 타워 */}
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 w-full">
        {/* 타이틀 영역: 가운데 정렬 */}
        <div className="flex flex-col items-center justify-center w-full gap-2 text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-dos text-stone-850 tracking-wide text-center w-full">
            Browse Rooms
          </h2>
          {hasFilter && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors duration-200 font-medium cursor-pointer"
            >
              <RefreshCw size={11} className="animate-spin-slow" />
              Reset Filters
            </button>
          )}
        </div>

        {/* 카테고리 칩 목록 - 블랙 테마 적용 */}
        <div className="flex flex-col gap-2 w-full">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold">
            <Tag size={10} /> Categories
          </span>
          <div className="flex flex-row flex-wrap gap-2 w-full max-h-36 overflow-y-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-xs px-3.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
                ${
                  selectedCategory === null
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-white/40 border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                }`}
            >
              All
            </button>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`text-xs px-3.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-white/40 border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 프로젝트 칩 목록 - 블랙 테마 적용 */}
        <div className="flex flex-col gap-2 w-full">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold">
            <Folder size={10} /> Projects
          </span>
          <div className="flex flex-row flex-wrap gap-2 w-full max-h-36 overflow-y-auto scrollbar-hide">
            <button
              onClick={() => setSelectedProject(null)}
              className={`text-xs px-3.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
                ${
                  selectedProject === null
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-white/40 border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                }`}
            >
              All
            </button>
            {projects.map(proj => {
              const isSelected = selectedProject === proj;
              return (
                <button
                  key={proj}
                  onClick={() => setSelectedProject(isSelected ? null : proj)}
                  className={`text-xs px-3.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-white/40 border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                    }`}
                >
                  {proj}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 결과물 출력 */}
      <div className="w-full">
        <PostBox posts={filteredPosts} />
      </div>
    </div>
  );
}
