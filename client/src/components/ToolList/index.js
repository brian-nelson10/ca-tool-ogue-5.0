import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ToolItem from '../ToolItem';
import { QUERY_TOOLS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_TOOLS } from '../../utils/actions';

function ToolList() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;
    
    const { loading, data } = useQuery(QUERY_TOOLS);
    
    useEffect(() => {
      if (data) {
        dispatch({
          type: UPDATE_TOOLS,
          tools: data.tools
        });
      }
    }, [data, dispatch]);
    
    function filterTools() {
      if (!currentCategory) {
        return state.tools;
      }
    
      return state.tools.filter(
        (tool) => tool.category._id === currentCategory);
    }

  return (
    <div className="my-2">
      <h2>Our Tools:</h2>
      {state.tools.length ? (
        <div className="flex-row">
          {filterTools().map((tool) => (
            <ToolItem
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
