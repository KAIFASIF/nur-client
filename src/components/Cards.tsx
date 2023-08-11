import React from "react";

interface cardsProps {
  children: any;
}
const Cards: React.FC<cardsProps> = ({ children }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-2xl p-5  h-full">{children}</div>
  );
};

export default React.memo(Cards);
