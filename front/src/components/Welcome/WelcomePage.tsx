import React from "react";
import gazaVideo from "../../assets/GAZA-doctors.mp4";
import logoPng from "../../assets/logo.png";

const WelcomePage: React.FC<{ onStarted: () => void }> = ({ onStarted }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src={gazaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <div className="flex">
          <img src={logoPng} className="size-16" />
          <h1 className="my-auto text-4xl font-bold text-white mb-4">
            Siha Sans Frontières
          </h1>
        </div>
        <p className="text-lg text-center text-gray-300 mb-8">
          Quantum facilitated service to relaunch health care
        </p>
        <button
          onClick={onStarted}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Now
        </button>
      </div>
      <div className="absolute bottom-0 left-0 p-4 text-white text-xs bg-black bg-opacity-50">
        Video Credit to Hanna Duggal, Mohamed Hussein and Soha Elghany from AL
        JAZEERA
      </div>
    </div>
  );
};

export default WelcomePage;
