import React, { useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    handleLogout();
  }, [logOut, navigate]);

  return <div>Loading....</div>;
};

export default Logout;
