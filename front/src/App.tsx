import React, { useRef, useState } from 'react';
import WelcomePage from './components/Welcome/WelcomePage';
import Input from './components/Input/Input'; // Assume you have this component
import ResultPage from './components/Result/ResultPage'; // Assume you have this component

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleStartNow = () => {
    setShowMainContent(true); 
    setTimeout(() => { 
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const handleBackToTop = () => {
    setShowMainContent(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <WelcomePage onStarted={handleStartNow} />
      </div>
      
      {showMainContent && (
        <>
          <div ref={mainContentRef} className="w-full flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4 border rounded-lg border-green-500 my-4">
              <Input />
            </div>
            <div className="w-full max-w-4xl my-4">
              <ResultPage />
            </div>
          </div> 
          <button onClick={handleBackToTop} className="fixed bottom-5 right-5 z-50 p-2 bg-blue-500 text-white rounded">
            Back to Top
          </button>
        </>
      )}
    </div>
  );
};

export default App;