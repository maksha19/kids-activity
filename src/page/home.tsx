import React from "react";
import HomePageCard from "../components/homePage/card";
import SvgNumber from "../components/svgNumber";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigation = useNavigate();

  const navigationTo = (index: string) => {
    if (index === "0") {
      navigation("/addition");
    }
  };

  return (
    <div className="h-screen grid grid-cols-6  content-center container">
      <HomePageCard id="0" onClick={(index) => navigationTo(index)}>
        <div className="grid my-2 place-content-center ">
          <SvgNumber width="60px" height="60px" viewBox="0 0 60 60">
            <path className="scale-250" d="M20 12L4 12M12 4L12 20" />
          </SvgNumber>
        </div>
        <div className=" grid grid-rows place-content-center">
          <p className="text-4xl text-white">Addition</p>
        </div>
      </HomePageCard>
      <HomePageCard id="1" onClick={(index) => alert(index)}>
        <div className="grid place-content-center ">
          <SvgNumber width="60px" height="60px" viewBox="0 0 60 60">
            <path className="scale-250" d="M20,12 L4,12" />
          </SvgNumber>
        </div>
        <div className=" grid grid-rows place-content-center">
          <p className="text-4xl text-white">Subtraction</p>
        </div>
      </HomePageCard>
      <HomePageCard id="2" onClick={(index) => alert(index)}>
        <p className="text-7xl my-2 text-white">தமிழ்</p>
      </HomePageCard>
    </div>
  );
};

export default HomePage;
