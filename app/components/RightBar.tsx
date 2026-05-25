'use client';

import { useRightBar } from '@/app/components/RightBarContext';
import { useMomentumScroll } from '@/app/lib/useMomentumScroll';
import { useScrollSpy } from '@/app/lib/useScrollSpy';

export default function RightBar() {
  const { title, floors } = useRightBar();

  // 1. 공통 스크롤 관성 훅 적용
  const elementRef = useMomentumScroll(0.45, 0.05);

  // 2. 실시간 스크롤 스파이 연동
  const targetIds = floors.map(f => f.targetId);
  const activeId = useScrollSpy(targetIds);

  if (floors.length === 0) return null;

  return (
    <div
      ref={elementRef}
      className="fixed top-20 m-5 w-56 max-w-[240px] rounded-3xl font-dos select-none text-stone-700 h-fit p-5 transition-all duration-300
        bg-white/75 backdrop-blur-md border border-stone-200/50 premium-card-shadow"
    >
      <div className="flex flex-col w-full gap-4 items-center">
        {/* 상단 정보 복구: 고정 라벨 중복은 제거하고, 동적 {title}만 깔끔하게 표시 */}
        {title && (
          <div className="flex flex-col items-center w-full pb-2.5 border-b border-stone-150/60 text-center">
            <h4 className="text-xs tracking-wider font-bold text-stone-800 truncate max-w-full" title={title}>
              {title}
            </h4>
          </div>
        )}

        {/* 시크한 블랙 엘리베이터 단추 형태의 층 목록 */}
        <div className="flex flex-col w-full gap-1.5">
          {floors.map(({ floor, label, targetId }, index) => {
            const isActive = activeId === targetId;

            return (
              <a
                key={index}
                href={targetId}
                className={`group flex items-center w-full p-2 rounded-2xl transition-all duration-300 border
                  ${
                    isActive
                      ? "bg-stone-900/5 text-black border-stone-850 font-bold"
                      : "bg-stone-50/30 hover:bg-stone-100/40 text-stone-600 border-transparent hover:border-stone-250"
                  }`}
              >
                {/* 텍스트 쏠림 보완용 정교화된 가로 정렬 */}
                <div className="flex items-center gap-2.5 w-full min-w-0">
                  {/* 둥근 버튼 층 표시자 */}
                  {floor.length > 0 ? (
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold transition-all duration-300 flex-shrink-0
                        ${
                          isActive
                            ? "bg-stone-900 text-white shadow-sm"
                            : "bg-stone-200/70 text-stone-500 group-hover:bg-stone-300"
                        }`}
                    >
                      {floor}
                    </span>
                  ) : (
                    // 층 번호가 없는 TOC 등의 미니 닷
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ml-2.5 flex-shrink-0
                        ${isActive ? "bg-stone-900 scale-125" : "bg-stone-300 group-hover:bg-stone-400"}`}
                    />
                  )}
                  {/* 라벨: truncate와 max-w를 해제하여 표출 문구를 넓힘 */}
                  <span 
                    className={`text-[12.5px] tracking-wide w-full pr-1 overflow-visible break-words font-medium transition-colors duration-200
                      ${isActive ? "text-stone-900" : "text-stone-500 group-hover:text-stone-850"}`}
                    title={label}
                  >
                    {label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}