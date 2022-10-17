import React from "react";

import MainNavbar from "./MainNavbar";

const Base = ({ title = "Welcome to Our Website!", children }) => {
  return (
    <>
   
      {children}
    </>
  );
};
export default Base;
