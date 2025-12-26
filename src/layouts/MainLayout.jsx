import React from "react"
import Navbar from "../components/common/Navbar.jsx";

function MainLayout({ children}) {
  return (
    <>
    <Navbar />
    <div style={style.container}>{ children }</div>
    </>
  );
};

const style = {
    container: {
        display: "flex",
        backgroundColor: "#f0f2f5",
        minHeight: "calc(100vh - 60px)"
    }
};

export default MainLayout