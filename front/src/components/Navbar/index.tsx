import React from "react";

const icons = [
  { src: '/icons/brain.jpg', label: "Brain Tumor" },
  { src: '/icons/cardiac.jpg', label: "Cardiac Tumor" },
  { src: '/icons/liver.jpg', label: "Liver Tumor" },
  { src: '/icons/lung.jpg', label: "Lung Tumor" },
  { src: '/icons/prostate.jpg', label: "Prostate Tumor" },
  { src: '/icons/spleen.jpg', label: "Spleen Tumor" },
];

const Navbar: React.FC<{isActive: boolean}> = ({isActive}) => {
  return (
    <div className={`fixed top-0 left-0 w-1/3 p-4 pl-4 h-20 border border-gray-500 rounded-xl bg-gray-50 shadow-md shadow-gray-500 transition-transform duration-500 ${isActive ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center h-full py-4 gap-x-2">
        {icons.map((icon, index) => (
          <div key={index} className={`my-4 ${index===0 && 'p-2 flex flex-col hover:bg-gray-200 rounded-xl cursor-pointer'}`}>
            <img src={icon.src} alt={`Icon ${index + 1}`} className="size-8 mx-auto" />
            <div className={`text-center mt-2 text-sm font-semibold mx-auto ${index!==0 && 'text-gray-400'}`}>{icon.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;