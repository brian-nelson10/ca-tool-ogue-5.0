import { gql } from '@apollo/client';

export const QUERY_TOOLS = gql`
  query getTools($category: ID) {
    tools(category: $category) {
      _id
      name
      description
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_TOOLS = gql`
  {
    tools {
      _id
      name
      description
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      saved {
        _id
        savedDate
        tools {
          _id
          name
          description
          quantity
          image
        }
      }
    }
  }
`;
