import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TrendLine = () => {
  const numberRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Animate the trend line drawing
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.fromTo(
        pathRef.current,
        {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          delay: 0.3,
        },
      );
    }

    // Animate number counting up
    const obj = { val: 2450 };
    gsap.to(obj, {
      val: 8742,
      duration: 2.5,
      delay: 0.5,
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(obj.val).toLocaleString();
        }
      },
    });

    // Pulse animation for the indicator dot
    gsap.to(".trend-dot", {
      scale: 1.3,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="trend-line-container">
      <div className="trend-mini-screen">
        <div className="trend-header">
          <div className="trend-indicator">
            <div className="trend-dot"></div>
            <span>Growth</span>
          </div>
        </div>

        <svg
          className="trend-svg"
          viewBox="0 0 120 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="trendGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d="M 5 45 Q 20 40, 30 35 T 50 25 T 70 20 T 90 15 T 115 10"
            fill="none"
            stroke="url(#trendGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Dots on the line */}
          <circle cx="5" cy="45" r="2" fill="#667eea" opacity="0.6" />
          <circle cx="30" cy="35" r="2" fill="#667eea" opacity="0.6" />
          <circle cx="50" cy="25" r="2" fill="#667eea" opacity="0.6" />
          <circle cx="70" cy="20" r="2" fill="#667eea" opacity="0.6" />
          <circle cx="90" cy="15" r="2" fill="#667eea" opacity="0.6" />
          <circle cx="115" cy="10" r="3" fill="#764ba2" className="trend-dot" />
        </svg>

        <div className="trend-number-container">
          <div className="trend-label">Active Users</div>
          <div className="trend-number" ref={numberRef}>
            0
          </div>
          <div className="trend-change">+24.5% ↑</div>
        </div>
      </div>
    </div>
  );
};

export default TrendLine;
