import React from 'react';
import ImageResult from './ImageResult';
import StatsResult from './StatsResult';
import ChartResult from './ChartResult';

const ResultPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
    <ImageResult />
    <div className="flex justify-between gap-4">
      <StatsResult />
      <ChartResult />
    </div>
  </div>
  );
};

export default ResultPage;