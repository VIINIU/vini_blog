"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

type PostBoxProps = {
  posts?: CardProps[];
};

export default function PostBox({ posts = [] }: PostBoxProps) {
  const router = useRouter();

  if (!posts.length) return <p className="text-gray-500 h-full text-sm text-center">포스트가 없습니다.</p>;

  return (
    <div>
      {posts.map((post, idx) => (
        <div key={idx} className="flex flex-row w-full border-b py-3 pl-1 gap-3">
          <div className="flex flex-5/12 xl:flex-3/12 aspect-[4/3] h-auto overflow-hidden">
            <Link className="w-full h-full" href={`/post/${post.slug}`}>
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-full rounded-lg object-cover bg-gray-100"
                width={600}
                height={400}
              />
            </Link>
          </div>

          <div className="flex flex-col w-full justify-center">
            <Link href={`/post/${post.slug}`}>
              <div className="text-black text-base xl:text-xl cursor-pointer">{post.title}</div>
            </Link>
            <div className="text-black text-sm">{post.date}</div>
            <div className="flex flex-row flex-wrap gap-1 text-xs pt-0.5">
              {post.category.map((cat, i) => (
                <div
                  key={i}
                  className="text-black bg-gray px-2 pt-0.5 rounded-full cursor-pointer"
                  onClick={() => router.push(`/post?category=${encodeURIComponent(cat)}`)}
                >
                  {cat}
                </div>
              ))}
              {post.project.map((proj, i) => (
                <div
                  key={i}
                  className="text-white bg-black px-2 pt-0.5 rounded-full cursor-pointer"
                  onClick={() => router.push(`/post?project=${encodeURIComponent(proj)}`)}
                >
                  {proj}
                </div>
              ))}
            </div>

            <div className="hidden sm:block text-black text-xs xl:text-sm pt-1">{post.preview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
