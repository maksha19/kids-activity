import React, { PropsWithChildren } from "react";

interface Props {
  id: string;
  onClick: (index: string) => void;
}

const HomePageCard = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, id, onClick } = props;
  return (
    <button className="my-4 col-start-2 col-span-4" onClick={() => onClick(id)}>
      <div className="sm:py-4 py-8 px-8 bg-[#D97A07] rounded-xl shadow-md">
        {children}
      </div>
    </button>
  );
};

export default HomePageCard;
