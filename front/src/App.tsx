import React, { useRef, useState } from "react";
import WelcomePage from "./components/Welcome/WelcomePage";
import Input from "./components/Input/Input";
import ImageResult from "./components/Result/ImageResult";
import AnimatedNavbar from "./components/Navbar";

const icons = [
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
  { src: "/icons/brain.jpg", label: "Brain Tumor" },
];

const outputs = {
  images: [
    "/outputs/data/1.jpg",
    "/outputs/data/2.jpg",
    "/outputs/data/3.jpg",
    "/outputs/data/4.jpg",
    "/outputs/data/5.jpg",
    "/outputs/data/6.jpg",
    "/outputs/data/7.jpg",
    "/outputs/data/8.jpg",
    "/outputs/data/9.jpg",
    "/outputs/data/10.jpg",
  ],
  mcd: [
    "/outputs/mcd/1.png",
    "/outputs/mcd/2.png",
    "/outputs/mcd/3.png",
    "/outputs/mcd/4.png",
    "/outputs/mcd/5.png",
    "/outputs/mcd/6.png",
    "/outputs/mcd/7.png",
    "/outputs/mcd/8.png",
    "/outputs/mcd/9.png",
    "/outputs/mcd/10.png",
  ],
};

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [processed, setProcessed] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState<number>();
  const [navbarActive, setNavbarActive] = useState(false);

  const handleStartNow = () => {
    setShowMainContent(true);
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  const handleBackToTop = () => {
    setShowMainContent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleIconClick = (index: number) => {
    if (index === 0) {
      setNavbarActive(true);
    }
  };

  return (
    <div>
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <WelcomePage onStarted={handleStartNow} />
      </div>

      {showMainContent && (
        <div
          ref={mainContentRef}
          className={`w-full h-screen ${
            !navbarActive && "flex items-center justify-center"
          }`}
        >
          <div className="flex items-center justify-center">
            {navbarActive ? (
              <AnimatedNavbar isActive={navbarActive} />
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {icons.map((icon, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transform transition duration-300 hover:scale-105"
                    onClick={() => handleIconClick(index)}
                  >
                    <img
                      src={icon.src}
                      alt={`Icon ${index + 1}`}
                      className="w-32 h-32" // Adjusted class name for width and height
                    />
                    <p className="text-center mt-2">{icon.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {navbarActive && (
            <div className="mt-20">
              <div className="flex flex-col items-center min-h-screen">
                <div className="w-full p-4 ">
                  <Input processed={processed} setProcessed={setProcessed} />
                </div>
                {processed && (
                  <div className="w-full my-4">
                    <div className="flex flex-col gap-4 p-4">
                      <ImageResult
                        images={outputs.images}
                        setClickedImageIndex={setClickedImageIndex}
                      />
                      <div className="flex">
                        <div className="w-1/3 mx-auto">
                          <img
                            src="/outputs/confidence.png"
                            alt="Stats"
                            className="w-96 h-96"
                          />
                        </div>
                        <div className="mx-auto">
                          {clickedImageIndex !== undefined && (
                            <img
                              src={outputs.mcd[clickedImageIndex]}
                              alt="Chart"
                              className="w-[420px] h-96"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleBackToTop}
                className="fixed bottom-5 right-5 z-50 p-2 bg-blue-500 text-white rounded"
              >
                Back to Top
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
