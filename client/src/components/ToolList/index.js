import React from 'react';
import { useQuery } from '@apollo/client';

import Tool from '../Tool';
import { QUERY_TOOLS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

function ToolList({ currentCategory }) {
  const { loading, data } = useQuery(QUERY_TOOLS);

  const tools = data?.tools || [];

  function filterTools() {
    if (!currentCategory) {
      return tools;
    }

    return tools.filter(
      (tool) => tool.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Tools:</h2>
      {tools.length ? (
        <div className="flex-row">
          {filterTools().map((tool) => (
            <Tool
              key={tool._id}
              _id={tool._id}
              image={tool.image}
              name={tool.name}
              quantity={tool.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any tools yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ToolList;
