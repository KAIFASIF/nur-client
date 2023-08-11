import React, { useEffect } from "react";

interface billDetailProps {
  billDetailObj: any;
}

const BillDetail: React.FC<billDetailProps> = ({ billDetailObj }) => {
  return (
    <div className="flex  justify-end   ">
      <div className="flex gap-5 justify-end p-2  ml-5">
      <h1 className="text-md font-semibold text-gray-400">
          Bill no :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {billDetailObj?.billno}
          </span>
        </h1> 
        <h1 className="text-md font-semibold text-gray-400">
          Amount :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            Rs {billDetailObj?.amount}
          </span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          DiscountKey :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {billDetailObj?.discountKey ? billDetailObj?.discountKey :"-"}
          </span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          DiscountValue :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            Rs {billDetailObj?.discount}
          </span>
        </h1>

        <h1 className="text-md font-semibold text-gray-400">
          Grand total :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            Rs {billDetailObj?.grandTotal}
          </span>
        </h1>
       
        <h1 className="text-md font-semibold text-gray-400">
          Payment mode :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {billDetailObj?.paymentMode}
          </span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          Pending Amount :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            Rs {billDetailObj?.pendingAmount}
          </span>
        </h1>
        
        <h1 className="text-md font-semibold text-gray-400">
           Amount paid :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            Rs {billDetailObj?.amountPaid}
          </span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          Status :{" "}
          <span
            className={`text-lg font-semibold ${
              billDetailObj?.status === "paid" ? "text-green-600" : "text-red-600"
            }`}
          >
            {" "}
            {billDetailObj?.status}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default React.memo(BillDetail);
