import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { authAtom } from "../../recoil/authAtom";
import { useRecoilState } from "recoil";

const signout = () => {
  const navigate = useNavigate();
  const [setAuth] = useRecoilState(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    SignoutUser();
  }, []);

  const SignoutUser = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/signin");
      setAuth("");
    }, 1000);
  };
  return <Loader loader={loader} />;
};

export default React.memo(signout);
