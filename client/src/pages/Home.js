import React, { useState } from "react";
import ToolList from "../components/ToolList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  const [currentCategory, setCategory] = useState("");

  return (
    <div className="container">
      <CategoryMenu setCategory={setCategory} />
      <ToolList currentCategory={currentCategory} />
    </div>
  );
};

export default Home;
