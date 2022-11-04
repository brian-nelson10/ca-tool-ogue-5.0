import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_TOOLS } from '../utils/actions';
import { QUERY_TOOLS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentTool, setCurrentTool] = useState({});

  const { loading, data } = useQuery(QUERY_TOOLS);

  const { tools } = state;

  useEffect(() => {
    if (tools.length) {
      setCurrentTool(tools.find((tool) => tool._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_TOOLS,
        tools: data.tools,
      });
    }
  }, [tools, data, dispatch, id]);

  return (
    <>
      {currentTool ? (
        <div className="container my-1">
          <Link to="/">← Back to Tools</Link>

          <h2>{currentTool.name}</h2>

          <p>{currentTool.description}</p>

          <p>
            
            <button>Add to Tool Bag.</button>
            <button>Remove from Tool Bag.</button>
          </p>

          <img
            src={`/images/${currentTool.image}`}
            alt={currentTool.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
