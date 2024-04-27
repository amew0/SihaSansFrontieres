import { useState } from "react";

interface ImagesProps {
  processed: boolean;
  setProcessed: (processed: boolean) => void;
}

const ImageUploadComponent: React.FC<ImagesProps> = ({ processed, setProcessed }) => {
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
    <>
      <div className="flex justify-center items-center my-8">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          {/* Icon from Heroicons */}
          <path d="M16.7,5.3l-2-2C14.5,3.1,14.3,3,14,3H6C5.4,3,5,3.4,5,4v12c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V6C15,5.7,15.1,5.5,15.3,5.3z M14,7v9H6V5h7v2H14z" />
          <path d="M8,11h4v2H8V11z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input
          // ref={fileInputRef}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
          type="file"
          onChange={handleImageUpload}
          multiple // This is required to select multiple files
        />
      </label>
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
            <span className="mx-auto">{index + 1}</span>
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
            Analyze Images
          </button>
        )}
      </div>
    </>
  );
};

export default ImageUploadComponent;
