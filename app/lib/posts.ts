import matter from "gray-matter";

function extractPreview(content: string, length: number = 100): string {
  let text = content;
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");
  text = text.replace(/\[.*?\]\(.*?\)/g, "");
  text = text
    .split("\n")
    .filter(line => !line.includes("|"))
    .join("\n");
  text = text.replace(/<[^>]+>/g, "");
  text = text.replace(/[#>*_`-]/g, "");
  text = text.replace(/\s+/g, " ").trim();
  return text.slice(0, length) + (text.length > length ? "..." : "");
}

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/";
const GITHUB_POSTS_URL = GITHUB_RAW_BASE + "posts/";
const GITHUB_IMAGES_URL = GITHUB_RAW_BASE + "images/";
const thumbnailUrl = GITHUB_IMAGES_URL + "default_thumbnail.png";

export async function getAllPosts() {
  const res = await fetch(
    "https://api.github.com/repos/VIINIU/vini_blog_db/contents/posts",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const files = await res.json();

  const postsData = await Promise.all(
    files.map(async (file: { name: string }) => {
      try {
        const raw = await fetch(`${GITHUB_POSTS_URL}${file.name}`);
        const text = await raw.text();
        const { data, content } = matter(text);

        let imagePath = thumbnailUrl;
        if (data.thumbnail) {
          const thumb = data.thumbnail.trim();
          if (thumb.startsWith("http")) {
            imagePath = thumb;
          } else if (thumb.startsWith("images/")) {
            imagePath = `${GITHUB_RAW_BASE}${thumb}`;
          } else if (thumb.startsWith("/")) {
            imagePath = `${GITHUB_RAW_BASE}${thumb.slice(1)}`;
          } else {
            imagePath = `${GITHUB_IMAGES_URL}${thumb}`;
          }
        }

        return {
          title: data.title || "",
          category: data.category
            ? data.category.split(",").map((s: string) => s.trim())
            : [],
          project: data.project
            ? data.project.split(",").map((s: string) => s.trim())
            : [],
          pinned: data.pinned === true || data.pinned === "true",
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
          image: imagePath,
          preview: extractPreview(content, 50),
          overview: data.overview === true,
          dumb: data.dumb === true,
          slug: file.name.replace(/\.mdx?$/, ""),
        };
      } catch (error) {
        console.error(`Failed to parse post frontmatter for file: ${file.name}`, error);
        return null;
      }
    })
  );

  const posts = postsData.filter((post): post is NonNullable<typeof post> => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}



export async function getCurrentProjects(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => !post.dumb && post.title !== "About Me").slice(0, limit);
}

export async function getDumbProjects(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => post.dumb && post.title !== "About Me").slice(0, limit); 
}

export async function getPinnedPosts(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => post.pinned && post.title !== "About Me").slice(0, limit); 
}

export async function getAboutme() {
  const posts = await getAllPosts();
  return posts.filter(post => post.title === "About Me").slice(0, 1); 
}
