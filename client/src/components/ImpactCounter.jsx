import React, { useState, useEffect, useRef } from 'react';

const ImpactCounter = ({ target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const update = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Quartic ease-out
              const easeOut = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.floor(easeOut * target);
              setCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(update);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target]);

  return (
    <div className="impact-item" ref={ref}>
      <span className="impact-number">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="impact-label">{label}</span>
    </div>
  );
};

export default ImpactCounter;
