import React from "react";

interface ImagesProps {
  images: string[];
}

const ImageResult: React.FC<ImagesProps> = ({ images }) => {
  return (
    <div className="px-9 mb-2 flex-1">
      <div className="grid grid-cols-10 gap-4">
        {/* Adjust this grid layout as needed */}
        {images.map((src, index) => (
          <div className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              key={index}
              src={src}
              alt={`Uploaded ${index}`}
              className="size-36"
            />
            <span className="mx-auto">{index+1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageResult;
