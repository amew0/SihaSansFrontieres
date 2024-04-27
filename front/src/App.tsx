import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState({ stats: null, chart: null });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <div className="input-page">
        <input type="file" onChange={handleImageUpload} />
      </div>
      {image && (
        <div className="result-page">
          <div className="image-result">
            <img src={image} alt="Uploaded" />
          </div>
          <div className="stats-result">
            <p>{results.stats}</p>
          </div>
          <div className="chart-result">
            <p>{results.chart}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;