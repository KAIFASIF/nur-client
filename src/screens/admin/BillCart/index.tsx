import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";
import Loader from "../../../components/Loader";
import { fetchBilledcart } from "../../../service/adminInvoiceService";
import { useParams } from "react-router-dom";
import BillDetail from "./BillDetail";

const BillCart = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [billDetailObj, setBillDetailObj] = useState<any>({});
  useEffect(() => {
    if (id) {
      getBillCart();
    }
  }, []);

  const getBillCart = async () => {
    try {
      setLoader(true);
      const res = await fetchBilledcart(id);
      if (res?.status === 200) {
        setData(res.data?.billcart);
        setBillDetailObj(res.data?.Invoice);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div className="w-full">
      <Loader loader={loader} />
      <div className="mt-10">
        <CartTable data={data} />
      </div>
      <div className="mt-5">
        <BillDetail billDetailObj={billDetailObj} />
      </div>
    </div>
  );
};

export default React.memo(BillCart);
