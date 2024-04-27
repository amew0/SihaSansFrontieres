import { useState } from "react";

function ImageUploadComponent() {
  const [image, setImage] = useState<string>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result as string);
        console.log("Image uploaded");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProcessImage = () => {
    console.log("Processing image...");
    // Dummy function for processing the image
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center w-1/2">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={handleImageUpload}
        />
      </div>
      {image && (
        <div className="flex">
          <img
            src={image}
            alt="Uploaded"
            className="size-52"
          />
          <button></button>
          <button
            onClick={handleProcessImage}
            type="button"
            className="my-auto h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Process Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUploadComponent;
