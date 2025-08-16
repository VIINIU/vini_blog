import HomeContent from "./HomeContent";
import { getRecentPosts, getRecentProjects, getPinnedPosts, getAboutme } from "./lib/posts";

export default async function HomePage() {
  const posts = await getRecentPosts(5); 
  const projects = await getRecentProjects(3); 
  const pinned = await getPinnedPosts(5); 
  const aboutme = await getAboutme(); 

  return (
    <HomeContent posts={posts} projects={projects} pinned={pinned} aboutme={aboutme} />
  );
}