import React from "react";
import "./App.css";
import LightRays from "./elements/LightRays";
import LiquidEther from "./elements/LiquidEther";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Stack from "./elements/Stack";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const images = [
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
  ];

  useGSAP(() => {
    gsap.from(".nav-links li", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: {
        each: 0.2,
        from: "center",
      },
      ease: "power2.out",
    });
    gsap.from(".hero-title", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: -30,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
    gsap.from(".cta-button", {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    });
    gsap.from(".about-left", {
      opacity: 0,
      x: -100,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-left",
        start: "-=200 center",
        toggleActions: "play none none reverse",
        markers: true,
        scrub: true,
      },
    });
    gsap.from(".about-right", {
      opacity: 0,
      x: 300,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-right",
        start: "-=400 center",
        toggleActions: "play none none reverse",
        markers: true,
        scrub: true,
      },
    });
    const services = gsap.utils.toArray(".service");

    gsap.to(services, {
      xPercent: -100 * (services.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".services",
        pin: true,
        scrub: 1,
        snap: 1 / (services.length - 1),
        end: () =>
          "+=" +
          (document.querySelector(".services").scrollWidth - window.innerWidth),
        markers: true,
        onUpdate: (self) => {
          services.forEach((service, i) => {
            const progress = self.progress;
            const maxIndex = services.length - 1;
            const offset = i - progress * maxIndex;
            const clampedOffset = gsap.utils.clamp(-1.5, 1.5, offset);

            // Exiting cards should feel closer: bigger + more forward in Z.
            const exitProgress = Math.min(Math.abs(clampedOffset) / 1.5, 1);
            const rotation = clampedOffset * -44;
            const scale = 1 + exitProgress * 0.35;
            const zDistance = 120 + exitProgress * 520;
            const origin = clampedOffset < 0 ? "left center" : "right center";

            gsap.set(service, {
              rotateY: rotation,
              scale,
              z: zDistance,
              transformOrigin: origin,
              force3D: true,
            });
          });
        },
      },
    });
  });

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={0.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <LiquidEther
          colors={["#18e7bd", "#16b5d4", "#00fa9a"]}
          mouseForce={20}
          cursorSize={65}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={18}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoPlay={true}
          autoSpeed={0.35}
          autoIntensity={4}
          takeoverDuration={0.25}
          autoResumeDelay={0.5}
          autoRampDuration={0.6}
          color0="#18e7bd"
          color1="#16b5d4"
          color2="#00fa9a"
        />
      </div>
      <header>
        <nav>
          <ul class="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section class="hero">
          <div class="hero-section">
            <h1 class="hero-title">Nueva Insights Marketing</h1>
            <p class="hero-subtitle">
              Your partner in data-driven marketing solutions.
            </p>
            <button class="cta-button">Get Started</button>
          </div>
        </section>

        <section class="about-us">
          <div class="about-left">
            <h2>About Us</h2>
            <p>
              We are a team of experts dedicated to helping businesses grow
              through data-driven marketing strategies.
            </p>
          </div>
          <div class="about-right">
            <div style={{ width: 400, height: 400 }}>
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                ))}
                autoplay={true}
                autoplayDelay={1500}
                pauseOnHover={false}
              />
            </div>
          </div>
        </section>

        <section>
          <h2>Our Services</h2>
          <div class="services">
            <div className="service">
              <div className="service-card">
                <h3>Service A</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="service">
              <div className="service-card">
                <h3>Service B</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="service">
              <div className="service-card">
                <h3>Service C</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="service">
              <div className="service-card">
                <h3>Service D</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="service">
              <div className="service-card">
                <h3>Service E</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="service">
              <div className="service-card">
                <h3>Service F</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Contact Us</h2>
          <form class="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
