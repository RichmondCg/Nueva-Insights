import React from "react";
import "./App.css";
import LightRays from "./elements/LightRays";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GradientText from "./elements/GradientText";
import SocialMediaGraph from "./elements/SocialMediaGraph";
import TrendLine from "./elements/TrendLine";
import { Facebook, Instagram, Linkedin, Youtube, Music2 } from "lucide-react";
import logo from "./assets/logo.png";
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

      <header>
        <nav>
          <img src={logo} alt="Nueva Insights Logo" className="w-16 h-16" />
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
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div></div>
        </nav>
      </header>
      <main>
        <section class="hero relative">
          <div class="hero-section">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF", "#ffffff"]}
              animationSpeed={8}
              showBorder={false}
              className=" hero-title custom-class"
            >
              Nueva Insights Marketing
            </GradientText>
            <p class="hero-subtitle">
              Your partner in data-driven marketing solutions.
            </p>
            <button class="cta-button">Get Started</button>
          </div>

          {/* Background elements */}
          <div
            className="absolute right-0 bottom-0 -z-10"
            style={{
              transform: "rotate(20deg) translateX(15%) translateY(15%)",
              filter: "blur(0px)",
              opacity: 0.6,
              transformOrigin: "center center",
            }}
          >
            <SocialMediaGraph />
          </div>

          <TrendLine />

          <div className="hero-socials" aria-label="Social media links">
            <a
              href="#"
              className="social-icon social-facebook"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="social-icon social-instagram"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="social-icon social-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="social-icon social-youtube"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              href="#"
              className="social-icon social-tiktok"
              aria-label="TikTok"
            >
              <Music2 size={16} />
            </a>
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

        <section className="features flex flex-col items-center">
          <h2>Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mx-auto max-w-7xl">
            <div className="feature">
              <h3>Feature 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="feature">
              <h3>Feature 2</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="feature">
              <h3>Feature 3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="feature">
              <h3>Feature 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="feature">
              <h3>Feature 2</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="feature">
              <h3>Feature 3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>

        <section className="pricing">
          <h2>Pricing Plans</h2>
          <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto max-w-7xl">
            <div className="pricing-card">
              <h3>Basic</h3>
              <p className="price">$19/month</p>
              <ul>
                <li>Feature A</li>
                <li>Feature B</li>
                <li>Feature C</li>
              </ul>
              <button className="select-plan">Select Plan</button>
            </div>
            <div className="pricing-card">
              <h3>Pro</h3>
              <p className="price">$49/month</p>
              <ul>
                <li>Feature A</li>
                <li>Feature B</li>
                <li>Feature C</li>
                <li>Feature D</li>
              </ul>
              <button className="select-plan">Select Plan</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <p className="price">Contact Us</p>
              <ul>
                <li>Feature A</li>
                <li>Feature B</li>
                <li>Feature C</li>
                <li>Feature D</li>
                <li>Feature E</li>
              </ul>
              <button className="select-plan">Select Plan</button>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto max-w-7xl">
            <div className="testimonial-card">
              <p>
                "Nueva Insights transformed our marketing strategy and boosted
                our ROI significantly!"
              </p>
              <h4>- Client A</h4>
            </div>
            <div className="testimonial-card">
              <p>
                "The team at Nueva Insights is incredibly knowledgeable and
                responsive. Highly recommend!"
              </p>
              <h4>- Client B</h4>
            </div>
            <div className="testimonial-card">
              <p>
                "Thanks to Nueva Insights, we have a much clearer understanding
                of our customer data and how to leverage it."
              </p>
              <h4>- Client C</h4>
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
