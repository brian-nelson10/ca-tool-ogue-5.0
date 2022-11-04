import { useReducer } from 'react';

import {
    UPDATE_TOOLS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_TOOLS`, return a new state object with an updated tools array
      case UPDATE_TOOLS:
        return {
          ...state,
          tools: [...action.tools],
        };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };

    case UPDATE_CURRENT_CATEGORY:
        return {
        ...state,
        currentCategory: action.currentCategory
        };
  
      // if it's none of these actions, do not update state at all and keep things the same!
      default:
        return state;
    }
  };

  export function useToolReducer(initialState) {
    return useReducer(reducer, initialState);
  }