import React from "react";
import { SlClose } from "react-icons/Sl";

interface modalprops {
  children: any;
  visible: boolean;
  handleModalClose: () => void;
  modalSize?: string;
}

const NewModal: React.FC<modalprops> = ({
  children,
  visible,
  modalSize,
  handleModalClose,
}) => {
  const handleVisible = () => {
    handleModalClose();
  };

  return (
    visible && (
      <div>
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-25 flex justify-center items-start"
          id="wrapper"
        >
          <div
            className={`bg-white rounded p-5 flex flex-col  mt-2 ${
              modalSize ? modalSize : "w-[60%]"
            }`}
          >
            <div className="flex justify-end mb-4">
              <SlClose
                className="cursor-pointer text-red-600 text-2xl"
                onClick={handleVisible}
              />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(NewModal);
