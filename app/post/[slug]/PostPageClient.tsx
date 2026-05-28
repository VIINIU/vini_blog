"use client";

import { useEffect, useState } from "react";
import matter from "gray-matter";
import { marked } from "marked";
import slugify from "slugify";
import SetRightBarClient from "@/app/components/SetRightBarClient";
import { Calendar } from "lucide-react";

let headingIndex = 0;
const GITHUB_POSTS_URL = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/posts/";
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/images/";

export default function PostPageClient({ initialSlug }: { initialSlug: string }) {
  const slug = initialSlug; 
  
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

      const bookmarkRegex = /\[bookmark:(https?:\/\/[^\]\s]+)\]/g;
      const contentWithBookmarks = content.replace(bookmarkRegex, (_, url) => {
        return `
          <div class="bookmark-wrapper">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="notion-bookmark" data-url="${url}">
              <div class="bookmark-info">
                <div class="bookmark-title">Loading...</div>
                <div class="bookmark-description"></div>
                <div class="bookmark-link-wrapper">
                  <img src="" class="bookmark-favicon" style="display:none" />
                  <span class="bookmark-link">${url}</span>
                </div>
              </div>
              <div class="bookmark-image" style="display:none">
                <img src="" style="display:none" />
              </div>
            </a>
          </div>
        `;
      });

      const renderer = new marked.Renderer();
      const headings: { floor: string; label: string; targetId: string; depth: number }[] = [];
      const usedSlugs = new Map<string, number>();

      renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
        const language = lang || "code";
        const codeId = `code-block-${Math.random().toString(36).slice(2, 9)}`;

        return `
          <div class="code-box-wrapper my-6 rounded-2xl overflow-hidden border border-stone-850 bg-[#1c1917] premium-card-shadow font-mono">
            <!-- Mac style window header bar -->
            <div class="flex items-center justify-between px-4 py-2.5 bg-stone-900 border-b border-stone-850 select-none">
              <!-- Window controls -->
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-[#ff5f56] opacity-90 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-90 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#27c93f] opacity-90 inline-block"></span>
              </div>
              <!-- Code label and Copy Action -->
              <div class="flex items-center gap-3">
                <span class="text-[10px] uppercase tracking-wider font-bold text-stone-500 font-dos">${language}</span>
                <button 
                  onclick="navigator.clipboard.writeText(document.getElementById('${codeId}').innerText).then(() => {
                    const btn = this;
                    const prevText = btn.innerText;
                    btn.innerText = 'Copied!';
                    btn.style.color = '#96c2f8';
                    setTimeout(() => {
                      btn.innerText = prevText;
                      btn.style.color = '';
                    }, 1500);
                  })"
                  class="text-[10px] tracking-wider text-stone-400 hover:text-[#96c2f8] transition-colors duration-200 cursor-pointer font-dos border border-stone-700/60 px-2 py-0.5 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <!-- Code content -->
            <pre class="p-4 overflow-x-auto text-[13.5px] leading-relaxed text-stone-300 font-mono scrollbar-hide"><code id="${codeId}">${text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
          </div>
        `;
      };

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

      const htmlContent = await marked(contentWithBookmarks);  
      const hasH4 = headings.some(h => h.depth === 4);
      const hasH3 = headings.some(h => h.depth === 3);
      const hasH2 = headings.some(h => h.depth === 2);

      const floorsData = hasH3
        ? headings.filter(h => h.depth === 3).map(({ label, targetId }) => ({ floor: "", label, targetId }))
        : hasH4
        ? headings.filter(h => h.depth === 4).map(({ label, targetId }) => ({ floor: "", label, targetId }))
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

  useEffect(() => {
    if (!content) return;
    
    const bookmarks = document.querySelectorAll('.notion-bookmark[data-url]');
    bookmarks.forEach(async (bookmark) => {
      const url = bookmark.getAttribute('data-url');
      if (!url) return;

      try {
        const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);

        const titleEl = bookmark.querySelector('.bookmark-title');
        const descEl = bookmark.querySelector('.bookmark-description');
        const favEl = bookmark.querySelector('.bookmark-favicon') as HTMLImageElement;
        const imgContainer = bookmark.querySelector('.bookmark-image') as HTMLDivElement;
        const imgEl = bookmark.querySelector('.bookmark-image img') as HTMLImageElement;

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (favEl && data.favicon) {
          favEl.src = data.favicon;
          favEl.style.display = 'block';
        }
        if (imgEl && data.image) {
          imgEl.src = data.image;
          if (imgContainer) imgContainer.style.display = 'block';
          imgEl.style.display = 'block';
        }
      } catch (e) {
        console.error("Failed to load bookmark metadata", e);
        const titleEl = bookmark.querySelector('.bookmark-title');
        if (titleEl) titleEl.textContent = url;
      }
    });
  }, [content]);

  return (
    <>
      <div className="flex flex-col w-full max-w-3xl items-start text-stone-850 text-sm sm:text-base h-fit pb-24 px-1">
        {/* 포스트 상세 헤더 영역 */}
        <div className="flex flex-col w-full border-b border-stone-200 pb-8 mb-8">
          <h1 className="text-3xl sm:text-4xl xl:text-5xl w-full font-dos font-bold text-stone-800 tracking-tight leading-tight text-center sm:text-left">
            {title}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full mt-5 gap-3">
            {/* 날짜 */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-400 font-light font-dos">
              <Calendar size={13} className="stroke-stone-400" />
              <span>{date}</span>
            </div>

            {/* 태그 칩 목록 */}
            <div className="flex flex-row flex-wrap gap-1.5 text-[10px] sm:text-xs">
              {project.length > 0 && project.map((proj) => (
                <span
                  key={proj}
                  className="text-stone-100 bg-stone-800 px-2.5 py-0.5 rounded-full font-semibold font-dos shadow-sm"
                >
                  {proj}
                </span>
              ))}
              {category.length > 0 && category.map((cat) => (
                <span
                  key={cat}
                  className="text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full font-dos border border-stone-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* 본문 영역 (마크다운 렌더링) */}
        <article
          className="prose font-medium w-full max-w-none text-stone-800 leading-relaxed tracking-wide"
          style={{ userSelect: "text" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <SetRightBarClient floors={floors} title="Short Cut" />
    </>
  );
}