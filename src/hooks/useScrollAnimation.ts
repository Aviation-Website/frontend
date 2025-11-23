import { useRef, useEffect } from 'react';

/**
 * Custom hook that applies scroll-triggered transform animations
 * similar to Google Antigravity's scroll behavior
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Listen for scroll events on this element
            const handleScroll = () => {
              const rect = element.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              // Calculate scroll progress (0 to 1)
              // When element is at bottom of viewport (rect.top = windowHeight), progress = 0
              // When element is at top of viewport (rect.top = 0), progress = 1
              const progress = Math.max(
                0,
                Math.min(1, 1 - rect.top / windowHeight)
              );

              // Apply scale transform (scales from 0.95 to 1 as you scroll past)
              const scale = 0.95 + progress * 0.05;
              
              // Apply opacity fade (fades in as you scroll)
              const opacity = Math.max(0.8, 1 - (1 - progress) * 0.2);

              element.style.transform = `scale(${scale})`;
              element.style.opacity = String(opacity);
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial call

            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
