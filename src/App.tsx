import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Addition from "./page/addition";
import EnglishPage from "./page/english";
import HomePage from "./page/home";
import Subtraction from "./page/subtraction";

function App() {
  return (
    <div className="flex h-full min-h-full flex-col container mx-auto bg-[#f3f2ef]">
      <BrowserRouter>
        <Routes>
          <Route path="/kids-activity" element={<HomePage />} />
          <Route path="/kids-activity/addition" element={<Addition />} />
          <Route path="/kids-activity/subtraction" element={<Subtraction />} />
          <Route path="/kids-activity/english" element={<EnglishPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
