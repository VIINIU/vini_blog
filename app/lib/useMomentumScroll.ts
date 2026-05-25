import { useRef, useEffect } from 'react';

/**
 * 스크롤 시 사이드바 등에 부드러운 스크롤 관성 및 Parallax 모션을 제공하는 훅
 * @param damping 감쇄율 (0 ~ 1, 낮을수록 빨리 멈춤)
 * @param speed 스크롤 속도 가중치
 */
export function useMomentumScroll(damping = 0.5, speed = 0.08) {
  const current = useRef(0);
  const rafId = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 시 translateY 목표값 업데이트
      current.current = window.scrollY * speed;
    };

    const animate = () => {
      if (Math.abs(current.current) > 0.1) {
        current.current *= damping;
        if (elementRef.current) {
          elementRef.current.style.transform = `translateY(${current.current}px)`;
        }
      } else {
        current.current = 0;
        if (elementRef.current) {
          elementRef.current.style.transform = `translateY(0px)`;
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [damping, speed]);

  return elementRef;
}
