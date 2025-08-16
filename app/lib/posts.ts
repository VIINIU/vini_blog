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

const GITHUB_POSTS_URL = "https://raw.githubusercontent.com/VIINIU/vini_blog/main/posts/";
const GITHUB_IMAGES_URL = "https://raw.githubusercontent.com/VIINIU/vini_blog/main/images/";
const thumbnailUrl = GITHUB_IMAGES_URL + "default_thumbnail.png";

export async function getAllPosts() {
  const res = await fetch(
    "https://api.github.com/repos/VIINIU/vini_blog/contents/posts",
    { next: { revalidate: 60 * 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const files = await res.json();

  const posts = await Promise.all(
    files.map(async (file: { name: string }) => {
      const raw = await fetch(`${GITHUB_POSTS_URL}${file.name}`);
      const text = await raw.text();
      const { data, content } = matter(text);

      return {
        title: data.title || "",
        category: data.category
          ? data.category.split(",").map((s: string) => s.trim())
          : [],
        project: data.project
          ? data.project.split(",").map((s: string) => s.trim())
          : [],
        pinned: data.pinned || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        image: data.thumbnail ? `${GITHUB_IMAGES_URL}${data.thumbnail}` : thumbnailUrl,
        preview: extractPreview(content, 50),
        overview: data.overview === true,
        slug: file.name.replace(/\.mdx?$/, ""),
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}



export async function getRecentPosts(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => !post.overview && post.title !== "About Me").slice(0, limit);
}

export async function getRecentProjects(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => post.overview && post.title !== "About Me").slice(0, limit); 
}

export async function getPinnedPosts(limit: number) {
  const posts = await getAllPosts();
  return posts.filter(post => post.pinned && post.title !== "About Me").slice(0, limit); 
}

export async function getAboutme() {
  const posts = await getAllPosts();
  return posts.filter(post => post.title === "About Me").slice(0, 1); 
}
