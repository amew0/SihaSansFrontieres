import { useEffect, useState } from "react";

interface ImagesProps {
  processed: boolean;
  setProcessed: (processed: boolean) => void;
}

const ImageUploadComponent: React.FC<ImagesProps> = ({
  processed,
  setProcessed,
}) => {
  const [images, setImages] = useState<string[]>([]); // Store an array of image URLs
  const [processingStatus, setProcessingStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
              setImages(imageUrls);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  useEffect(() => {
    let timeoutId: number;
    if (isProcessing) {
      const statuses = [
        "Removing metadata",
        "Sending anonymized images",
        "Analyzing images",
        "Upload new files",
        "Processing complete!",
        ""
      ];
      let currentStatusIndex = 0;
      setProcessingStatus(statuses[currentStatusIndex]);

      timeoutId = setInterval(() => {
        currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        setProcessingStatus(statuses[currentStatusIndex]);
        if (currentStatusIndex === statuses.length - 1) {
          clearInterval(timeoutId);
          setIsProcessing(false);
          setProcessed(true);
        }
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [isProcessing]);

  const handleProcessImage = () => {
    console.log("Processing images...");
    setIsProcessing(true);
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
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={handleImageUpload}
          multiple
        />
      </div>
      <div className="grid grid-cols-10 gap-4">
        {!processed &&
          images.map((src, index) => (
            <div key={index} className="flex flex-col">
              <img src={src} alt={`Uploaded ${index}`} className="size-36" />
              <span className="mx-auto">{index + 1}</span>
            </div>
          ))}
      </div>
      <div className="my-2">
        {images.length > 0 && (
          <button
            onClick={handleProcessImage}
            type="button"
            className={`my-auto h-10 w-80 text-white ${
              isProcessing ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"
            } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          >
            {isProcessing ? (
              <>
                <span 
                  className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                  role="status"
                  aria-hidden="true"
                ></span>
                {` ${processingStatus}`}
              </>
            ) : (
              "Analyze Images"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
