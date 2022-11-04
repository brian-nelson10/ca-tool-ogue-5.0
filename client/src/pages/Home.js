import React from "react";
import ToolList from "../components/ToolList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
    return (
      <div className="container">
        <CategoryMenu />
        <ToolList />
      </div>
    );
  };

export default Home;
