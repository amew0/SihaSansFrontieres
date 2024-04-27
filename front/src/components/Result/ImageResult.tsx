import React from "react";

interface ImagesProps {
  images: string[];
}

const ImageResult: React.FC<ImagesProps> = ({ images }) => {
  return (
    <div className="border p-4 flex-1">
      <div className="grid grid-cols-10 gap-4">
        {" "}
        {/* Adjust this grid layout as needed */}
        {images.map((src, index) => (
          <img
            key={index}
            src={`${src}`}
            alt={`Uploaded ${index}`}
            className="size-36"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageResult;
