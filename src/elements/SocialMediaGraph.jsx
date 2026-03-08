import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SocialMediaGraph = () => {
  const chartRef = useRef(null);
  const barsRef = useRef([]);
  const statsRef = useRef([]);

  useEffect(() => {
    // Animate bars
    gsap.fromTo(
      barsRef.current,
      {
        height: 0,
      },
      {
        height: (i) => [60, 45, 75, 55, 85, 70, 95].map((v) => `${v}%`)[i],
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5,
      },
    );

    // Animate numbers counting up
    statsRef.current.forEach((stat, i) => {
      const endValue = [12.5, 8.3, 15.7][i];
      const obj = { val: 0 };
      gsap.to(obj, {
        val: endValue,
        duration: 2,
        delay: 0.5,
        onUpdate: () => {
          if (stat) stat.textContent = obj.val.toFixed(1) + "K";
        },
      });
    });

    // Continuous pulse animation for active indicator
    gsap.to(".live-indicator", {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="social-media-screen">
      <div className="screen-frame">
        {/* Screen header */}
        <div className="screen-header">
          <div className="live-badge">
            <div className="live-indicator"></div>
            <span>Live Analytics</span>
          </div>
          <div className="screen-time">14:32</div>
        </div>

        {/* Main content */}
        <div className="screen-content">
          <h3 className="analytics-title">Social Media Performance</h3>

          {/* Stats cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div
                className="stat-value"
                ref={(el) => (statsRef.current[0] = el)}
              >
                0K
              </div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div
                className="stat-value"
                ref={(el) => (statsRef.current[1] = el)}
              >
                0K
              </div>
              <div className="stat-label">Engagement</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div
                className="stat-value"
                ref={(el) => (statsRef.current[2] = el)}
              >
                0K
              </div>
              <div className="stat-label">Reach</div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="chart-container" ref={chartRef}>
            <div className="chart-title">Weekly Activity</div>
            <div className="bars-wrapper">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div className="bar-column" key={day}>
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        ref={(el) => (barsRef.current[i] = el)}
                      ></div>
                    </div>
                    <div className="bar-label">{day}</div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Platform indicators */}
          <div className="platform-row">
            <div className="platform-badge">
              <span className="platform-icon">📘</span> Facebook
            </div>
            <div className="platform-badge">
              <span className="platform-icon">📷</span> Instagram
            </div>
            <div className="platform-badge">
              <span className="platform-icon">🐦</span> Twitter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGraph;
