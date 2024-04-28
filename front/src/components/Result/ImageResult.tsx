import React from "react";

interface ImagesProps {
  images: string[];
  setClickedImageIndex: (index: number) => void;
}

const ImageResult: React.FC<ImagesProps> = ({
  images,
  setClickedImageIndex,
}) => {
  return (
    <div className="px-9 mb-2 flex-1">
      <div className="flex overflow-x-auto py-1 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-none flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={() => {
              setClickedImageIndex(index);
            }}
          >
            <img src={src} alt={`Uploaded ${index}`} className="size-36" />
            <span className="mx-auto">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageResult;
