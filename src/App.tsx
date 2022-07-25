import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Addition from "./page/addition";
import HomePage from "./page/home";

function App() {
  return (
    <div className="flex h-full min-h-full flex-col container mx-auto bg-[#f3f2ef]">
      <BrowserRouter>
        <Routes>
          <Route path="/kids-activity" element={<HomePage />} />
          <Route path="/addition" element={<Addition />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
