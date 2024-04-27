import { useState } from "react";
import Input from "./components/Input";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <div className="w-full h-1/3 border rounded-lg border-green-500">
        <Input />
      </div>

      <div className="h-2/3">
        <ResultPage />
      </div>
    </div>
  );
}

export default App;
