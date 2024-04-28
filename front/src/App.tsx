import React, { useRef, useState } from "react";
import WelcomePage from "./components/Welcome/WelcomePage";
import Input from "./components/Input/Input";
import ImageResult from "./components/Result/ImageResult";
import AnimatedNavbar from "./components/Navbar";
import { icons, outputs } from "./data";

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
                      className="size-32" // Adjusted class name for width and height
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
                      <div className="flex mx-auto">
                        <div className="w-[420px] h-96">
                          <img
                            src="/outputs/confidence.png"
                            alt="Stats"
                            className=""
                          />
                        </div>
                        <div className="w-[420px] h-96">
                          {clickedImageIndex !== undefined ? (
                            <img
                              src={outputs.mcd[clickedImageIndex]}
                              alt="Chart"
                              className=""
                            />
                          ) : (
                            <div className="w-[420px] h-80 border border-gray-200 text-center my-auto">
                              Hover over the analyzed images to see more!
                            </div>
                          )}
                        </div>
                        <div className="w-[420px] h-96">
                          <div className="w-[420px] h-80 flex flex-col border border-gray-200 text-center my-auto font-bold text-ellipsis text-3xl">
                            <div>Final Confidence:</div>
                            <span>%</span>
                          </div>
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
