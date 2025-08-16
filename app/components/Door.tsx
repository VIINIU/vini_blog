import React from 'react';

interface DoorProps extends React.SVGProps<SVGSVGElement> {
  isOpen: boolean;
}

export const Door = ({ isOpen, ...props }: DoorProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-door"
      {...props}
    >
      {/* 문틀과 문턱, 손잡이 부분 (움직이지 않는 요소) */}
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M10 12h.01" />

      {/* 문짝 역할을 하는 그룹. 이 부분을 회전시킬 것입니다. */}
      {/* isOpen 상태에 따라 다른 CSS 클래스를 적용합니다. */}
      <g className={isOpen ? 'animate-door-open' : 'animate-door-close'}>
        <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />
        <path d="M11 4H8a2 2 0 0 0-2 2v14" />
      </g>
    </svg>
  );
};