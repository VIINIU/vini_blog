"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import matter from "gray-matter";
import { marked } from "marked";
import slugify from "slugify";
import SetRightBarClient from "./SetRightBarClient";

let headingIndex = 0;
const GITHUB_POSTS_URL = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/posts/";
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/images/";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>(); 
  const [content, setContent] = useState("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string[]>([]);
  const [project, setProject] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [floors, setFloors] = useState<{ floor: string; label: string; targetId: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    
    const fetchData = async () => {
      const res = await fetch(`${GITHUB_POSTS_URL}${slug}.md`);
      const rawText = await res.text();

      const updatedMarkdown = rawText
        .replace(/!\[([^\]]*)]\(\/images\/([^)]+)\)/g, (_, alt, filename) => 
          `![${alt}](${GITHUB_IMAGE_BASE}${filename})`
        )
        .replace(/<img\s+([^>]*?)src="\/images\/([^"]+)"([^>]*)>/g, (_, pre, filename, post) => 
          `<img ${pre}src="${GITHUB_IMAGE_BASE}${filename}"${post}>`
        );

      const { data, content } = matter(updatedMarkdown);

      const renderer = new marked.Renderer();
      const headings: { floor: string; label: string; targetId: string; depth: number }[] = [];
      const usedSlugs = new Map<string, number>();

      renderer.heading = ({ tokens, depth }: Parameters<typeof renderer.heading>[0]) => {
        let text = tokens
          .map((token: any) => {
            if ("text" in token && typeof token.text === "string") return token.text;
            if ("raw" in token && typeof token.raw === "string") return token.raw;
            return "";
          })
          .join("")
          .trimStart();

        headingIndex++;
        const englishOnly = text.match(/[A-Za-z0-9\s]+/g)?.join(" ") ?? "";
        let slug = slugify(englishOnly, { lower: true, strict: true }) || `heading-${headingIndex}`;

        if (usedSlugs.has(slug)) {
          const count = usedSlugs.get(slug)! + 1;
          usedSlugs.set(slug, count);
          slug = `${slug}-${count}`;
        } else {
          usedSlugs.set(slug, 1);
        }

        if (depth === 4) {
          headings.push({ floor: "", label: text, targetId: `#${slug}`, depth });
          return `<h4 id="${slug}"><a href="#${slug}">${text}</a></h4>`;
        } else if (depth === 3) {
          headings.push({ floor: "", label: text, targetId: `#${slug}`, depth });
          return `<h3 id="${slug}"><a href="#${slug}">${text}</a></h3>`;
        } else if (depth === 2) {
          headings.push({ floor: "", label: text, targetId: `#${slug}`, depth });
          return `<h2 id="${slug}"><a href="#${slug}">${text}</a></h2>`;
        }

        return `<h${depth} id="${slug}">${text}</h${depth}>`;
      };

      marked.setOptions({ 
        renderer,
        breaks: true,  
      });

      const htmlContent = await marked(content);  
      const hasH4 = headings.some(h => h.depth === 4);
      const hasH3 = headings.some(h => h.depth === 3);
      const hasH2 = headings.some(h => h.depth === 2);

      const floorsData = hasH4
        ? headings.filter(h => h.depth === 4).map(({ label, targetId }) => ({ floor: "", label, targetId }))
        : hasH3
        ? headings.filter(h => h.depth === 3).map(({ label, targetId }) => ({ floor: "", label, targetId }))
        : hasH2
        ? headings.filter(h => h.depth === 2).map(({ label, targetId }) => ({ floor: "", label, targetId }))
        : [];

      setTitle(data.title);
      setCategory(
        typeof data.category === "string"
          ? data.category.split(",").map((c: string) => c.trim())
          : []
      );
      setProject(
        typeof data.project === "string"
          ? data.project.split(",").map((c: string) => c.trim())
          : []
      );
      setDate(typeof data.date === "string" ? data.date : new Date(data.date).toLocaleDateString());
      setContent(htmlContent);
      setFloors(floorsData);
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <div className="flex flex-row min-h-screen h-fit w-full items-center justify-center gap-[3%] pb-20">
        <div className="flex flex-col w-full max-w-3xl items-start text-black text-xs sm:text-base h-fit">
          <h1 className="text-2xl xl:text-4xl w-full font-dos pb-1 text-center">{title}</h1>
          <div className="flex flex-row text-center w-full justify-center pb-1 gap-1">
            {project.length > 0 && (
              <div className="flex flex-wrap text-center w-fit justify-center pb-1 gap-1">
                {project.map((proj) => (
                  <span
                    key={proj}
                    className="px-2 bg-black text-white rounded-xl text-xs xl:text-sm font-dos pt-0.5"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            )}
            {category.length > 0 && (
              <div className="flex flex-wrap text-center w-fit justify-center pb-1 gap-1">
                {category.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 bg-gray-200 rounded-xl text-xs xl:text-sm font-dos pt-0.5"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-sm text-center w-full font-dos xl:text-base px-1 pb-3">{date}</div>
          <article
            className="prose font-medium"
            style={{ userSelect: "text" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <SetRightBarClient floors={floors} />
    </>
  );
}
