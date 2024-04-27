import { useState } from 'react';
import UploadIcon from '../assets/upload.svg'

function ImageUploadComponent() {
  const [image, setImage] = useState<string>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProcessImage = () => {
    console.log("Processing image...");
    // Dummy function for processing the image
  };

  return (
    <div className="flex items-center justify-center w-1/2 mx-auto">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <img src={UploadIcon} alt='Upload Icon' className='size-8' />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
      </label>
      {image && (
        <div className="image-preview" style={{ width: '100px', height: '100px' }}>
          <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={handleProcessImage}>Process Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageUploadComponent;