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
    { floor: '3', label: 'Current Posts', targetId: '#current-posts' },
    { floor: '2', label: 'Current Projects', targetId: '#current-projects' },
    { floor: '1', label: 'Pinned Posts', targetId: '#Pinned-posts' },
    { floor: 'B', label: 'About Me', targetId: '#about-me' },
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
        id="current-posts"
        floorName="3rd Floor"
        title="Current Posts"
        posts={posts}
      />

      <FloorSection
        id="current-projects"
        floorName="2nd Floor"
        title="Current Projects"
        posts={projects}
        reverseTitleAlign
      />

      <FloorSection
        id="Pinned-posts"
        floorName="1st Floor"
        title="Pinned posts"
        posts={pinned}
      />

      <FloorSection
        id="about-me"
        floorName="Basement"
        title="About Me"
        posts={aboutme}
        reverseTitleAlign
      />
    </div>
  );
}
