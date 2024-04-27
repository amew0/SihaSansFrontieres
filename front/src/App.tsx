import React, { useRef, useState } from "react";
import WelcomePage from "./components/Welcome/WelcomePage";
import Input from "./components/Input/Input";
import ImageResult from "./components/Result/ImageResult";

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [processed, setProcessed] = useState(false);

  const handleStartNow = () => {
    setShowMainContent(true);
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

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
  };

  const handleBackToTop = () => {
    setShowMainContent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <WelcomePage onStarted={handleStartNow} />
      </div>

      {showMainContent && (
        <>
          <div
            ref={mainContentRef}
            className="w-full h-full flex flex-col items-center min-h-screen"
          >
            <div className="w-full p-4 border rounded-lg my-4">
              <Input setProcessed={setProcessed} />
            </div>
            {processed && (
              <div className="w-full my-4">
                <div className="flex flex-col gap-4 p-4">
                  <ImageResult images={outputs.images} />
                  <div className="flex justify-between mx-auto">
                    <img src="/outputs/data/10.jpg" alt="Stats" className="w-1/2" />
                    <img src="/outputs/data/10.jpg" alt="Chart" className="w-1/2" />
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
        </>
      )}
    </div>
  );
};

export default App;
