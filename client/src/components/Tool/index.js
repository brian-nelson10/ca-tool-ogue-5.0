import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

function Tool(item) {
  const {
    image,
    name,
    _id,
    quantity,
  } = item;

  return (
    <div className="card px-1 py-1">
      <Link to={`/tools/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button>Add to Tool Bag.</button>
    </div>
  );
}

export default Tool;
