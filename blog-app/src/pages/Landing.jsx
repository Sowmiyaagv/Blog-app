import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const images = [
  { src: "/kitchenware.png", alt: "Kitchenware", top: "35%", left: "18%" },
  { src: "/alpaca.png", alt: "Alpaca", top: "55%", left: "12%" },
  { src: "/clipboard.png", alt: "Clipboard", top: "75%", left: "22%" },
  { src: "/ice.png", alt: "Ice", top: "65%", left: "28%" },
  { src: "/rack.png", alt: "Rack", top: "80%", left: "32%" },
  { src: "/humming bird.png", alt: "Humming Bird", top: "35%", left: "92%" },
  { src: "/pencil.png", alt: "Pencil", top: "55%", left: "88%" },
  { src: "/smile.png", alt: "Smile", top: "75%", left: "82%" },
  { src: "/ice1.png", alt: "Ice1", top: "88%", left: "90%" },
  { src: "/squireel.png", alt: "Squirrel", top: "65%", left: "95%" },
  { src: "/priest.png", alt: "Priest", top: "60%", left: "78%" },
];

const memoryImages = [
  { src: "/hith4.jpg", alt: "Memory 1", rotate: "-10deg", top: "30%" },
  { src: "/hith2.jpg", alt: "Memory 2", rotate: "5deg", top: "40%" },
  { src: "/hith5.jpg", alt: "Memory 3", rotate: "15deg", top: "50%" },
];

export default function Landing() {
  const [show, setShow] = useState(Array(images.length).fill(false));
  const [showCentre, setShowCentre] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMemory, setShowMemory] = useState(Array(memoryImages.length).fill(false));
  const navigate = useNavigate();
  const section2Ref = useRef(null);
  const [section2InView, setSection2InView] = useState(false); 

  useEffect(() => {
    // Animate PNGs after 2.5s
    const timers = [];
    const start = setTimeout(() => {
      images.forEach((_, idx) => {
        timers[idx] = setTimeout(() => {
          setShow((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
        }, (idx % Math.ceil(images.length / 2)) * 400);
      });
      setTimeout(() => setShowCentre(true), 1200);
    }, 1000);
    return () => {
      clearTimeout(start);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setSection2InView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (section2Ref.current) observer.observe(section2Ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (section2InView) {
      const timers = [];
      memoryImages.forEach((_, idx) => {
        timers[idx] = setTimeout(() => {
          setShowMemory((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
        }, idx * 500); // 0.5s delay between each
      });
      return () => timers.forEach(clearTimeout);
    } else {
      setShowMemory(Array(memoryImages.length).fill(false));
    }
  }, [section2InView]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  // Scroll to section 2
  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <div
      className="w-full min-h-screen px-2 sm:px-6"
      style={{
        background:
          "linear-gradient(135deg, #7c5a3e 0%, #a97c50 60%, #e2c8b0 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Top right login/logout */}
      <div className="absolute top-0 right-0 flex items-center gap-4 p-4 z-50">
        {token ? (
          <>
            <span className="text-[#5e4444] font-semibold">
              {username ? `Logged in as ${username}` : ""}
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#a97c50] text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="bg-[#a97c50] text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>

      {/* Side Panel */}
      {!section2InView && (
        <div className="fixed top-1/4 left-0 flex flex-col gap-4 bg-[#e2c8b0]/90 px-5 py-8 rounded-r-2xl shadow-lg z-20">
          <button className="text-[#5e4444] font-semibold hover:underline text-lg text-left">
            Recent Blogs
          </button>
          <button className="text-[#5e4444] font-semibold hover:underline text-lg text-left">
            Trending Topics
          </button>
          <button className="text-[#5e4444] font-semibold hover:underline text-lg text-left">
            Must Read Blogs
          </button>
        </div>
      )}

      {/* Center Content */}
      <div className="flex flex-col items-center z-10 pt-32 pb-32 min-h-screen relative">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#fff9f6] drop-shadow-lg mb-10 tracking-wide text-center">
          Welcome to Luna Blogs
        </h1>
        <button
          className="bg-[#c89f9c] hover:bg-[#b38c8b] text-white px-6 sm:px-12 py-3 sm:py-5 rounded-xl text-lg sm:text-2xl font-semibold shadow-lg transition"
          onClick={() => navigate("/blogs")}
        >
          View Blogs
        </button>
        {/* Centre image below button, animated */}
        <img
          src="/centre.jpg"
          alt="Center Decoration"
          className={`
            mt-8 pointer-events-none select-none transition-all duration-700
            ${showCentre
              ? "opacity-85 translate-y-0 scale-100"
              : "opacity-0 translate-y-[120vh] scale-75"}
            w-48 h-48 sm:w-80 sm:h-80
          `}
          style={{
            objectFit: "contain",
          }}
        />
        {/* Animated PNGs - Only in landing section */}
        {!section2InView && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {images.map((img, idx) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className={`
                  select-none
                  absolute
                  transition-all duration-700 ease-out
                  ${show[idx]
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-[120vh] scale-75"}
                `}
                style={{
                  top: img.top,
                  left: img.left,
                  width: "96px",
                  height: "96px",
                  marginLeft: "-48px",
                  marginTop: "-48px",
                }}
              />
            ))}
          </div>
        )}
        {/* Down Arrow */}
        <button
          onClick={scrollToSection2}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#fff9f6]/70 hover:bg-[#e2c8b0] text-[#a97c50] rounded-full p-3 shadow-lg transition"
          aria-label="Scroll Down"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path d="M12 16V4M12 16l6-6M12 16l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

      {/* --- Section 2: Share your memories --- */}
      <section
        ref={section2Ref}
        className="w-full min-h-screen flex justify-center items-center relative"
        style={{
          backgroundImage: "url('/back1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl w-full p-4 sm:p-12 rounded-xl shadow-lg text-white text-center bg-gradient-to-br from-[#e2c8b0] via-[#a97c50] to-[#7c5a3e] bg-opacity-80">
          <h2 className="text-4xl font-bold mb-4">Share your memories</h2>
          <p className="mb-8 text-lg">
            Save the moments that matter. Luna Blogs lets you safely store thousands of posts, photos, and more. Relive your best memories and share them with the world!
          </p>
          <img
            src="memory3.jpg"
            alt="Memories"
            className="mx-auto w-40 h-40 object-contain rounded-full shadow"
          />
        </div>
        {/* Animated memory images on right */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-0 items-end z-20">
          {memoryImages.map((img, idx) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={`
                transition-all duration-700 ease-out
                shadow-xl rounded-lg
                ${showMemory[idx]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[200px]"}
              `}
              style={{
                width: "260px",
                height: "180px",
                marginBottom: "-60px",
                transform: `rotate(${img.rotate})`,
                position: "relative",
                top: img.top,
                zIndex: 10 + idx,
                objectFit: "cover",
                boxShadow: "0 8px 32px rgba(80,60,40,0.18)",
              }}
            />
          ))}
        </div>

        {/* Fixed image in bottom-left */}
        <img
          src="/hith6.png"
          alt="Decoration"
          className="absolute z-30"
          style={{
            left: "-40px",
            bottom: "16px",
            width: "300px",
            height: "180px",
            objectFit: "contain",
          }}
        />
      </section>

      {/* --- Section 3: Join millions of others --- */}
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: "url('/join.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="max-w-2xl w-full p-12 rounded-xl shadow-lg text-[#5e4444] text-center"
          style={{
            background: "rgba(255, 245, 230, 0.75)", // light, warm, semi-transparent
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow: "0 8px 32px rgba(80,60,40,0.10)",
          }}
        >
          <h2 className="text-4xl font-bold mb-4">Join millions of others</h2>
          <p className="mb-8 text-lg">
            Become part of a vibrant community! Share your stories, connect with like-minded people, and inspire others with your unique experiences. Luna Blogs is where your voice matters—start your journey today!
          </p>
          <img
            src="/community.png"
            alt="Community"
            className="mx-auto w-48 h-48 object-contain rounded-full shadow"
          />
        </div>
      </section>

      {/* --- Section 4: Contact & Help --- */}
      <section
        className="w-full min-h-[60vh] flex flex-col justify-center items-center relative"
        style={{
          background: "linear-gradient(135deg, #a97c50 0%, #7c5a3e 100%)", // brown gradient
        }}
      >
        <div className="max-w-xl w-full p-10 rounded-xl shadow-lg text-white text-center"
          style={{
            background: "rgba(124, 90, 62, 0.85)", // solid brown with opacity
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Contact & Help</h2>
          <p className="mb-6 text-lg">
            Need assistance or want to reach out? We're here to help!
          </p>
          <div className="flex flex-col gap-3 items-center">
            <div>
              <span className="font-semibold">Help Center:</span> <a href="#" className="text-[#ffe2b8] underline">Visit Help Center</a>
            </div>
            <div>
              <span className="font-semibold">Email:</span> <a href="mailto:support@lunablogs.com" className="text-[#ffe2b8] underline">support@lunablogs.com</a>
            </div>
            <div>
              <span className="font-semibold">Community:</span> <a href="#" className="text-[#ffe2b8] underline">Join Discussions</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

