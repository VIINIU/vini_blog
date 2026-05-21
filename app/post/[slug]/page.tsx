import matter from "gray-matter";
import PostPageClient from "./PostPageClient"; 
import { Metadata } from "next";

const GITHUB_POSTS_URL = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/posts/";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${GITHUB_POSTS_URL}${slug}.md`);
    const rawText = await res.text();
    const { data } = matter(rawText);
    
    return {
      title: data.title || "포스트",
    };
  } catch (e) {
    return { title: "포스트" };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PostPageClient initialSlug={slug} />;
}