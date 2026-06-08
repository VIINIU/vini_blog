"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Tag } from 'lucide-react';

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

type PostBoxProps = {
  posts?: CardProps[];
};

export default function PostBox({ posts = [] }: PostBoxProps) {
  const router = useRouter();

  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border-b border-stone-200/60 text-stone-400 font-dos w-full">
        <p className="text-sm text-center">아직 준비 중인 방(포스트)입니다. 🚪</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {posts.map((post, idx) => (
        <div 
          key={idx} 
          className="group flex flex-col sm:flex-row w-full gap-5 py-4 border-b border-stone-200/60 bg-transparent transition-all duration-300"
        >
          {/* 카드 이미지 영역: 사용자 피드백 반영하여 aspect-[16/9]로 아주 살짝 늘려 황금 세로비 복원 */}
          <div className="flex w-full sm:w-4/12 xl:w-[28%] aspect-[16/9] overflow-hidden rounded-xl border border-stone-200/50 flex-shrink-0">
            <Link className="relative w-full h-full overflow-hidden block" href={`/post/${post.slug}`}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover bg-stone-100 group-hover:scale-103 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 240px"
              />
            </Link>
          </div>

          {/* 카드 콘텐츠 영역: 한층 오밀조밀하게 정돈된 마진 */}
          <div className="flex flex-col w-full justify-center min-w-0">
            {/* 타이틀: 호버 시 링크 호버 색상인 하늘색(#96c2f8) 적용 */}
            <Link href={`/post/${post.slug}`} className="block">
              <h4 className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-[#96c2f8] transition-colors duration-200 truncate cursor-pointer font-dos">
                {post.title}
              </h4>
            </Link>

            {/* 날짜 */}
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-light mt-0.5 mb-1.5">
              <Calendar size={10} className="stroke-stone-400" />
              <span>{post.date}</span>
            </div>

            {/* 본문 미리보기 */}
            <p className="hidden sm:block text-xs text-stone-500 font-normal leading-relaxed line-clamp-2 mb-2">
              {post.preview}
            </p>

            {/* 태그 칩 */}
            <div className="flex flex-row flex-wrap gap-1.5 text-[10px]">
              {post.category.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-stone-500 bg-stone-100 hover:bg-stone-200/80 hover:text-stone-700 px-2 py-0.5 rounded-full cursor-pointer transition-colors duration-200"
                  onClick={() => router.push(`/post?category=${encodeURIComponent(cat)}`)}
                >
                  <Tag size={8} className="stroke-stone-400" />
                  {cat}
                </div>
              ))}
              {post.project.map((proj, i) => (
                <div
                  key={i}
                  className="text-stone-100 bg-stone-800 hover:bg-stone-900 px-2 py-0.5 rounded-full cursor-pointer transition-colors duration-200 font-semibold"
                  onClick={() => router.push(`/post?project=${encodeURIComponent(proj)}`)}
                >
                  {proj}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
