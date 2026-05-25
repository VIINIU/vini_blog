import React from 'react';

interface DoorProps extends React.SVGProps<SVGSVGElement> {
  isOpen: boolean;
  size?: number;
}

export const Door = ({ isOpen, size = 48, ...props }: DoorProps) => {
  return (
    <div className="perspective-1000 inline-block select-none pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="overflow-visible"
        {...props}
      >
        {/* 문턱/바닥 라인 */}
        <path d="M2 22h20" className="stroke-stone-400" strokeWidth="1" />

        {/* 고급스러운 외부 문틀 */}
        <rect x="4" y="2" width="16" height="20" rx="1" className="stroke-stone-600 fill-stone-100/50" />
        
        {/* 내부 문틀 음각 프레임 */}
        <rect x="5.5" y="3.5" width="13" height="18.5" rx="0.5" className="stroke-stone-300 fill-transparent" />

        {/* 3D 회전 문짝 그룹 */}
        {/* 힌지(x=4)를 축으로 하여 3D 회전하도록 설정 */}
        <g 
          className={`origin-left transition-transform preserve-3d ${
            isOpen ? 'animate-door-open' : 'animate-door-close'
          }`}
          style={{ transformOrigin: '4px center' }}
        >
          {/* 문짝 바디 */}
          <rect x="4" y="2" width="16" height="20" rx="0.8" className="fill-stone-100 stroke-stone-800" strokeWidth="1.3" />
          
          {/* 클래식 문짝 몰딩 장식 */}
          <rect x="6.5" y="4.5" width="11" height="6.5" rx="0.5" className="stroke-stone-400 fill-stone-50/70" strokeWidth="0.8" />
          <rect x="6.5" y="13" width="11" height="7" rx="0.5" className="stroke-stone-400 fill-stone-50/70" strokeWidth="0.8" />

          {/* 황동 골드 손잡이 디테일 */}
          <circle cx="17" cy="12" r="0.8" className="fill-amber-500 stroke-amber-600 animate-pulse" strokeWidth="0.5" />
          <path d="M17 12h1.5" className="stroke-amber-600" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};