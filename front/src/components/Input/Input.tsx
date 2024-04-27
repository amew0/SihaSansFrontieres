import { useState } from "react";

interface ImagesProps {
  setProcessed: (processed: boolean) => void;
}

const ImageUploadComponent: React.FC<ImagesProps> = ({ setProcessed }) => {
  const [images, setImages] = useState<string[]>([]); // Store an array of image URLs

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      ); // Filter out non-image files
      const imageUrls: string[] = [];
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            imageUrls.push(e.target.result as string);
            if (imageUrls.length === imageFiles.length) {
              setImages(imageUrls); // Update state when all images are loaded
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleProcessImage = () => {
    console.log("Processing images...");
    setProcessed(true);
    // Dummy function for processing the images
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center w-1/2">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload folder
        </label>
        <input
          // ref={fileInputRef}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={handleImageUpload}
          multiple // This is required to select multiple files
        />
      </div>
      <div className="grid grid-cols-10 gap-4">
        {" "}
        {/* Adjust this grid layout as needed */}
        {images.map((src, index) => (
          <div className="flex flex-col">
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
      <div className="my-2">
        {images.length > 0 && (
          <button
            onClick={handleProcessImage}
            type="button"
            className="my-auto h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Process Images
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
