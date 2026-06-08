"use client";

import Image from 'next/image';
import logo from '../public/logo_big.png';
import ScrollToHash from './components/ScrollToHash';
import FloorSection from './components/FloorSection';
import SetRightBarClient from './components/SetRightBarClient'; 

type HomeContentProps = {
  posts: any[];
  projects: any[];
  pinned: any[];
  aboutme: any[];
};

export default function HomeContent({ posts, projects, pinned, aboutme }: HomeContentProps) {
  const floors = [
    { floor: '3', label: 'About Me', targetId: '#about-me' },
    { floor: '2', label: 'Pinned Posts', targetId: '#Pinned-posts' },
    { floor: '1', label: 'Current Projects', targetId: '#current-projects' },
    { floor: 'B', label: 'Dumb Projects', targetId: '#dumb-projects' },
  ];

  return (
    <div className="flex flex-col w-full items-center relative">
      <ScrollToHash />

      {/* Floor Guide 추가 */}
      <SetRightBarClient floors={floors} />

      {/* Logo */}
      <div className="flex flex-col items-center justify-center w-full">
        <Image className="w-full h-auto object-contain" src={logo} alt="설명" />
      </div>

      <FloorSection
        id="about-me"
        floorName="3rd Floor"
        title="About Me"
        posts={aboutme}
      />

      <FloorSection
        id="Pinned-posts"
        floorName="2nd Floor"
        title="Pinned posts"
        posts={pinned}
        reverseTitleAlign
      />

      <FloorSection
        id="current-projects"
        floorName="1st Floor"
        title="Current Projects"
        posts={posts}
      />

      <FloorSection
        id="dumb-projects"
        floorName="Basement"
        title="Dumb Projects"
        posts={projects}
        reverseTitleAlign
      />
    </div>
  );
}
