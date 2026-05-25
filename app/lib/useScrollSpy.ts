import { useState, useEffect } from 'react';

/**
 * 스크롤 위치에 따라 현재 활성화된 섹션(층)의 ID를 추적하는 훅
 * @param targetIds 관찰할 섹션들의 ID 배열 (예: ['#about-me', '#Pinned-posts'] 또는 ['about-me', 'Pinned-posts'])
 * @param offset 스크롤 활성화 트리거 오프셋 (기본값: 150px)
 */
export function useScrollSpy(targetIds: string[], offset = 180) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // '#' 기호가 포함된 경우 제거하여 순수 ID 목록 생성
    const cleanIds = targetIds.map(id => id.startsWith('#') ? id.slice(1) : id);
    
    if (cleanIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // 스크롤이 맨 위에 도달했을 때 (B나 첫 번째 층 활성화 유지)
      if (window.scrollY < 50) {
        setActiveId(targetIds[0]);
        return;
      }

      // 페이지 맨 아래에 도달했을 때 마지막 섹션 강제 활성화
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveId(targetIds[targetIds.length - 1]);
        return;
      }

      let currentActive = "";

      for (let i = 0; i < cleanIds.length; i++) {
        const id = cleanIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = targetIds[i];
            break;
          }
        }
      }

      // 중간 경계선 등으로 매칭이 안 된 경우, 가장 가까운 위쪽 섹션 매칭
      if (!currentActive) {
        for (let i = cleanIds.length - 1; i >= 0; i--) {
          const id = cleanIds[i];
          const el = document.getElementById(id);
          if (el && scrollPosition >= el.offsetTop) {
            currentActive = targetIds[i];
            break;
          }
        }
      }

      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 초기 감지 실행
    handleScroll();

    // 렌더링 직후 콘텐츠 높이 계산 대기를 위해 미세 지연 후 재실행
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [targetIds, offset]);

  return activeId;
}
