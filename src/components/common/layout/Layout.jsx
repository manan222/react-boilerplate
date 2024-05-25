import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const DashboardLayout = props => {
  return (
    <>
      <div className="mb-5">
        <Header />
      </div>
      {props?.children}
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;
